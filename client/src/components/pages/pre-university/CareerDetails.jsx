import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  GraduationCap,
  BookOpen,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Calendar,
  Award,
  Users,
  Clock,
  TrendingUp,
  Route,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { getTheme, getThemeClasses } from "../../../styles/themes";

const CareerDetails = () => {
  // React Router navigation and params
  const navigate = useNavigate();
  const { careerTitle: careerTitleParam } = useParams();
  
  // Theme context
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode);
  const themeClasses = getThemeClasses(isDarkMode);

  // Decode the career title from URL and format it properly
  const careerTitle = careerTitleParam
    ? decodeURIComponent(careerTitleParam)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "Software Engineering";

  // Mock data for demo purposes
  const [career, setCareer] = useState({
    careerTitle: careerTitle,
    detailedDescription:
      "Software engineering is the systematic application of engineering approaches to the development of software. It involves designing, developing, testing, and maintaining software systems.",
    benefits:
      "High salary potential, flexible work arrangements, continuous learning opportunities, and the ability to create innovative solutions that impact millions of users worldwide.",
    idealCandidates:
      "Perfect for analytical thinkers who enjoy problem-solving, have strong attention to detail, and are passionate about technology and continuous learning.",
    interestTags: ["Technology", "Problem Solving", "Innovation", "Analytics"],
    recommendedSubjects: [
      "Mathematics",
      "Computer Science",
      "Physics",
      "Statistics",
      "Logic",
    ],
  });
  const videos = [
    {
      id: { videoId: "dQw4w9WgXcQ" }, // Sample YouTube video ID
      snippet: {
        title: "Complete Software Engineering Career Guide 2024",
        channelTitle: "Tech Career Hub",
        thumbnails: {
          high: {
            url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
          },
        },
      },
    },
    {
      id: { videoId: "ZSWl0dJ65_E" }, // Sample YouTube video ID  
      snippet: {
        title: "Day in the Life of a Software Engineer",
        channelTitle: "CodeWithMike",
        thumbnails: {
          high: {
            url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
          },
        },
      },
    },
    {
      id: { videoId: "kqtD5dpn9C8" }, // Sample YouTube video ID
      snippet: {
        title: "How to Learn Programming from Scratch",
        channelTitle: "Programming Academy",
        thumbnails: {
          high: {
            url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
          },
        },
      },
    },
  ];
  const [loading, setLoading] = useState(false);
  const [videoLoading] = useState(false);
  const [expandedUniversity, setExpandedUniversity] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Mock university data for Bangladesh
  const bangladeshiUniversities = [
    {
      id: 1,
      name: "University of Dhaka",
      ranking: 1,
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=80&h=80&fit=crop",
      studentReview: {
        rating: 4.5,
        review:
          "Excellent program with experienced faculty and comprehensive curriculum. The theoretical foundation is strong and practical exposure is adequate.",
        reviewer: "Rahul Ahmed",
        year: "Final Year Student",
      },
      syllabusLink: "https://du.ac.bd/academic/department_item/CSE",
      location: "Dhaka",
      established: 1921,
      students: "37,000+",
    },
    {
      id: 2,
      name: "BUET",
      ranking: 2,
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
      studentReview: {
        rating: 4.8,
        review:
          "Top-tier engineering education with cutting-edge research facilities. Very competitive environment that pushes you to excel.",
        reviewer: "Fatima Khan",
        year: "Graduate",
      },
      syllabusLink: "https://www.buet.ac.bd/web/#/department/CSE/6",
      location: "Dhaka",
      established: 1962,
      students: "10,000+",
    },
    {
      id: 3,
      name: "North South University",
      ranking: 3,
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=80&h=80&fit=crop",
      studentReview: {
        rating: 4.3,
        review:
          "Modern curriculum with industry connections. Great for practical skills development and international exposure.",
        reviewer: "Sakib Rahman",
        year: "Alumni",
      },
      syllabusLink: "https://www.northsouth.edu/academic/shls/cse/",
      location: "Dhaka",
      established: 1992,
      students: "20,000+",
    },
  ];

  useEffect(() => {
    // Update career data when URL parameter changes
    setCareer((prev) => ({
      ...prev,
      careerTitle: careerTitle,
    }));
    setLoading(false);
  }, [careerTitle]);

  const handleUniversityClick = (universityId) => {
    setExpandedUniversity(
      expandedUniversity === universityId ? null : universityId
    );
  };

  const handleVideoPlay = (video) => {
    setCurrentVideo(video);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideo(null);
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded-2xl mb-8"></div>
            <div className="space-y-6">
              <div className="h-96 bg-gray-300 rounded-2xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-300 rounded-2xl"></div>
                <div className="h-64 bg-gray-300 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 py-16 text-center">
          <h2
            className={themeClasses.text.secondary}
          >
            Career not found
          </h2>
          <button
            onClick={() => navigate("/pre-university/career-choice")}
            className="text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.colors.brand.primary }}
          >
            Back to Career Choice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${themeClasses.bg.primary}`}
    >
      {/* Header */}
      <div
        className={`relative overflow-hidden`}
        style={{ backgroundColor: theme.colors.brand.primary }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
        <div className="relative container mx-auto px-6 py-12">
          <button
            onClick={() => navigate("/pre-university/career-choice")}
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Career Choice
          </button>

          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              {career.careerTitle}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {career.interestTags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-white mr-3" />
                <div>
                  <p className="text-white/80 text-xs">Salary Range</p>
                  <p className="text-white text-lg font-bold">
                    $65,000 - $180,000
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-white mr-3" />
                <div>
                  <p className="text-white/80 text-xs">Job Growth</p>
                  <p className="text-white text-lg font-bold">+22%</p>
                </div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-white mr-3" />
                <div>
                  <p className="text-white/80 text-xs">Experience</p>
                  <p className="text-white text-lg font-bold">
                    Entry to Senior
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Button Section */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/pre-university/roadmap/${encodeURIComponent(career.careerTitle.toLowerCase().replace(/\s+/g, '-'))}`)}
              className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white"
              style={{ backgroundColor: theme.colors.brand.secondary }}
            >
              <Route className="w-6 h-6 mr-3" />
              View Career Roadmap
            </button>
            <p className="text-white/80 text-sm mt-2">
              Get a step-by-step guide to build your career in {career.careerTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Career Overview */}
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl shadow-lg border mb-6`}
        >
          <div
            className={`p-4 rounded-t-2xl ${themeClasses.bg.accent}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen
                  className="w-5 h-5 mr-2"
                  style={{ color: theme.colors.brand.primary }}
                />
                <h2
                  className={`text-lg font-bold ${themeClasses.text.primary}`}
                >
                  Career Overview
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/pre-university/roadmap/${encodeURIComponent(
                      career.careerTitle
                    )}`
                  )
                }
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 text-white hover:opacity-90"
                style={{ backgroundColor: theme.colors.brand.primary }}
              >
                <Route className="w-4 h-4 mr-2" />
                Roadmap
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3
                  className={`text-base font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  About This Career
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {career.detailedDescription}
                </p>
              </div>

              <div>
                <h3
                  className={`text-base font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Key Benefits
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {career.benefits}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3
                  className={`text-base font-semibold mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Ideal For
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {career.idealCandidates}
                </p>
              </div>

              <div>
                <h3
                  className={`text-base font-semibold mb-3 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Required Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.recommendedSubjects?.map((subject, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300 border-gray-600"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources - Full Width */}
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl shadow-lg border mb-6 overflow-hidden`}
        >
            <div
              className={`relative`}
              style={{ 
                background: isDarkMode 
                  ? theme.colors.surface 
                  : `linear-gradient(to right, ${theme.colors.brand.primary}, ${theme.colors.brand.secondary})`
              }}
            >
              <div className="p-5 rounded-t-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center">
                    <Play
                      className="w-6 h-6 mr-3 text-white"
                    />
                    <h2
                      className="text-xl font-bold text-white tracking-tight"
                    >
                      Learning Resources
                    </h2>
                  </div>
                  <button
                    className="text-sm px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md text-white"
                    style={{ 
                      backgroundColor: isDarkMode ? theme.colors.brand.primary : 'rgba(255,255,255,0.2)',
                      border: isDarkMode ? 'none' : '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

          <div className="p-6">
            {videoLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from(new Array(3)).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div
                      className={`h-48 rounded-xl ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.slice(0, 3).map((video, index) => (
                  <div
                    key={video.id?.videoId || index}
                    className={`group rounded-xl border transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 hover:border-gray-500"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    } hover:shadow-lg`}
                  >
                    <div
                      className="relative aspect-video cursor-pointer overflow-hidden"
                    >
                      <img
                        src={
                          video.snippet?.thumbnails?.high?.url ||
                          `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop`
                        }
                        alt={video.snippet?.title || "Video thumbnail"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity">
                      </div>
                      <div 
                        className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-md font-medium"
                        style={{ backgroundColor: theme.colors.brand.primary }}
                      >
                        HD
                      </div>
                    </div>

                    <div className="p-4">
                      <h4
                        className={`font-semibold text-sm mb-2 line-clamp-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {video.snippet?.title ||
                          `Career Guide Video ${index + 1}`}
                      </h4>
                      <div className="flex justify-between items-center mb-3">
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {video.snippet?.channelTitle || "Educational Channel"}
                        </p>
                        <div
                          className={`flex items-center text-xs ${
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          <span>12:45</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleVideoPlay(video)}
                        className="w-full py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center text-white hover:opacity-90"
                        style={{ backgroundColor: theme.colors.brand.primary }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Universities */}
        <div
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-2xl shadow-lg border`}
        >
          <div
            className={`p-4 rounded-t-2xl ${themeClasses.bg.accent}`}
          >
            <div className="flex items-center">
              <GraduationCap
                className="w-5 h-5 mr-2"
                style={{ color: theme.colors.brand.primary }}
              />
              <h2
                className={`text-lg font-bold ${themeClasses.text.primary}`}
              >
                Top Universities in Bangladesh
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {bangladeshiUniversities.map((university) => (
                <div key={university.id} className="space-y-3">
                  <div
                    className={`rounded-xl p-4 border transition-all duration-300 cursor-pointer ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 hover:border-gray-500"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    } hover:shadow-md`}
                    onClick={() => handleUniversityClick(university.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={university.logo}
                          alt={university.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        />
                        <div>
                          <h3
                            className={`font-semibold text-base ${
                              isDarkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {university.name}
                          </h3>
                          <div
                            className={`flex items-center space-x-4 text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <span className="flex items-center">
                              <Award className="w-3 h-3 mr-1" />#
                              {university.ranking}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {university.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedUniversity === university.id ? (
                        <ChevronUp
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                      ) : (
                        <ChevronDown
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {expandedUniversity === university.id && (
                    <div
                      className={`rounded-xl p-4 border space-y-4 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div
                          className={`flex items-center ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Calendar
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          Est. {university.established}
                        </div>
                        <div
                          className={`flex items-center ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Users
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          {university.students} students
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <
                                  Math.floor(university.studentReview.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span
                              className={`ml-2 text-sm font-medium ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {university.studentReview.rating}/5
                            </span>
                          </div>
                        </div>

                        <blockquote
                          className={`text-sm italic mb-3 leading-relaxed ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          "{university.studentReview.review}"
                        </blockquote>

                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          — {university.studentReview.reviewer},{" "}
                          {university.studentReview.year}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          window.open(university.syllabusLink, "_blank")
                        }
                        className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center text-white hover:opacity-90"
                        style={{ backgroundColor: theme.colors.brand.secondary }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Syllabus
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && currentVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl mx-auto p-2 md:p-4">
            <button
              onClick={handleCloseVideoModal}
              className="absolute -top-14 right-2 text-white/80 hover:text-white p-2 z-10 transition-colors rounded-full"
              style={{ 
                ':hover': { backgroundColor: `${theme.colors.brand.primary}30` }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&fs=1`}
                  title={currentVideo.snippet?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              <div className="p-6 bg-gray-900 text-white border-t border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{currentVideo.snippet?.title}</h3>
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-white text-xs px-2 py-1 rounded font-medium"
                        style={{ backgroundColor: `${theme.colors.brand.primary}40` }}
                      >
                        HD
                      </span>
                      <p className="text-sm text-gray-300">{currentVideo.snippet?.channelTitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400 mt-4">
                  <p>{currentVideo.snippet?.description || "Learn more about this career path through this informative video guide. This video provides valuable insights and practical advice to help you make informed decisions about your future."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetails;
