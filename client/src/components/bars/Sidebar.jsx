import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dashboard,
  Work,
  School,
  QuestionAnswer,
  People,
  Event,
  Business,
  Assignment,
  Psychology,
  Map,
  TrendingUp,
  Settings,
  Logout,
  Menu,
  Close,
  ChevronRight,
  Star,
  Notifications,
  AccountCircle,
  Chat,
  EventNote,
  Assessment,
  BookmarkBorder,
  WorkOutline,
  PeopleOutline,
  BarChart,
  Timeline,
  LocationOn,
  ArticleOutlined,
  CameraAlt,
  VideoCall,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  ExpandMore,
} from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses } from "../../styles/themes";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const [expandedSections, setExpandedSections] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuSections = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <Dashboard className="w-5 h-5" />,
      path: "/dashboard",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "career",
      title: "Career Discovery",
      icon: <Psychology className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subItems: [
        {
          title: "Career Assessment",
          path: "/career-assessment",
          icon: <Assessment className="w-4 h-4" />,
        },
        {
          title: "Career Paths",
          path: "/careers",
          icon: <Map className="w-4 h-4" />,
        },
        {
          title: "Skills Analysis",
          path: "/skills-analysis",
          icon: <BarChart className="w-4 h-4" />,
        },
        {
          title: "Learning Roadmaps",
          path: "/roadmap",
          icon: <Timeline className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "jobs",
      title: "Job Opportunities",
      icon: <Work className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      subItems: [
        {
          title: "Browse Jobs",
          path: "/jobs",
          icon: <WorkOutline className="w-4 h-4" />,
        },
        {
          title: "Create Job",
          path: "/jobs/create",
          icon: <WorkOutline className="w-4 h-4" />,
        },
        {
          title: "Saved Jobs",
          path: "/saved-jobs",
          icon: <BookmarkBorder className="w-4 h-4" />,
        },
        {
          title: "Applications",
          path: "/applications",
          icon: <Assignment className="w-4 h-4" />,
        },
        {
          title: "Job Alerts",
          path: "/job-alerts",
          icon: <Notifications className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "interviews",
      title: "Interview Prep",
      icon: <QuestionAnswer className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      subItems: [
        {
          title: "Practice Questions",
          path: "/interview-questions",
          icon: <QuestionAnswer className="w-4 h-4" />,
        },
        {
          title: "Interview Room",
          path: "/interview-room",
          icon: <VideoCall className="w-4 h-4" />,
        },
        {
          title: "Mock Interviews",
          path: "/mock-interviews",
          icon: <VideoCall className="w-4 h-4" />,
        },
        {
          title: "Interview History",
          path: "/interview-history",
          icon: <EventNote className="w-4 h-4" />,
        },
        {
          title: "Tips & Guides",
          path: "/interview-guides",
          icon: <ArticleOutlined className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "community",
      title: "Community",
      icon: <People className="w-5 h-5" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      subItems: [
        {
          title: "Community Forum",
          path: "/community",
          icon: <PeopleOutline className="w-4 h-4" />,
        },
        {
          title: "Network",
          path: "/network",
          icon: <PeopleOutline className="w-4 h-4" />,
        },
        {
          title: "Forums",
          path: "/forums",
          icon: <People className="w-4 h-4" />,
        },
        {
          title: "Blogs",
          path: "/blogs",
          icon: <ArticleOutlined className="w-4 h-4" />,
        },
        {
          title: "Create Blog",
          path: "/blogs/newBlog",
          icon: <ArticleOutlined className="w-4 h-4" />,
        },
        {
          title: "Messages",
          path: "/messages",
          icon: <Chat className="w-4 h-4" />,
        },
        {
          title: "Mentorship",
          path: "/mentorship",
          icon: <School className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "companies",
      title: "Companies",
      icon: <Business className="w-5 h-5" />,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      subItems: [
        {
          title: "Company Explorer",
          path: "/companies",
          icon: <Business className="w-4 h-4" />,
        },
        {
          title: "Create Company",
          path: "/company/create",
          icon: <WorkOutline className="w-4 h-4" />,
        },
        {
          title: "Company Reviews",
          path: "/company-reviews",
          icon: <Star className="w-4 h-4" />,
        },
        {
          title: "Salary Insights",
          path: "/salary-insights",
          icon: <TrendingUp className="w-4 h-4" />,
        },
        {
          title: "Culture Match",
          path: "/culture-match",
          icon: <Psychology className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "events",
      title: "Events & Learning",
      icon: <Event className="w-5 h-5" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      subItems: [
        {
          title: "Upcoming Events",
          path: "/events",
          icon: <Event className="w-4 h-4" />,
        },
        {
          title: "Webinars",
          path: "/webinars",
          icon: <VideoCall className="w-4 h-4" />,
        },
        {
          title: "Workshops",
          path: "/workshops",
          icon: <School className="w-4 h-4" />,
        },
        {
          title: "Conferences",
          path: "/conferences",
          icon: <LocationOn className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "tools",
      title: "Tools & Features",
      icon: <CameraAlt className="w-5 h-5" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      subItems: [
        {
          title: "Emotion Capture",
          path: "/emotion",
          icon: <CameraAlt className="w-4 h-4" />,
        },
        {
          title: "Career Chatbot",
          path: "/chatbot",
          icon: <Chat className="w-4 h-4" />,
        },
        {
          title: "Sample Social",
          path: "/sample",
          icon: <PeopleOutline className="w-4 h-4" />,
        },
      ],
    },
  ];

  const bottomMenuItems = [
    {
      title: "Profile",
      path: "/profile",
      icon: <AccountCircle className="w-5 h-5" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isActiveSectionRoute = (subItems) => {
    return subItems?.some((item) => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        fixed lg:relative top-0 left-0 h-full z-50 
        transform transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-80"}
        ${themeClasses.bg.surface} border-r ${
          themeClasses.border.primary
        } shadow-xl
        flex flex-col
      `}
      >
        {/* Enhanced Header with Collapse Toggle */}
        <div
          className={`flex items-center justify-between p-5 border-b ${themeClasses.border.primary} flex-shrink-0`}
        >
          {/* Beautiful Collapse/Expand Button */}
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <button
                onClick={() => setIsOpen(false)}
                className={`lg:hidden p-2 ${themeClasses.interactive.hover} rounded-lg transition-all duration-200`}
              >
                <Close className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:flex p-2 ${themeClasses.interactive.hover} rounded-lg transition-all duration-300 group ${themeClasses.border.primary} border`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <KeyboardDoubleArrowRight
                  className={`w-5 h-5 ${themeClasses.text.secondary} group-hover:scale-110 transition-transform`}
                />
              ) : (
                <KeyboardDoubleArrowLeft
                  className={`w-5 h-5 ${themeClasses.text.secondary} group-hover:scale-110 transition-transform`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className={`px-4 space-y-2 ${isCollapsed ? "px-2" : ""}`}>
            {menuSections.map((section) => (
              <div key={section.id}>
                {section.subItems ? (
                  <div>
                    {/* Section Header with Enhanced Styling */}
                    <button
                      onClick={() => !isCollapsed && toggleSection(section.id)}
                      className={`
                        w-full flex items-center p-3 rounded-xl transition-all duration-200 group relative
                        ${
                          isActiveSectionRoute(section.subItems) ||
                          expandedSections[section.id]
                            ? `${themeClasses.brand.bg} text-white shadow-lg`
                            : `${themeClasses.interactive.hover} ${themeClasses.text.secondary}`
                        }
                        ${isCollapsed ? "justify-center" : "justify-between"}
                      `}
                      title={isCollapsed ? section.title : ""}
                    >
                      <div
                        className={`flex items-center ${
                          isCollapsed ? "justify-center" : "gap-3"
                        }`}
                      >
                        <div
                          className={`
                          w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                          ${
                            isActiveSectionRoute(section.subItems) ||
                            expandedSections[section.id]
                              ? "bg-white/20"
                              : `${themeClasses.bg.accent} group-hover:scale-105`
                          }
                        `}
                        >
                          {React.cloneElement(section.icon, {
                            className: `w-5 h-5 ${
                              isActiveSectionRoute(section.subItems) ||
                              expandedSections[section.id]
                                ? "text-white"
                                : section.color
                            }`,
                          })}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium text-sm">
                            {section.title}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight
                          className={`
                          w-4 h-4 transition-transform duration-300
                          ${expandedSections[section.id] ? "rotate-90" : ""}
                          ${
                            isActiveSectionRoute(section.subItems) ||
                            expandedSections[section.id]
                              ? "text-white"
                              : themeClasses.text.muted
                          }
                        `}
                        />
                      )}
                    </button>

                    {/* Enhanced Submenu */}
                    {!isCollapsed && (
                      <div
                        className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${
                          expandedSections[section.id]
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      >
                        <div
                          className="ml-4 mt-2 space-y-1 border-l-2 border-opacity-20 pl-4"
                          style={{ borderColor: section.color }}
                        >
                          {section.subItems.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleNavigation(item.path)}
                              className={`
                                w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group
                                ${
                                  isActiveRoute(item.path)
                                    ? `${themeClasses.brand.bg} text-white shadow-md`
                                    : `${themeClasses.interactive.hover} ${themeClasses.text.secondary} hover:translate-x-1`
                                }
                              `}
                            >
                              <div
                                className={`
                                w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200
                                ${
                                  isActiveRoute(item.path)
                                    ? "bg-white/20"
                                    : `${themeClasses.bg.accent} group-hover:scale-105`
                                }
                              `}
                              >
                                {React.cloneElement(item.icon, {
                                  className: `w-4 h-4 ${
                                    isActiveRoute(item.path)
                                      ? "text-white"
                                      : themeClasses.text.muted
                                  }`,
                                })}
                              </div>
                              <span className="text-sm font-medium">
                                {item.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Single Menu Item */
                  <button
                    onClick={() => handleNavigation(section.path)}
                    className={`
                      w-full flex items-center p-3 rounded-xl transition-all duration-200 group
                      ${
                        isActiveRoute(section.path)
                          ? `${themeClasses.brand.bg} text-white shadow-lg`
                          : `${themeClasses.interactive.hover} ${themeClasses.text.secondary}`
                      }
                      ${isCollapsed ? "justify-center" : "gap-3"}
                    `}
                    title={isCollapsed ? section.title : ""}
                  >
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                      ${
                        isActiveRoute(section.path)
                          ? "bg-white/20"
                          : `${themeClasses.bg.accent} group-hover:scale-105`
                      }
                    `}
                    >
                      {React.cloneElement(section.icon, {
                        className: `w-5 h-5 ${
                          isActiveRoute(section.path)
                            ? "text-white"
                            : section.color
                        }`,
                      })}
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium text-sm">
                        {section.title}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Enhanced Bottom Menu */}
        <div
          className={`border-t ${themeClasses.border.primary} p-4 space-y-2 flex-shrink-0`}
        >
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center p-3 rounded-xl transition-all duration-200 group
                ${
                  isActiveRoute(item.path)
                    ? `${themeClasses.brand.bg} text-white shadow-lg`
                    : `${themeClasses.interactive.hover} ${themeClasses.text.secondary}`
                }
                ${isCollapsed ? "justify-center" : "gap-3"}
              `}
              title={isCollapsed ? item.title : ""}
            >
              <div
                className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                ${
                  isActiveRoute(item.path)
                    ? "bg-white/20"
                    : `${themeClasses.bg.accent} group-hover:scale-105`
                }
              `}
              >
                {React.cloneElement(item.icon, {
                  className: `w-5 h-5 ${
                    isActiveRoute(item.path)
                      ? "text-white"
                      : themeClasses.text.muted
                  }`,
                })}
              </div>
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.title}</span>
              )}
            </button>
          ))}

          {/* Enhanced Sign Out Button */}
          <button
            className={`
              w-full flex items-center p-3 rounded-xl transition-all duration-200 group
              text-red-500 hover:bg-red-50 hover:text-red-600
              ${isCollapsed ? "justify-center" : "gap-3"}
            `}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 group-hover:bg-red-100 group-hover:scale-105 transition-all duration-200">
              <Logout className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-medium text-sm">Sign Out</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
