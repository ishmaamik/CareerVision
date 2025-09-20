import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import { getCareerRoadmap } from "../../../api/roadmap";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Circle,
  BookOpen,
  Target,
  TrendingUp,
  Star,
  Award,
  Users,
  Briefcase,
  DollarSign,
  Globe,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Share2,
  RefreshCw,
  AlertCircle,
  Play,
  PlusCircle,
  MessageCircle,
  Send,
  Bot,
  User,
  Maximize2,
  Minimize2,
  Map,
  Calendar,
  Zap,
  Eye,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const Roadmap = () => {
  const { careerTitle: encodedCareerTitle } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // Decode the career title from URL
  const careerTitle = encodedCareerTitle
    ? decodeURIComponent(encodedCareerTitle)
    : "";

  // State management
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false); // Changed to false - only load when requested
  const [error, setError] = useState(null);
  const [expandedPhases, setExpandedPhases] = useState({});
  const [completedItems, setCompletedItems] = useState({});
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showProgress, setShowProgress] = useState(true);
  
  // New state for enhanced roadmap experience
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'detailed', 'chat'
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedPhaseForChat, setSelectedPhaseForChat] = useState(null);

  // Use useMemo to prevent recreation of careerData object
  const careerData = useMemo(
    () => ({
      careerTitle: careerTitle || "Software Engineering",
      detailedDescription:
        "Software engineering is the systematic application of engineering approaches to the development of software.",
      recommendedSubjects: [
        "Mathematics",
        "Computer Science",
        "Physics",
        "Statistics",
        "Logic",
      ],
    }),
    [careerTitle]
  );

  // Generate roadmap function - only called when button is clicked
  const generateRoadmap = async () => {
    setLoading(true);
    setError(null);
    setRoadmapData(null); // Clear any existing data

    try {
      const result = await getCareerRoadmap(
        careerData.careerTitle,
        careerData.detailedDescription,
        careerData.recommendedSubjects
      );

      if (result.success) {
        setRoadmapData(result.data);
        // Expand first phase by default
        if (result.data.phases && result.data.phases.length > 0) {
          setExpandedPhases({ [result.data.phases[0].id]: true });
          setSelectedPhase(result.data.phases[0]);
        }
        // Initialize chatbot
        initializeChatbot();
        // Set initial view mode to overview
        setViewMode('overview');
      } else {
        setError(result.error || "Failed to load roadmap");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Roadmap loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load completed items from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(
      `roadmap_progress_${careerData.careerTitle}`
    );
    if (savedProgress) {
      setCompletedItems(JSON.parse(savedProgress));
    }
  }, [careerData.careerTitle]);

  // Save progress to localStorage
  const saveProgress = (newCompletedItems) => {
    setCompletedItems(newCompletedItems);
    localStorage.setItem(
      `roadmap_progress_${careerData.careerTitle}`,
      JSON.stringify(newCompletedItems)
    );
  };

  // Toggle phase expansion
  const togglePhase = (phaseId) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  // Toggle item completion
  const toggleCompletion = (phaseId, itemType, itemIndex) => {
    const key = `${phaseId}_${itemType}_${itemIndex}`;
    const newCompletedItems = {
      ...completedItems,
      [key]: !completedItems[key],
    };
    saveProgress(newCompletedItems);
  };

  // Calculate overall progress
  const calculateProgress = () => {
    if (!roadmapData?.phases) return 0;

    let totalItems = 0;
    let completedCount = 0;

    roadmapData.phases.forEach((phase) => {
      if (phase.subjects) {
        totalItems += phase.subjects.length;
        phase.subjects.forEach((_, index) => {
          if (completedItems[`${phase.id}_subject_${index}`]) {
            completedCount++;
          }
        });
      }
      if (phase.milestones) {
        totalItems += phase.milestones.length;
        phase.milestones.forEach((_, index) => {
          if (completedItems[`${phase.id}_milestone_${index}`]) {
            completedCount++;
          }
        });
      }
      if (phase.projects) {
        totalItems += phase.projects.length;
        phase.projects.forEach((_, index) => {
          if (completedItems[`${phase.id}_project_${index}`]) {
            completedCount++;
          }
        });
      }
    });

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  };

  // Refresh roadmap
  const refreshRoadmap = async () => {
    // Clear cache and reload
    const cacheKey = `roadmap_${careerData.careerTitle
      .toLowerCase()
      .replace(/\s+/g, "_")}`;
    localStorage.removeItem(cacheKey);

    await generateRoadmap();
  };

  // Chatbot functions
  const initializeChatbot = () => {
    setChatMessages([
      {
        id: 1,
        type: 'bot',
        message: `Welcome to your ${careerData.careerTitle} learning journey! I'm here to guide you through your roadmap and answer any questions you might have.`,
        timestamp: new Date(),
      },
      {
        id: 2,
        type: 'bot',
        message: 'You can ask me about:\n• Specific phases or subjects\n• Learning recommendations\n• Career progression tips\n• Study schedules\n• Project ideas',
        timestamp: new Date(),
      }
    ]);
  };

  const sendChatMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: generateChatResponse(message),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botResponse]);
      setChatLoading(false);
    }, 1000);
  };

  const generateChatResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('phase') || lowerMessage.includes('step')) {
      return `Great question about the learning phases! Your ${careerData.careerTitle} roadmap is structured in progressive phases. Each phase builds upon the previous one, ensuring you develop a solid foundation before moving to advanced topics. Would you like me to explain a specific phase in detail?`;
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('long')) {
      return `The complete ${careerData.careerTitle} roadmap typically takes ${roadmapData?.totalDuration || '6-12 months'} to complete, depending on your pace and prior experience. You can adjust the timeline based on your availability and learning speed.`;
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('practice')) {
      return `Hands-on projects are crucial for your learning! Each phase includes practical projects that help you apply what you've learned. These projects are designed to build your portfolio and give you real-world experience.`;
    }
    
    if (lowerMessage.includes('difficult') || lowerMessage.includes('hard') || lowerMessage.includes('challenging')) {
      return `Don't worry if things seem challenging! Learning ${careerData.careerTitle} is a journey, and it's normal to find some concepts difficult at first. The roadmap is structured to gradually build your skills. Focus on one concept at a time and practice regularly.`;
    }
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('salary')) {
      return `${careerData.careerTitle} offers excellent career opportunities! As you progress through the roadmap, you'll develop skills that are in high demand. The career outcomes section shows potential positions and salary ranges for different experience levels.`;
    }
    
    return `That's an interesting question about ${careerData.careerTitle}! Based on your roadmap, I'd recommend focusing on the current phase you're working on. Each step is designed to build your expertise progressively. Is there a specific aspect of your learning journey you'd like to explore further?`;
  };

  const askAboutPhase = (phase) => {
    setSelectedPhaseForChat(phase);
    setViewMode('chat');
    setIsChatExpanded(true);
    
    const phaseMessage = {
      id: Date.now(),
      type: 'bot',
      message: `Let's dive into "${phase.title}"! This phase focuses on ${phase.description.toLowerCase()} and typically takes ${phase.duration}. Here's what you'll accomplish:\n\n${phase.subjects?.slice(0, 3).map(s => `• ${s.name}`).join('\n') || 'Key learning objectives'}\n\nWhat specific aspect would you like to know more about?`,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, phaseMessage]);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses.bg.primary}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className={`h-12 ${themeClasses.bg.accent} rounded-xl`}></div>
            <div className={`h-64 ${themeClasses.bg.accent} rounded-2xl`}></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div
                className={`h-96 ${themeClasses.bg.accent} rounded-2xl lg:col-span-2`}
              ></div>
              <div
                className={`h-96 ${themeClasses.bg.accent} rounded-2xl`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen ${themeClasses.bg.primary}`}>
        <div className="container mx-auto px-6 py-16 text-center">
          <AlertCircle
            className={`w-16 h-16 mx-auto mb-4 ${themeClasses.text.muted}`}
          />
          <h2
            className={`text-2xl font-bold mb-4 ${themeClasses.text.primary}`}
          >
            Failed to Load Roadmap
          </h2>
          <p className={`text-lg mb-6 ${themeClasses.text.secondary}`}>
            {error}
          </p>
          <div className="space-x-4">
            <button
              onClick={refreshRoadmap}
              className={componentStyles.button.primary}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className={componentStyles.button.secondary}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Welcome screen when no roadmap exists
  if (!roadmapData) {
    return (
      <div className={`min-h-screen ${themeClasses.bg.primary}`}>
        <div className="container mx-auto px-6 py-16">
          {/* Navigation */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className={`inline-flex items-center ${themeClasses.text.secondary} hover:${themeClasses.text.primary} transition-colors group`}
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Career Details
            </button>
          </div>

          {/* Welcome Content */}
          <div className="text-center max-w-2xl mx-auto">
            <div
              className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${themeClasses.brand.gradient} rounded-full flex items-center justify-center`}
            >
              <Target className="w-12 h-12 text-white" />
            </div>

            <h1
              className={`text-3xl lg:text-4xl font-bold ${themeClasses.text.primary} mb-4`}
            >
              {careerData.careerTitle} Learning Roadmap
            </h1>

            <p className={`text-lg ${themeClasses.text.secondary} mb-8`}>
              Generate a comprehensive, AI-powered learning roadmap tailored
              specifically for your {careerData.careerTitle} career journey.
              This roadmap will guide you from beginner to advanced levels with
              structured phases, practical projects, and industry insights.
            </p>

            <div className={`${componentStyles.card} p-8 mb-8`}>
              <h3
                className={`text-xl font-semibold ${themeClasses.text.primary} mb-4`}
              >
                What You'll Get:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <BookOpen
                    className={`w-5 h-5 ${themeClasses.brand.primary}`}
                  />
                  <span className={themeClasses.text.secondary}>
                    Structured learning phases
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className={`w-5 h-5 ${themeClasses.brand.primary}`} />
                  <span className={themeClasses.text.secondary}>
                    Clear milestones & goals
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase
                    className={`w-5 h-5 ${themeClasses.brand.primary}`}
                  />
                  <span className={themeClasses.text.secondary}>
                    Hands-on projects
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp
                    className={`w-5 h-5 ${themeClasses.brand.primary}`}
                  />
                  <span className={themeClasses.text.secondary}>
                    Career progression paths
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className={`w-5 h-5 ${themeClasses.brand.primary}`} />
                  <span className={themeClasses.text.secondary}>
                    Industry insights & trends
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lightbulb
                    className={`w-5 h-5 ${themeClasses.brand.primary}`}
                  />
                  <span className={themeClasses.text.secondary}>
                    Learning resources
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={generateRoadmap}
              disabled={loading}
              className={`${componentStyles.button.primary} text-lg px-8 py-4`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Roadmap...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Generate My Roadmap
                </>
              )}
            </button>

            <p className={`text-sm ${themeClasses.text.muted} mt-4`}>
              This process may take a few moments while our AI creates your
              personalized roadmap.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = calculateProgress();

  // Roadmap Overview Component
  const RoadmapOverview = () => (
    <div className="space-y-6">
      {/* Visual Timeline */}
      <div className={componentStyles.card}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${themeClasses.text.primary} flex items-center`}>
              <Map className="w-6 h-6 mr-3" />
              Learning Path Overview
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('detailed')}
                className={componentStyles.button.secondary}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detailed View
              </button>
              <button
                onClick={() => setViewMode('chat')}
                className={componentStyles.button.primary}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Guide
              </button>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {roadmapData?.phases?.map((phase, index) => (
              <div key={phase.id} className="relative flex items-start mb-8 last:mb-0">
                {/* Phase Number Circle */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r ${themeClasses.brand.gradient} shadow-lg`}>
                  {index + 1}
                </div>

                {/* Phase Content */}
                <div className="ml-6 flex-1">
                  <div className={`${componentStyles.card} ${themeClasses.interactive.hover} cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => askAboutPhase(phase)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg font-semibold ${themeClasses.text.primary}`}>
                          {phase.title}
                        </h4>
                        <span className={`text-sm px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          {phase.duration}
                        </span>
                      </div>
                      
                      <p className={`${themeClasses.text.secondary} mb-3`}>
                        {phase.description}
                      </p>

                      {/* Quick Stats */}
                      <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center ${themeClasses.text.muted}`}>
                          <BookOpen className="w-4 h-4 mr-1" />
                          {phase.subjects?.length || 0} subjects
                        </div>
                        <div className={`flex items-center ${themeClasses.text.muted}`}>
                          <Target className="w-4 h-4 mr-1" />
                          {phase.milestones?.length || 0} milestones
                        </div>
                        <div className={`flex items-center ${themeClasses.text.muted}`}>
                          <Briefcase className="w-4 h-4 mr-1" />
                          {phase.projects?.length || 0} projects
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={themeClasses.text.muted}>Phase Progress</span>
                          <span className={themeClasses.text.primary}>
                            {calculatePhaseProgress(phase)}%
                          </span>
                        </div>
                        <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : ''}`}>
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${themeClasses.brand.gradient} transition-all duration-500`}
                            style={{ width: `${calculatePhaseProgress(phase)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Click to explore hint */}
                      <div className={`mt-3 flex items-center ${themeClasses.text.muted} text-sm`}>
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Click to explore with AI Guide
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${componentStyles.card} p-4 text-center cursor-pointer ${themeClasses.interactive.hover}`}
          onClick={() => setViewMode('detailed')}
        >
          <Eye className={`w-8 h-8 mx-auto mb-2 ${themeClasses.brand.primary}`} />
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-1`}>Detailed Study</h4>
          <p className={`text-sm ${themeClasses.text.secondary}`}>Dive deep into each phase</p>
        </div>
        
        <div className={`${componentStyles.card} p-4 text-center cursor-pointer ${themeClasses.interactive.hover}`}
          onClick={() => setViewMode('chat')}
        >
          <Bot className={`w-8 h-8 mx-auto mb-2 ${themeClasses.brand.primary}`} />
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-1`}>AI Assistant</h4>
          <p className={`text-sm ${themeClasses.text.secondary}`}>Get personalized guidance</p>
        </div>
        
        <div className={`${componentStyles.card} p-4 text-center cursor-pointer ${themeClasses.interactive.hover}`}>
          <Calendar className={`w-8 h-8 mx-auto mb-2 ${themeClasses.brand.primary}`} />
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-1`}>Study Schedule</h4>
          <p className={`text-sm ${themeClasses.text.secondary}`}>Plan your learning time</p>
        </div>
      </div>
    </div>
  );

  // Calculate progress for individual phase
  const calculatePhaseProgress = (phase) => {
    let totalItems = 0;
    let completedCount = 0;

    if (phase.subjects) {
      totalItems += phase.subjects.length;
      phase.subjects.forEach((_, index) => {
        if (completedItems[`${phase.id}_subject_${index}`]) {
          completedCount++;
        }
      });
    }
    if (phase.milestones) {
      totalItems += phase.milestones.length;
      phase.milestones.forEach((_, index) => {
        if (completedItems[`${phase.id}_milestone_${index}`]) {
          completedCount++;
        }
      });
    }
    if (phase.projects) {
      totalItems += phase.projects.length;
      phase.projects.forEach((_, index) => {
        if (completedItems[`${phase.id}_project_${index}`]) {
          completedCount++;
        }
      });
    }

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  };

  // Chatbot Interface Component
  const ChatbotInterface = () => (
    <div className="space-y-6">
      {/* Chat Header */}
      <div className={componentStyles.card}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${themeClasses.brand.gradient} flex items-center justify-center mr-3`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${themeClasses.text.primary}`}>AI Learning Guide</h3>
                <p className={`text-sm ${themeClasses.text.secondary}`}>
                  Your personal {careerData.careerTitle} mentor
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('overview')}
                className={componentStyles.button.ghost}
              >
                <Map className="w-4 h-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={componentStyles.button.ghost}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Details
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.type === 'user'
                  ? `bg-gradient-to-r ${themeClasses.brand.gradient} text-white`
                  : `${themeClasses.bg.accent} ${themeClasses.text.primary}`
              }`}>
                <div className="flex items-start">
                  {message.type === 'bot' && (
                    <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="whitespace-pre-wrap text-sm">
                    {message.message}
                  </div>
                </div>
                <div className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {chatLoading && (
            <div className="flex justify-start">
              <div className={`${themeClasses.bg.accent} px-4 py-2 rounded-2xl`}>
                <div className="flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendChatMessage(chatInput);
                }
              }}
              placeholder="Ask me about your learning path..."
              className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              disabled={chatLoading}
            />
            <button
              onClick={() => sendChatMessage(chatInput)}
              disabled={chatLoading || !chatInput.trim()}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${themeClasses.brand.gradient} text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "How long will this take?",
              "What should I focus on first?",
              "Show me the projects",
              "Career opportunities",
              "Study tips"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendChatMessage(suggestion)}
                className={`text-xs px-3 py-1 rounded-full border ${themeClasses.interactive.hover} transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                disabled={chatLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Phase Context (if selected) */}
      {selectedPhaseForChat && (
        <div className={componentStyles.card}>
          <div className="p-4">
            <h4 className={`font-semibold ${themeClasses.text.primary} mb-2 flex items-center`}>
              <Zap className="w-4 h-4 mr-2" />
              Currently Discussing: {selectedPhaseForChat.title}
            </h4>
            <p className={`text-sm ${themeClasses.text.secondary} mb-3`}>
              {selectedPhaseForChat.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedPhaseForChat.subjects?.slice(0, 3).map((subject, index) => (
                <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {subject.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${themeClasses.bg.primary}`}>
      {/* Header */}
      <div
        className={`${themeClasses.bg.surface} ${themeClasses.border.primary} border-b`}
      >
        <div className="container mx-auto px-6 py-6">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className={`inline-flex items-center ${themeClasses.text.secondary} hover:${themeClasses.text.primary} transition-colors group`}
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Career Details
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={refreshRoadmap}
                className={componentStyles.button.ghost}
                title="Refresh Roadmap"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                className={componentStyles.button.ghost}
                title="Share Roadmap"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className={componentStyles.button.ghost}
                title="Download as PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title and Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1
                className={`text-3xl lg:text-4xl font-bold ${themeClasses.text.primary} mb-4`}
              >
                {roadmapData?.careerTitle} Learning Roadmap
              </h1>
              <p className={`text-lg ${themeClasses.text.secondary} mb-6`}>
                {roadmapData?.overview}
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className={`flex items-center ${themeClasses.text.muted}`}>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{roadmapData?.totalDuration}</span>
                </div>
                <div className={`flex items-center ${themeClasses.text.muted}`}>
                  <Target className="w-4 h-4 mr-2" />
                  <span>
                    {roadmapData?.phases?.length || 0} Learning Phases
                  </span>
                </div>
                <div className={`flex items-center ${themeClasses.text.muted}`}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Beginner to Advanced</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className={componentStyles.card}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${themeClasses.text.primary}`}
                  >
                    Your Progress
                  </h3>
                  <button
                    onClick={() => setShowProgress(!showProgress)}
                    className={`${themeClasses.text.muted} hover:${themeClasses.text.primary}`}
                  >
                    {showProgress ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {showProgress && (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className={themeClasses.text.secondary}>
                          Overall Progress
                        </span>
                        <span
                          className={`font-semibold ${themeClasses.text.primary}`}
                        >
                          {progressPercentage}%
                        </span>
                      </div>
                      <div
                        className={`w-full bg-gray-200 rounded-full h-3 ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                      >
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${themeClasses.brand.gradient} transition-all duration-500`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={themeClasses.text.secondary}>
                          Completed Items
                        </span>
                        <span className={themeClasses.text.primary}>
                          {Object.values(completedItems).filter(Boolean).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={themeClasses.text.secondary}>
                          Current Phase
                        </span>
                        <span className={themeClasses.text.primary}>
                          {selectedPhase?.title || "Not started"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Render different views based on viewMode */}
        {viewMode === 'overview' && <RoadmapOverview />}
        
        {viewMode === 'chat' && <ChatbotInterface />}
        
        {viewMode === 'detailed' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* View Mode Selector */}
            <div className="xl:col-span-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                  Detailed Study Plan
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('overview')}
                    className={componentStyles.button.ghost}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Overview
                  </button>
                  <button
                    onClick={() => setViewMode('chat')}
                    className={componentStyles.button.primary}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Roadmap Content */}
            <div className="xl:col-span-3">
              {roadmapData?.phases?.map((phase, phaseIndex) => (
                <div key={phase.id} className={`${componentStyles.card} mb-6`}>
                  {/* Phase Header */}
                  <div
                    className={`p-6 cursor-pointer ${themeClasses.interactive.hover} transition-colors`}
                    onClick={() => {
                      togglePhase(phase.id);
                      setSelectedPhase(phase);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-gradient-to-r ${themeClasses.brand.gradient} text-white font-bold`}
                        >
                          {phaseIndex + 1}
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${themeClasses.text.primary}`}
                          >
                            {phase.title}
                          </h3>
                          <p className={`${themeClasses.text.secondary} text-sm`}>
                            {phase.duration} • {phase.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`text-sm px-3 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {phase.subjects?.length || 0} Subjects
                        </div>
                        {expandedPhases[phase.id] ? (
                          <ChevronDown
                            className={`w-5 h-5 ${themeClasses.text.muted}`}
                          />
                        ) : (
                          <ChevronRight
                            className={`w-5 h-5 ${themeClasses.text.muted}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phase Content */}
                  {expandedPhases[phase.id] && (
                    <div
                      className={`px-6 pb-6 border-t ${themeClasses.border.primary}`}
                    >
                      {/* Subjects */}
                      {phase.subjects && phase.subjects.length > 0 && (
                        <div className="mb-8">
                          <h4
                            className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                          >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Subjects to Study
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {phase.subjects.map((subject, index) => (
                              <div
                                key={index}
                                className={`p-4 border rounded-xl ${themeClasses.border.primary} ${themeClasses.bg.secondary} transition-all hover:shadow-md`}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <button
                                        onClick={() =>
                                          toggleCompletion(
                                            phase.id,
                                            "subject",
                                            index
                                          )
                                        }
                                        className="mr-3"
                                      >
                                        {completedItems[
                                          `${phase.id}_subject_${index}`
                                        ] ? (
                                          <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                          <Circle
                                            className={`w-5 h-5 ${themeClasses.text.muted}`}
                                          />
                                        )}
                                      </button>
                                      <h5
                                        className={`font-semibold ${themeClasses.text.primary}`}
                                      >
                                        {subject.name}
                                      </h5>
                                    </div>
                                    <p
                                      className={`text-sm ${themeClasses.text.secondary} mb-2 ml-8`}
                                    >
                                      {subject.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${
                                        subject.importance === "High"
                                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                          : subject.importance === "Medium"
                                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                      }`}
                                    >
                                      {subject.importance}
                                    </span>
                                    <span
                                      className={`text-xs ${themeClasses.text.muted} mt-1`}
                                    >
                                      {subject.duration}
                                    </span>
                                  </div>
                                </div>

                                {subject.skills && subject.skills.length > 0 && (
                                  <div className="ml-8">
                                    <p
                                      className={`text-xs ${themeClasses.text.muted} mb-2`}
                                    >
                                      Skills you'll gain:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {subject.skills.map((skill, skillIndex) => (
                                        <span
                                          key={skillIndex}
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            isDarkMode
                                              ? "bg-gray-700 text-gray-300"
                                              : "bg-gray-100 text-gray-600"
                                          }`}
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Milestones */}
                      {phase.milestones && phase.milestones.length > 0 && (
                        <div className="mb-8">
                          <h4
                            className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                          >
                            <Target className="w-5 h-5 mr-2" />
                            Key Milestones
                          </h4>
                          <div className="space-y-2">
                            {phase.milestones.map((milestone, index) => (
                              <div key={index} className="flex items-center">
                                <button
                                  onClick={() =>
                                    toggleCompletion(phase.id, "milestone", index)
                                  }
                                  className="mr-3"
                                >
                                  {completedItems[
                                    `${phase.id}_milestone_${index}`
                                  ] ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <Circle
                                      className={`w-5 h-5 ${themeClasses.text.muted}`}
                                    />
                                  )}
                                </button>
                                <span
                                  className={`${themeClasses.text.primary} ${
                                    completedItems[
                                      `${phase.id}_milestone_${index}`
                                    ]
                                      ? "line-through opacity-75"
                                      : ""
                                  }`}
                                >
                                  {milestone}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects */}
                      {phase.projects && phase.projects.length > 0 && (
                        <div>
                          <h4
                            className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                          >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Hands-on Projects
                          </h4>
                          <div className="space-y-2">
                            {phase.projects.map((project, index) => (
                              <div key={index} className="flex items-center">
                                <button
                                  onClick={() =>
                                    toggleCompletion(phase.id, "project", index)
                                  }
                                  className="mr-3"
                                >
                                  {completedItems[
                                    `${phase.id}_project_${index}`
                                  ] ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <Circle
                                      className={`w-5 h-5 ${themeClasses.text.muted}`}
                                    />
                                  )}
                                </button>
                                <span
                                  className={`${themeClasses.text.primary} ${
                                    completedItems[`${phase.id}_project_${index}`]
                                      ? "line-through opacity-75"
                                      : ""
                                  }`}
                                >
                                  {project}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Career Outcomes */}
              {roadmapData?.careerOutcomes && (
                <div className={componentStyles.card}>
                  <div className="p-6">
                    <h3
                      className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Career Outcomes
                    </h3>

                    <div className="space-y-4">
                      {Object.entries(roadmapData.careerOutcomes).map(
                        ([level, data]) => (
                          <div
                            key={level}
                            className={`p-4 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.accent}`}
                          >
                            <h4
                              className={`font-semibold ${themeClasses.text.primary} mb-2 capitalize`}
                            >
                              {level.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className={`${themeClasses.text.muted}`}>
                                  Positions:{" "}
                                </span>
                                <span className={themeClasses.text.secondary}>
                                  {data.positions?.join(", ")}
                                </span>
                              </div>
                              <div>
                                <span className={`${themeClasses.text.muted}`}>
                                  Salary:{" "}
                                </span>
                                <span className={themeClasses.text.secondary}>
                                  {data.salaryRange}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Industry Insights */}
              {roadmapData?.industryInsights && (
                <div className={componentStyles.card}>
                  <div className="p-6">
                    <h3
                      className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      Industry Insights
                    </h3>

                    <div className="space-y-4">
                      {roadmapData.industryInsights.currentTrends && (
                        <div>
                          <h4
                            className={`font-medium ${themeClasses.text.primary} mb-2`}
                          >
                            Current Trends
                          </h4>
                          <ul className="space-y-1">
                            {roadmapData.industryInsights.currentTrends.map(
                              (trend, index) => (
                                <li
                                  key={index}
                                  className={`text-sm ${themeClasses.text.secondary} flex items-center`}
                                >
                                  <div className="w-1.5 h-1.5 bg-current rounded-full mr-2"></div>
                                  {trend}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {roadmapData.industryInsights.futureOutlook && (
                        <div>
                          <h4
                            className={`font-medium ${themeClasses.text.primary} mb-2`}
                          >
                            Future Outlook
                          </h4>
                          <p className={`text-sm ${themeClasses.text.secondary}`}>
                            {roadmapData.industryInsights.futureOutlook}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Resources */}
              {roadmapData?.learningResources && (
                <div className={componentStyles.card}>
                  <div className="p-6">
                    <h3
                      className={`text-lg font-semibold ${themeClasses.text.primary} mb-4 flex items-center`}
                    >
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Learning Resources
                    </h3>

                    <div className="space-y-4">
                      {Object.entries(roadmapData.learningResources).map(
                        ([category, resources]) =>
                          resources &&
                          resources.length > 0 && (
                            <div key={category}>
                              <h4
                                className={`font-medium ${themeClasses.text.primary} mb-2 capitalize`}
                              >
                                {category}
                              </h4>
                              <ul className="space-y-1">
                                {resources.slice(0, 3).map((resource, index) => (
                                  <li
                                    key={index}
                                    className={`text-sm ${themeClasses.text.secondary} flex items-center`}
                                  >
                                    <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" />
                                    {resource}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
