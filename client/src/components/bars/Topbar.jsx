import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Business,
  QuestionAnswer,
  PeopleAlt as People,
  Work as Work,
  Map as Map,
  Event as EventIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AppRegistration as SignupIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Assignment as BlogIcon,
  Notifications,
  Search,
  KeyboardArrowDown,
  ChevronRight,
} from "@mui/icons-material";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses } from "../../styles/themes";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  const user = JSON.parse(localStorage.getItem(`user`));

  // Routes where sidebar should be hidden
  const noSidebarRoutes = ["/", "/login", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  const LogInOrOut = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const navigation = [
    {
      name: "Jobs",
      href: "/jobs",
      icon: Work,
      description: "Find your dream job",
    },
    {
      name: "Companies",
      href: "/companies",
      icon: Business,
      description: "Explore top companies",
    },
    {
      name: "Career Roadmap",
      href: "/roadmap",
      icon: Map,
      description: "Plan your career path",
    },
    {
      name: "Community",
      href: "/community",
      icon: People,
      description: "Connect with peers",
    },
    {
      name: "Interview Bank",
      href: "/interview-questions",
      icon: QuestionAnswer,
      description: "Practice interviews",
    },
    {
      name: "Events",
      href: "/events",
      icon: EventIcon,
      description: "Join career events",
    },
    {
      name: "Blogs",
      href: "/blogs",
      icon: BlogIcon,
      description: "Career insights",
    },
  ];

  return (
    <>
      <header
        className={`h-16 flex-shrink-0 backdrop-blur-xl border-b shadow-sm transition-all duration-300 ${themeClasses.bg.surface} ${themeClasses.border.primary}`}
      >
        <nav className="h-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Left Section - Menu Button + Logo */}
            <div className="flex items-center gap-4">
              {/* Sidebar Menu Button - Only show on sidebar pages */}
              {showSidebar && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`lg:hidden p-3 rounded-xl ${themeClasses.interactive.hover} transition-all duration-200 group`}
                >
                  <MenuIcon
                    className={`w-6 h-6 ${themeClasses.text.secondary} group-hover:scale-110 transition-transform`}
                  />
                </button>
              )}

              {/* Enhanced Logo */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-3 group py-2"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${themeClasses.brand.bg} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <span className="text-white font-bold text-xl">CV</span>
                </div>
                <div className="hidden sm:block">
                  <span
                    className={`text-xl font-bold transition-colors group-hover:opacity-80 ${themeClasses.text.primary}`}
                  >
                    CareerVision
                  </span>
                  <p className={`text-xs ${themeClasses.text.muted} -mt-1`}>
                    Your Career Partner
                  </p>
                </div>
              </button>
            </div>

            {/* Center Section - Navigation (Only show on non-sidebar pages) */}
            {!showSidebar && (
              <div className="hidden lg:flex items-center space-x-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`group relative flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-200 ${themeClasses.interactive.hover} ${themeClasses.text.secondary} hover:scale-105`}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.name}</span>

                    {/* Hover tooltip */}
                    <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div
                        className={`px-3 py-2 ${themeClasses.bg.surface} ${themeClasses.border.primary} border rounded-lg shadow-lg backdrop-blur-sm`}
                      >
                        <p
                          className={`text-xs ${themeClasses.text.muted} whitespace-nowrap`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Right Section - Search + User Actions + Theme */}
            <div className="flex items-center space-x-4">
              {/* Search Bar (Hidden on mobile) */}
              <div className="hidden md:flex items-center relative">
                <div
                  className={`flex items-center ${themeClasses.bg.accent} rounded-xl px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-opacity-50`}
                >
                  <Search
                    className={`w-5 h-5 ${themeClasses.text.muted} mr-3`}
                  />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    className={`bg-transparent outline-none placeholder-${themeClasses.text.muted} ${themeClasses.text.primary} text-sm w-52 lg:w-64`}
                  />
                </div>
              </div>

              {/* Notifications (For logged in users) */}
              {user && (
                <button
                  className={`relative p-3 rounded-xl ${themeClasses.interactive.hover} transition-all duration-200 group`}
                >
                  <Notifications
                    className={`w-6 h-6 ${themeClasses.text.secondary} group-hover:scale-110 transition-transform`}
                  />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              )}

              {/* User Actions */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${themeClasses.interactive.hover} ${themeClasses.text.secondary}`}
                  >
                    <PersonIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium hidden sm:block">Profile</span>
                  </button>

                  <div
                    className={`w-px h-8 ${themeClasses.border.primary} bg-opacity-50`}
                  ></div>

                  <button
                    onClick={LogInOrOut}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 group`}
                  >
                    <LogoutIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium hidden sm:block">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${themeClasses.interactive.hover} ${themeClasses.text.secondary}`}
                  >
                    <LoginIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium hidden sm:block">Login</span>
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className={`flex items-center space-x-3 px-6 py-3 ${themeClasses.brand.bg} text-white rounded-xl hover:shadow-lg transition-all duration-200 group hover:scale-105`}
                  >
                    <SignupIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Sign Up</span>
                  </button>
                </div>
              )}

              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl transition-all duration-200 group ${themeClasses.interactive.hover} ${themeClasses.text.secondary}`}
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                ) : (
                  <MenuIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden ${themeClasses.bg.surface} border-t ${themeClasses.border.primary} shadow-xl animate-fade-in absolute top-full left-0 right-0 z-50`}
          >
            <div className="px-6 py-6">
              {/* Mobile Search */}
              <div className="mb-6">
                <div
                  className={`flex items-center ${themeClasses.bg.accent} rounded-xl px-4 py-4`}
                >
                  <Search
                    className={`w-5 h-5 ${themeClasses.text.muted} mr-3`}
                  />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    className={`bg-transparent outline-none placeholder-${themeClasses.text.muted} ${themeClasses.text.primary} text-sm flex-1`}
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl transition-all duration-200 group ${themeClasses.interactive.hover}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${themeClasses.bg.accent} group-hover:scale-105 transition-transform`}
                    >
                      <item.icon
                        className={`w-6 h-6 ${themeClasses.text.secondary}`}
                      />
                    </div>
                    <div className="text-left flex-1">
                      <div
                        className={`font-medium text-base ${themeClasses.text.primary}`}
                      >
                        {item.name}
                      </div>
                      <div className={`text-sm ${themeClasses.text.muted}`}>
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${themeClasses.text.muted} group-hover:translate-x-1 transition-transform`}
                    />
                  </button>
                ))}
              </div>

              {/* Mobile Theme Toggle */}
              <div
                className={`mt-6 pt-6 border-t ${themeClasses.border.primary} border-opacity-20`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium text-base ${themeClasses.text.primary}`}
                  >
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Topbar;
