// src/components/cards/CareerCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Box, Typography, Chip, Paper, Fade } from "@mui/material";
import {
  Work,
  TrendingUp,
  School,
  Code,
  Biotech,
  Psychology,
  AccountBalance,
  Build,
  Palette,
  LocalHospital,
  Gavel,
  School as Teaching,
  Business,
  Engineering,
  Campaign,
  Restaurant,
} from "@mui/icons-material";

const CareerCard = ({ career }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Function to get job-specific icon
  const getCareerIcon = (careerTitle) => {
    const title = careerTitle.toLowerCase();

    if (
      title.includes("software") ||
      title.includes("developer") ||
      title.includes("programmer")
    ) {
      return Code;
    } else if (
      title.includes("doctor") ||
      title.includes("physician") ||
      title.includes("medical")
    ) {
      return LocalHospital;
    } else if (
      title.includes("teacher") ||
      title.includes("educator") ||
      title.includes("professor")
    ) {
      return Teaching;
    } else if (title.includes("engineer")) {
      return Engineering;
    } else if (
      title.includes("designer") ||
      title.includes("artist") ||
      title.includes("creative")
    ) {
      return Palette;
    } else if (
      title.includes("lawyer") ||
      title.includes("attorney") ||
      title.includes("legal")
    ) {
      return Gavel;
    } else if (
      title.includes("psychologist") ||
      title.includes("therapist") ||
      title.includes("counselor")
    ) {
      return Psychology;
    } else if (
      title.includes("scientist") ||
      title.includes("researcher") ||
      title.includes("biologist")
    ) {
      return Biotech;
    } else if (
      title.includes("business") ||
      title.includes("manager") ||
      title.includes("executive")
    ) {
      return Business;
    } else if (
      title.includes("marketing") ||
      title.includes("sales") ||
      title.includes("advertising")
    ) {
      return Campaign;
    } else if (
      title.includes("chef") ||
      title.includes("cook") ||
      title.includes("culinary")
    ) {
      return Restaurant;
    } else if (
      title.includes("banker") ||
      title.includes("finance") ||
      title.includes("accountant")
    ) {
      return AccountBalance;
    } else if (
      title.includes("mechanic") ||
      title.includes("technician") ||
      title.includes("repair")
    ) {
      return Build;
    } else {
      return Work;
    }
  };

  const IconComponent = getCareerIcon(career.careerTitle);

  const handleClick = () => {
    // Create URL-friendly career title
    const urlTitle = career.careerTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/pre-university/career/${urlTitle}`);
  };

  return (
    <Fade in={true} timeout={300}>
      <Paper
        onClick={handleClick}
        className="cursor-pointer group"
        sx={{
          borderRadius: 3,
          height: "280px", // Slightly reduced height
          width: "100%",
          maxWidth: "400px", // Wider cards
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          background: isDarkMode
            ? "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: isDarkMode ? "2px solid #374151" : "2px solid #d1d5db", // Better light mode border
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          position: "relative",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: isDarkMode
              ? "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168, 85, 247, 0.4)"
              : "0 30px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(168, 85, 247, 0.3)",
            border: isDarkMode ? "2px solid #a855f7" : "2px solid #a855f7",
          },
        }}
      >
        {/* Gradient Background Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
            opacity: 0,
            transition: "all 0.4s ease",
          }}
          className="group-hover:opacity-100"
        />

        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
            opacity: 0.1,
            transition: "all 0.4s ease",
          }}
          className="group-hover:scale-150 group-hover:opacity-20"
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)",
            opacity: 0.08,
            transition: "all 0.4s ease",
          }}
          className="group-hover:scale-125 group-hover:opacity-15"
        />

        {/* Header with Icon */}
        <Box
          sx={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 4,
              background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s ease",
              boxShadow: "0 8px 25px rgba(168, 85, 247, 0.3)",
            }}
            className="group-hover:scale-110 group-hover:rotate-12"
          >
            <Work sx={{ fontSize: 28, color: "white" }} />
          </Box>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            p: 3,
            pt: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Title */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? "#f8fafc" : "#0f172a",
                fontSize: "1.1rem",
                lineHeight: 1.2,
                height: "2.6rem", // Fixed height for 2 lines
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                mb: 1.5,
              }}
            >
              {career.careerTitle}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? "#94a3b8" : "#64748b",
                lineHeight: 1.4,
                height: "2.8rem", // Fixed height for 2 lines
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontSize: "0.85rem",
              }}
            >
              {career.summary}
            </Typography>
          </Box>

          {/* Interest Tags */}
          <Box sx={{ textAlign: "center", mb: 2, height: "1.5rem" }}>
            {career.interestTags &&
              career.interestTags.slice(0, 2).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    mr: 0.5,
                    backgroundColor: isDarkMode ? "#374151" : "#f8fafc",
                    color: isDarkMode ? "#d1d5db" : "#475569",
                    fontSize: "0.65rem",
                    height: "20px",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                    "&:hover": {
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                      color: isDarkMode ? "#a855f7" : "#7c3aed",
                    },
                  }}
                />
              ))}
          </Box>

          {/* Footer Info */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              pt: 2,
              borderTop: `1px solid ${isDarkMode ? "#374151" : "#e2e8f0"}`,
              height: "40px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUp
                sx={{
                  fontSize: 16,
                  color: "#10b981",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                Growing
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <School
                sx={{
                  fontSize: 16,
                  color: "#3b82f6",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                {career.universityMajors?.length || 0} Majors
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default CareerCard;
