import axios from "axios";
import html2pdf from "html2pdf.js";
import {Button} from "@mui/material"
import {
  BookOpen,
  Brain,
  Clock,
  Code,
  Download,
  MessageSquare,
  Target,
  PenTool as Tool,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { generateRoadmap } from "../../api/roadmap/roadmap";
import { useNavigate } from "react-router-dom";
import { 
  determineCareerPath, 
  fieldSkillVariants, 
  getSkillCategories, 
  findSpecificSkills  // Updated import
} from '../../utils/skillVariants.js';
import { getCareerQuestions, suggestLanguages, suggestSkillFocus } from '../../utils/careerQuestionnaires.js';
import { skillsData } from '../../api/skills/skills.js';

const Roadmap = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(true);
  const [step, setStep] = useState(1);
  const roadmapRef = useRef(null);
  const [error, setError] = useState(null);
  
  // Ensure all nested objects and arrays are properly initialized
  const [formData, setFormData] = useState({
    goals: {
      primaryGoal: "",
      specificArea: "",
    },
    experience: {
      quiz: [], // Ensure this is always an array
      description: "",
    },
    timeCommitment: {
      hoursPerWeek: "2-5",
      pace: "relaxed",
    },
    preferences: {
      learningStyle: "interactive",
      difficulty: "fundamentals",
    },
    languages: [], // Ensure this is always an array
    tools: "", // Explicitly set as an empty string
    demographics: {
      ageRange: "",
      status: "",
    },
    feedback: "",
  });

  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Skills-related state
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Initialize skills on component mount
  useEffect(() => {
    setAllSkills(skillsData);
  }, []);

  // Comprehensive user object logging
  useEffect(() => {
    console.group('User Object Inspection');
    console.log('Raw User Object:', user);
    console.log('User Object Type:', typeof user);
    console.log('User Object Keys:', user ? Object.keys(user) : 'No user');
    
    // Attempt to find potential ID fields
    if (user) {
      const potentialIdFields = ['_id', 'id', 'userId', 'user_id'];
      potentialIdFields.forEach(field => {
        console.log(`Checking field '${field}':`, user[field]);
      });
    }
    console.groupEnd();
  }, [user]);

  // Check user authentication on component mount
  useEffect(() => {
    if (!user) {
      setError("You must be logged in to generate a roadmap.");
      // Optional: Redirect to login page after a short delay
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      setError("You must be logged in to generate a roadmap. Please log in.");
      return;
    }

    // Validate that all required fields are filled
    if (!formData.goals.primaryGoal) {
      setError("Please select a primary goal before generating a roadmap.");
      return;
    }

    // Attempt to find the correct user ID with multiple fallback options
    const potentialIdFields = ['_id', 'id', 'userId', 'user_id'];
    const userId = potentialIdFields.find(field => user[field]);

    console.log('Potential User ID Fields:', potentialIdFields);
    console.log('Found User ID Field:', userId);
    console.log('User ID Value:', userId ? user[userId] : 'Not Found');

    // Validate userId
    if (!userId) {
      setError("Cannot find a valid user ID. Please log in again.");
      return;
    }

    // Clear any previous errors
    setError(null);

    try {
      const payload = {
        userId: user[userId], // Use the found user ID
        primaryGoal: formData.goals.primaryGoal, // Flat field
        specificArea: (() => {
          // If no specific area provided, try to derive from primary goal
          if (!formData.goals.specificArea) {
            const goalToAreaMap = {
              // Technology & Software
              'tech_job': 'Technology Career',
              'software_engineering': 'Software Development',
              'web_development': 'Web Development',
              'mobile_development': 'Mobile App Development',
              'data_science': 'Data Science',
              'ai_ml': 'Artificial Intelligence',
              'cybersecurity': 'Cybersecurity',
              'cloud_computing': 'Cloud Computing',

              // Engineering
              'mechanical_engineering': 'Mechanical Engineering',
              'civil_engineering': 'Civil Engineering',
              'electrical_engineering': 'Electrical Engineering',
              'chemical_engineering': 'Chemical Engineering',
              'aerospace_engineering': 'Aerospace Engineering',
              'industrial_engineering': 'Industrial Engineering',

              // Business & Management
              'business_administration': 'Business Administration',
              'finance': 'Financial Management',
              'marketing': 'Marketing',
              'human_resources': 'Human Resources',
              'project_management': 'Project Management',
              'entrepreneurship': 'Entrepreneurship',

              // Creative & Design
              'graphic_design': 'Graphic Design',
              'ux_ui_design': 'UX/UI Design',
              'architecture': 'Architecture',
              'fashion_design': 'Fashion Design',
              'product_design': 'Product Design',

              // Healthcare
              'medicine': 'Medical Practice',
              'nursing': 'Nursing',
              'biotechnology': 'Biotechnology',
              'psychology': 'Psychology',
              'pharmacy': 'Pharmacy',

              // Education & Research
              'teaching': 'Teaching',
              'academic_research': 'Academic Research',
              'educational_technology': 'Educational Technology',

              // Arts & Entertainment
              'performing_arts': 'Performing Arts',
              'film_media': 'Film & Media Production',
              'music_production': 'Music Production',
              'game_design': 'Game Design',

              // Trades & Technical Skills
              'construction': 'Construction',
              'automotive_technology': 'Automotive Technology',
              'culinary_arts': 'Culinary Arts',

              // Professional Development
              'leadership_development': 'Leadership Development',
              'communication_skills': 'Communication Skills',
              'personal_branding': 'Personal Branding',

              // Other
              'personal_projects': 'Personal Projects',
              'exam_preparation': 'Professional Exam Preparation',
              'career_transition': 'Career Transition',
              'skill_upgrade': 'Skill Upgrade'
            };

            return goalToAreaMap[formData.goals.primaryGoal] || formData.goals.primaryGoal;
          }
          return formData.goals.specificArea;
        })(),
        selfAssessment: formData.experience.quiz,
        experienceDescription: formData.experience.description,
        hoursPerWeek: formData.timeCommitment.hoursPerWeek,
        pace: formData.timeCommitment.pace,
        learningStyle: formData.preferences.learningStyle,
        difficulty: formData.preferences.difficulty,
        languages: formData.languages.map((lang, index) => ({
          name: lang.name,
          priority: index + 1
        })),
        tools: selectedSkills.map(skill => skill.name).join(', '),
        ageRange: formData.demographics.ageRange,
        status: formData.demographics.status,
        feedback: formData.feedback
      };

      console.log('Roadmap Generation Payload:', payload);
      console.log('Payload Tools:', payload.tools);
      console.log('Payload Tools Type:', typeof payload.tools);

      const response = await generateRoadmap(payload);
      
      console.log('Roadmap Generation Response:', response);

      // Defensive check for response structure
      if (!response || !response.roadmap || !response.roadmap.generatedRoadmap) {
        throw new Error('Invalid response structure from roadmap generation');
      }

      setGeneratedRoadmap(response.roadmap.generatedRoadmap);
      setSuccessMessage("Your learning roadmap has been successfully created!");
    } catch (error) {
      console.error("Submission error:", error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to submit form";
      
      // Set error state for user feedback
      setError(errorMessage);
      
      // Optional: Show error alert
      alert(`Error: ${errorMessage}`);
    }
  };

  // Update form data helper function
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle skill input change
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      const filtered = allSkills.filter(skill =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
      setShowSkillDropdown(true);
    } else {
      setShowSkillDropdown(false);
    }
  };

  // Handle skill selection for this specific component
  const handleSkillSelectRoadmap = (skill) => {
    if (!selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        tools: [...(prev.tools?.split(',') || []), skill.name].filter(Boolean).join(', ')
      }));
    }
    
    // Reset input and hide dropdown
    setSkillInput("");
    setShowSkillDropdown(false);
  };

  // Remove a selected skill
  const removeSkill = (skillToRemove) => {
    // Remove from selected skills
    setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillToRemove.id));
    
    // Update form data
    setFormData(prev => {
      const currentSkills = prev.tools?.split(',') || [];
      const updatedSkills = currentSkills.filter(skill => skill.trim() !== skillToRemove.name);
      return {
        ...prev,
        tools: updatedSkills.join(', ')
      };
    });
  };

  // Placeholder for skill category matching (if needed)
  const findMatchingSkillCategories = (input) => {
    if (!input) return [];
    
    // Find skills that match the input
    const matchedSkills = allSkills.filter(skill => 
      skill.name.toLowerCase().includes(input.toLowerCase()) ||
      skill.category.toLowerCase().includes(input.toLowerCase())
    );

    // Group skills by category
    const categoryMap = matchedSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    // Convert to array of category matches
    return Object.entries(categoryMap).map(([category, skills]) => ({
      category,
      matchedSkills: skills
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('skill-dropdown');
      const input = document.getElementById('tools-input');
      
      if (dropdown && input && 
          !dropdown.contains(event.target) && 
          !input.contains(event.target)) {
        setShowSkillDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const RoadmapContent = ({ isPDF = false }) => (
    <div className={`${!isPDF ? "bg-white rounded-lg shadow-sm p-8" : ""}`}>
      {!isPDF && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-amber-900">
            Your Learning Roadmap
          </h2>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50  text-amber-700  rounded-lg hover:bg-amber-100  transition-colors"
          >
            
            Download PDF
          </button>
        </div>
      )}

      <div className={`${isPDF ? "" : "bg-amber-50/50 rounded-lg p-6"}`}>
        <div
          className={`${
            isPDF ? "text-black" : "text-amber-900 "
          } font-sans leading-relaxed`}
        >
          {isPDF && (
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Learning Roadmap</h1>
              <p className="text-sm text-gray-600">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          )}
          <ReactMarkdown>{String(generatedRoadmap)}</ReactMarkdown>
        </div>
      </div>

      {!isPDF && (
        <button
          onClick={() => {
            setGeneratedRoadmap(null);
            setSuccessMessage("");
            setStep(1);
          }}
          className="mt-8 px-6 py-3 bg-amber-600 dark:bg-amber-500 text-black rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
        >
          Create New Roadmap
        </button>
      )}
    </div>
  );

  const handleDownloadPDF = () => {
    const element = roadmapRef.current;
    
    if (!element) {
      alert('Could not find element to generate PDF');
      return;
    }

    // Create a deep clone of the element
    const clonedElement = element.cloneNode(true);
    
    // Comprehensive style simplification function
    const simplifyStyles = (el) => {
      if (!(el instanceof Element)) return;

      // Remove potentially problematic styles
      const stylesToRemove = [
        'background',
        'backgroundColor',
        'backgroundImage',
        'color',
        'boxShadow',
        'borderRadius',
        'transform',
        'transition'
      ];

      // Remove inline styles
      if (el.style) {
        stylesToRemove.forEach(prop => {
          el.style[prop] = '';
        });
      }

      // Remove Tailwind classes that might cause rendering issues
      const classesToRemove = [
        'bg-gradient-to-b',
        'dark:from-[#18181b]',
        'dark:to-black',
        'hover:',
        'transition-',
        'rounded-lg',
        'shadow-'
      ];

      if (el.classList) {
        classesToRemove.forEach(cls => {
          el.classList.remove(...Array.from(el.classList).filter(c => c.includes(cls)));
        });
      }

      // Recursively simplify child elements
      Array.from(el.children).forEach(simplifyStyles);
    };

    // Simplify styles
    simplifyStyles(clonedElement);

    // Prepare PDF options with more robust settings
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // Reduced margins
      filename: "my-learning-roadmap.pdf",
      image: { 
        type: "jpeg", 
        quality: 0.85 // Slightly reduced quality to improve compatibility
      },
      html2canvas: { 
        scale: 1, // Reduced scale to minimize rendering issues
        useCORS: true, 
        logging: true,
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight,
        windowWidth: clonedElement.scrollWidth,
        windowHeight: clonedElement.scrollHeight
      },
      jsPDF: { 
        unit: "in", 
        format: "a4", 
        orientation: "portrait" 
      },
      pagebreak: { mode: 'avoid-all' }
    };

    // Attempt PDF generation with multiple fallback strategies
    const generatePDF = () => {
      return new Promise((resolve, reject) => {
        try {
          html2pdf()
            .set(opt)
            .from(clonedElement)
            .save()
            .then(resolve)
            .catch(reject);
        } catch (error) {
          reject(error);
        }
      });
    };

    // Execute PDF generation with error handling
    generatePDF()
      .catch((err) => {
        console.error('First PDF Generation Attempt Failed:', err);
        
        // Fallback: Try with even more simplified approach
        try {
          const simplifiedClone = document.createElement('div');
          simplifiedClone.innerHTML = clonedElement.innerText;
          
          const fallbackOpt = {
            ...opt,
            html2canvas: { 
              ...opt.html2canvas, 
              scale: 1, 
              width: undefined, 
              height: undefined 
            }
          };

          html2pdf()
            .set(fallbackOpt)
            .from(simplifiedClone)
            .save()
            .catch((fallbackErr) => {
              console.error('Fallback PDF Generation Failed:', fallbackErr);
              alert('Failed to generate PDF. Please try manually copying the content.');
            });
        } catch (simplificationError) {
          console.error('PDF Simplification Error:', simplificationError);
          alert('Unable to generate PDF. Please try manually copying the content.');
        }
      });
  };

  // Enhanced skill matching function
  const findSpecificSkills = (input) => {
    // Handle undefined, null, or object inputs
    if (!input) return [];

    // Extract string value if input is an object
    const inputValue = typeof input === 'object' 
      ? (input.tools || input.tool || input.skills || '') 
      : input;

    // Ensure input is a string and convert to lowercase
    const lowerCaseInput = String(inputValue).toLowerCase().trim();

    // Find matching skills
    const matchingSkills = skillsData.filter(skill => 
      skill.name.toLowerCase().includes(lowerCaseInput) ||
      skill.category.toLowerCase().includes(lowerCaseInput)
    );

    // Sort and limit results
    return matchingSkills
      .sort((a, b) => {
        // Prioritize exact matches
        const aExactMatch = skill.name.toLowerCase() === lowerCaseInput;
        const bExactMatch = skill.name.toLowerCase() === lowerCaseInput;
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        // Then sort by category
        return skill.category.localeCompare(b.category);
      })
      .slice(0, 10); // Limit to 10 results
  };

  // Handle tools/skills input change
  const handleToolsChange = (e) => {
    const value = e.target.value;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      tools: value
    }));

    // Show dropdown if input is not empty
    setShowSkillDropdown(value.trim() !== '');
  };

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    // Update form data, appending the skill if not already present
    setFormData(prev => {
      const currentTools = prev.tools || '';
      const toolsArray = currentTools.split(',').map(t => t.trim());
      
      // Only add if not already present
      if (!toolsArray.includes(skill.name)) {
        toolsArray.push(skill.name);
      }
      
      return {
        ...prev,
        tools: toolsArray.filter(Boolean).join(', ')
      };
    });

    // Hide dropdown
    setShowSkillDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('skill-dropdown');
      const input = document.getElementById('tools-input');
      
      if (dropdown && input && 
          !dropdown.contains(event.target) && 
          !input.contains(event.target)) {
        setShowSkillDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Language selection handling
  const handleLanguageSelection = (lang) => {
    setFormData(prev => {
      const currentLanguages = prev.languages || [];
      
      // Check if language is already selected
      const isSelected = currentLanguages.some(l => l.name === lang);
      
      if (isSelected) {
        // Remove language if already selected
        return {
          ...prev,
          languages: currentLanguages.filter(l => l.name !== lang)
        };
      } else {
        // Add language with priority based on current list
        return {
          ...prev,
          languages: [
            ...currentLanguages, 
            { name: lang, priority: currentLanguages.length + 1 }
          ]
        };
      }
    });
  };


  return (
    <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px", marginTop:"50px" }}
      >
        
          <div className="max-w-4xl mx-auto flex items-center gap-8">
            <div className="flex-1">
              <h1 className="font-bold text-amber-900 mb-3">
                Your Career Growth Starts Here
              </h1>
              <p className="text-amber-800 leading-relaxed">
                Tell us about your goals and preferences, and we'll create your
                personalized learning roadmap.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 text-center">
                <p className="text-amber-700 text-sm">7-step process</p>
              </div>
              <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 text-center">
                <p className="text-amber-700 text-sm">Personalized plan</p>
              </div>
            </div>
          </div>

        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {successMessage && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-lg text-center shadow-sm">
              <p className="font-semibold text-xl">{successMessage}</p>
            </div>
          )}
          {generatedRoadmap ? (
            <>
              {/* Regular view */}
              <RoadmapContent />

              {/* Hidden PDF view */}
              <div className="hidden">
                <div ref={roadmapRef}>
                  <RoadmapContent isPDF={true} />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    
                  </div>
                  <div className="h-2 bg-amber-100 rounded-full">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${(step / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Step 1: Goals & Interests */}
                {step === 1 && (
                  <div className="space-y-6 transition-all duration-300">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-amber-900">
                        Your Learning Goals
                      </h2>
                      <p className="text-amber-700 mt-2">
                        Let's start by understanding what you want to achieve
                      </p>
                    </div>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-amber-800">Primary Goal:</span>
                        <select
                          value={formData.goals.primaryGoal}
                          onChange={(e) =>
                            updateFormData("goals", "primaryGoal", e.target.value)
                          }
                          className="w-full p-2 border border-amber-200 rounded mt-1 focus:ring-amber-500 focus:border-amber-500"
                          required
                        >
                          <option value="">Select your primary goal</option>
                          
                          {/* Technology & Software Careers */}
                          <optgroup label="Technology & Software">
                            <option value="tech_job">Land a job in tech</option>
                            <option value="software_engineering">Become a Software Engineer</option>
                            <option value="web_development">Pursue Web Development</option>
                            <option value="mobile_development">Mobile App Development</option>
                            <option value="data_science">Enter Data Science</option>
                            <option value="ai_ml">Explore AI/Machine Learning</option>
                            <option value="cybersecurity">Start in Cybersecurity</option>
                            <option value="cloud_computing">Learn Cloud Computing</option>
                          </optgroup>

                          {/* Engineering Careers */}
                          <optgroup label="Engineering">
                            <option value="mechanical_engineering">Mechanical Engineering</option>
                            <option value="civil_engineering">Civil Engineering</option>
                            <option value="electrical_engineering">Electrical Engineering</option>
                            <option value="chemical_engineering">Chemical Engineering</option>
                            <option value="aerospace_engineering">Aerospace Engineering</option>
                            <option value="industrial_engineering">Industrial Engineering</option>
                          </optgroup>

                          {/* Business & Management */}
                          <optgroup label="Business & Management">
                            <option value="business_administration">Business Administration</option>
                            <option value="finance">Financial Management</option>
                            <option value="marketing">Marketing</option>
                            <option value="human_resources">Human Resources</option>
                            <option value="project_management">Project Management</option>
                            <option value="entrepreneurship">Start a Business</option>
                          </optgroup>

                          {/* Creative & Design */}
                          <optgroup label="Creative & Design">
                            <option value="graphic_design">Graphic Design</option>
                            <option value="ux_ui_design">UX/UI Design</option>
                            <option value="architecture">Architecture</option>
                            <option value="fashion_design">Fashion Design</option>
                            <option value="product_design">Product Design</option>
                          </optgroup>

                          {/* Healthcare */}
                          <optgroup label="Healthcare">
                            <option value="medicine">Medical Practice</option>
                            <option value="nursing">Nursing</option>
                            <option value="biotechnology">Biotechnology</option>
                            <option value="psychology">Psychology</option>
                            <option value="pharmacy">Pharmacy</option>
                          </optgroup>

                          {/* Education & Research */}
                          <optgroup label="Education & Research">
                            <option value="teaching">Teaching</option>
                            <option value="academic_research">Academic Research</option>
                            <option value="educational_technology">Educational Technology</option>
                          </optgroup>

                          {/* Arts & Entertainment */}
                          <optgroup label="Arts & Entertainment">
                            <option value="performing_arts">Performing Arts</option>
                            <option value="film_media">Film & Media Production</option>
                            <option value="music_production">Music Production</option>
                            <option value="game_design">Game Design</option>
                          </optgroup>

                          {/* Trades & Technical Skills */}
                          <optgroup label="Trades & Technical Skills">
                            <option value="construction">Construction</option>
                            <option value="automotive_technology">Automotive Technology</option>
                            <option value="culinary_arts">Culinary Arts</option>
                          </optgroup>

                          {/* Professional Development */}
                          <optgroup label="Professional Development">
                            <option value="leadership_development">Leadership Development</option>
                            <option value="communication_skills">Communication Skills</option>
                            <option value="personal_branding">Personal Branding</option>
                          </optgroup>

                          {/* Other Options */}
                          <option value="personal_projects">Build Personal Projects</option>
                          <option value="exam_preparation">Prepare for Professional Exams</option>
                          <option value="career_transition">Career Transition</option>
                          <option value="skill_upgrade">Skill Upgrade</option>
                          <option value="other">Other</option>
                        </select>
                      </label>

                      {formData.goals.primaryGoal === "other" ? (
                        <label className="block">
                          <span className="text-amber-800">
                            Please specify:
                          </span>
                          <input
                            type="text"
                            value={formData.goals.specificArea}
                            onChange={(e) =>
                              updateFormData("goals", "specificArea", e.target.value)
                            }
                            className="w-full p-2 border border-amber-200 rounded mt-1 focus:ring-amber-500 focus:border-amber-500"
                            required
                          />
                        </label>
                      ) : (
                        <label className="block">
                          <span className="text-amber-800">
                            Specific Area of Interest:
                          </span>
                          <input
                            type="text"
                            value={formData.goals.specificArea}
                            onChange={(e) =>
                              updateFormData("goals", "specificArea", e.target.value)
                            }
                            className="w-full p-2 border border-amber-200 rounded mt-1 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="e.g., AI/Data Science, Game Development"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Your existing steps 2-7 remain exactly the same */}
                {/* ... (keep all your existing step components) ... */}

                {/* Step 2: Experience Level */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                      {formData.goals.primaryGoal 
                        ? `Your Experience in ${
                            // Convert camelCase to Title Case
                            formData.goals.primaryGoal
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, str => str.toUpperCase())
                          }`
                        : "Your Experience Level"
                      }
                    </h2>

                    <div className="space-y-4">
                      <fieldset className="space-y-2">
                        <legend className="text-gray-700 mb-2">
                          Self-assessment:
                        </legend>
                        {(() => {
                          // Get career-specific questions or fallback to default
                          const careerQuestions = getCareerQuestions(formData.goals.primaryGoal);
                          
                          return careerQuestions.experienceQuestions.map((question, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={formData.experience.quiz.includes(question)}
                                onChange={(e) => {
                                  const selfAssessment = e.target.checked
                                    ? [...formData.experience.quiz, question]
                                    : formData.experience.quiz.filter(
                                        (q) => q !== question
                                      );
                                  updateFormData("experience", "quiz", selfAssessment);
                                }}
                                className="rounded"
                              />
                              <span>{question}</span>
                            </label>
                          ));
                        })()}
                      </fieldset>

                      <label className="block">
                        <span className="text-gray-700">
                          Additional Experience Description:
                        </span>
                        <textarea
                          value={formData.experience.description}
                          onChange={(e) =>
                            updateFormData("experience", "description", e.target.value)
                          }
                          className="w-full p-2 border rounded mt-1 h-32"
                          placeholder={`Briefly describe your experience in ${
                            formData.goals.primaryGoal 
                              ? formData.goals.primaryGoal
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())
                              : "your chosen field"
                          }...`}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Time Commitment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Time Commitment</h2>

                    <div className="space-y-4">
                      <fieldset className="space-y-2">
                        <legend className="text-gray-700">Weekly Hours:</legend>
                        {["2-5", "5-10", "10+"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="hours"
                              value={option}
                              checked={
                                formData.timeCommitment.hoursPerWeek === option
                              }
                              onChange={(e) =>
                                updateFormData("timeCommitment", "hoursPerWeek", e.target.value)
                              }
                              className="rounded"
                            />
                            <span>{option} hours/week</span>
                          </label>
                        ))}
                      </fieldset>

                      <label className="block">
                        <span className="text-gray-700">Learning Pace:</span>
                        <select
                          value={formData.timeCommitment.pace}
                          onChange={(e) =>
                            updateFormData("timeCommitment", "pace", e.target.value)
                          }
                          className="w-full p-2 border rounded mt-1"
                        >
                          <option value="relaxed">Relaxed</option>
                          <option value="moderate">Moderate</option>
                          <option value="intensive">Intensive</option>
                        </select>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 4: Learning Preferences */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Learning Preferences</h2>

                    <div className="space-y-4">
                      <fieldset className="space-y-2">
                        <legend className="text-gray-700">
                          Preferred Learning Style:
                        </legend>
                        {[
                          { value: "videos", label: "Video Tutorials" },
                          { value: "text", label: "Text/Articles" },
                          { value: "interactive", label: "Interactive Coding" },
                          {
                            value: "projects",
                            label: "Project-Based Learning",
                          },
                          { value: "theory", label: "Theory-First Approach" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="learningStyle"
                              value={option.value}
                              checked={
                                formData.preferences.learningStyle ===
                                option.value
                              }
                              onChange={(e) =>
                                updateFormData("preferences", "learningStyle", e.target.value)
                              }
                              className="rounded"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </fieldset>

                      <fieldset className="space-y-2">
                        <legend className="text-gray-700">
                          Difficulty Preference:
                        </legend>
                        {[
                          "Stick to fundamentals first",
                          "Challenge me with advanced topics early",
                        ].map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="difficulty"
                              value={option.toLowerCase().replace(/ /g, "-")}
                              checked={
                                formData.preferences.difficulty ===
                                option.toLowerCase().replace(/ /g, "-")
                              }
                              onChange={(e) =>
                                updateFormData("preferences", "difficulty", e.target.value)
                              }
                              className="rounded"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                )}

                {/* Step 5: Language & Skill Focus */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Language & Skill Focus</h2>

                    <div className="space-y-4">
                      <fieldset className="space-y-2">
                        <legend className="text-gray-700">
                          Recommended {
                            formData.goals.primaryGoal 
                              ? formData.goals.primaryGoal
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase())
                              : "Career Path"
                          } Skills:
                        </legend>
                        {(() => {
                          // Get language and skill suggestions based on career goal
                          const languageOptions = suggestLanguages(formData.goals.primaryGoal);
                          
                          return languageOptions.map((skill) => (
                            <label
                              key={skill}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  formData.languages && 
                                  formData.languages.some(
                                    (l) => l.name === skill
                                  )
                                }
                                onChange={() => handleLanguageSelection(skill)}
                                className="rounded"
                              />
                              <span>{skill}</span>
                            </label>
                          ));
                        })()}
                      </fieldset>

                      {formData.languages.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-gray-700">Set Priorities:</span>
                          {formData.languages.map((lang, index) => (
                            <div
                              key={lang.name}
                              className="flex items-center space-x-2"
                            >
                              <span>{lang.name}</span>
                              <select
                                value={lang.priority}
                                onChange={(e) => {
                                  const newLanguages = [...formData.languages];
                                  newLanguages[index].priority = parseInt(
                                    e.target.value
                                  );
                                  setFormData({
                                    ...formData,
                                    languages: newLanguages,
                                  });
                                }}
                                className="p-1 border rounded"
                              >
                                {formData.languages.map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 6: Tools & Demographics */}
                {step === 6 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                      Additional Information
                    </h2>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specific Tools/Projects
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={handleSkillInputChange}
                          onBlur={() => setTimeout(() => setShowSkillDropdown(false), 200)}
                          className="w-full p-2 border border-amber-200 rounded mt-1 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Type to search skills..."
                        />
                        {showSkillDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-amber-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {filteredSkills.length > 0 ? (
                              filteredSkills.map(skill => (
                                <div
                                  key={skill.id}
                                  className="px-4 py-2 hover:bg-amber-50 cursor-pointer"
                                  onClick={() => handleSkillSelectRoadmap(skill)}
                                >
                                  {skill.name} <span className="text-xs text-amber-600">({skill.category})</span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-amber-700">No matching skills found</div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedSkills.map(skill => (
                          <div key={skill.id} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center">
                            {skill.name}
                            <Button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1  hover:text-red-500 bg-transparent p-0 border-0"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Skill Matching Hints */}
                      {findMatchingSkillCategories(formData.tools).length > 0 && (
                        <div className="mt-2 text-sm text-amber-700">
                          🎯 We've found potential career paths based on your input!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 7: Final Feedback */}
                {step === 7 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Final Touches</h2>

                    <label className="block">
                      <span className="text-gray-700">
                        Anything else we should know?
                      </span>
                      <textarea
                        value={formData.feedback}
                        onChange={(e) =>
                          updateFormData("feedback", "feedback", e.target.value)
                        }
                        className="w-full p-2 border rounded mt-1 h-32"
                        placeholder="Additional information to help customize your roadmap..."
                      />
                    </label>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center px-6 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="flex items-center px-6 py-3 bg-amber-600 text-black rounded-lg hover:bg-amber-700 transition-colors ml-auto"
                      disabled={step === 1 && !formData.goals.primaryGoal}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center px-8 py-3 bg-amber-600 text-black rounded-lg hover:bg-amber-700 transition-colors ml-auto"
                    >
                      Generate My Roadmap →
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
  );
};

export default Roadmap;