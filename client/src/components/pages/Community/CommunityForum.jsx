import React, { useState } from "react";
import {
  Work,
  School,
  Code,
  Business,
  Psychology,
  TrendingUp,
  VideoLibrary,
  Article,
  Forum,
  FilterList,
  Search,
} from "@mui/icons-material";
import { Button, TextField, InputAdornment, Chip } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import Social from "./Social";
import Articles from "./Articles";
import Videos from "./Videos";
const CommunityForum = () => {
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  const [activeSection, setActiveSection] = useState("Vlogs");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const sections = [
    { name: "Vlogs", icon: <VideoLibrary />, component: "Videos" },
    { name: "Articles", icon: <Article />, component: "Articles" },
    { name: "Discussions", icon: <Forum />, component: "Social" },
  ];

  const vlogCategories = [
    { name: "All", icon: <FilterList />, color: "default" },
    { name: "Job Related", icon: <Work />, color: "primary" },
    { name: "Tech & Programming", icon: <Code />, color: "secondary" },
    { name: "Business & Finance", icon: <Business />, color: "success" },
    { name: "Education & Learning", icon: <School />, color: "warning" },
    { name: "Career Growth", icon: <TrendingUp />, color: "info" },
    { name: "Psychology & Wellness", icon: <Psychology />, color: "error" },
  ];

  const setTab = (sectionName) => {
    setActiveSection(sectionName);
  };

  const setCategory = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const renderActiveComponent = () => {
    const activeItem = sections.find((s) => s.name === activeSection);
    switch (activeItem?.component) {
      case "Videos":
        return <Videos searchTerm={searchTerm} category={activeCategory} />;
      case "Articles":
        return <Articles searchTerm={searchTerm} category={activeCategory} />;
      case "Social":
        return <Social searchTerm={searchTerm} category={activeCategory} />;
      default:
        return <Videos searchTerm={searchTerm} category={activeCategory} />;
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg.primary}`}>
      {/* Header Section */}
      <div
        className={`${themeClasses.bg.secondary} border-b ${themeClasses.border.primary} pt-20`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div>
              <h1
                className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}
              >
                Community Hub
              </h1>
              <p className={`text-lg ${themeClasses.text.secondary}`}>
                Share knowledge, connect with peers, and grow together
              </p>
            </div>

            {/* Search Bar */}
            <div className="lg:w-96">
              <TextField
                fullWidth
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="medium"
                className={componentStyles.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className={themeClasses.text.muted} />
                    </InputAdornment>
                  ),
                  className: `${componentStyles.input} border-0`,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
                    borderRadius: "12px",
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                }}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mt-6">
            {sections.map((section) => (
              <Button
                key={section.name}
                onClick={() => setTab(section.name)}
                variant={
                  activeSection === section.name ? "contained" : "outlined"
                }
                startIcon={section.icon}
                className={`${
                  activeSection === section.name
                    ? componentStyles.button.primary
                    : componentStyles.button.secondary
                } !normal-case !font-medium !px-6 !py-3`}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  minWidth: "120px",
                }}
              >
                {section.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Section - Only show for Vlogs */}
      {activeSection === "Vlogs" && (
        <div
          className={`${themeClasses.bg.accent} border-b ${themeClasses.border.primary}`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 mb-3">
              <FilterList className={themeClasses.text.secondary} />
              <span className={`font-medium ${themeClasses.text.secondary}`}>
                Filter by Category:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {vlogCategories.map((category) => (
                <Chip
                  key={category.name}
                  icon={category.icon}
                  label={category.name}
                  clickable
                  variant={
                    activeCategory === category.name ? "filled" : "outlined"
                  }
                  color={
                    activeCategory === category.name ? "primary" : "default"
                  }
                  onClick={() => setCategory(category.name)}
                  sx={{
                    borderRadius: "8px",
                    fontWeight: activeCategory === category.name ? 600 : 400,
                    backgroundColor:
                      activeCategory === category.name
                        ? isDarkMode
                          ? "#3b82f6"
                          : "#2563eb"
                        : isDarkMode
                        ? "transparent"
                        : "transparent",
                    color:
                      activeCategory === category.name
                        ? "white"
                        : isDarkMode
                        ? "#e2e8f0"
                        : "#475569",
                    borderColor: isDarkMode ? "#475569" : "#cbd5e1",
                    "&:hover": {
                      backgroundColor:
                        activeCategory === category.name
                          ? isDarkMode
                            ? "#2563eb"
                            : "#1d4ed8"
                          : isDarkMode
                          ? "#475569"
                          : "#f1f5f9",
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default CommunityForum;
