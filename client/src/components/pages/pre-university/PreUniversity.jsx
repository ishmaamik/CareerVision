import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";
import { Psychology, School, ArrowForward } from "@mui/icons-material";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";

// Reusable ChoiceCard Component
const ChoiceCard = ({
  icon: Icon,
  title,
  description,
  gradient,
  hoverShadow,
  onClick,
}) => {
  return (
    <Paper
      role="button"
      aria-label={title}
      tabIndex={0}
      onClick={onClick}
      className="cursor-pointer group focus:outline-none"
      sx={{
        borderRadius: 8,
        p: 6,
        textAlign: "center",
        height: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: gradient,
        color: "white",
        border: "3px solid transparent",
        backgroundClip: "padding-box",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover, &:focus": {
          transform: "translateY(-12px) scale(1.03)",
          boxShadow: hoverShadow,
          border: "3px solid rgba(255,255,255,0.3)",
        },
        "&:active": {
          transform: "translateY(-8px) scale(1.01)",
        },
      }}
    >
      {/* Enhanced background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          transition: "all 0.4s ease",
        }}
        className="group-hover:scale-150 group-hover:opacity-20"
      />

      {/* Additional decorative element */}
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          transition: "all 0.4s ease",
        }}
        className="group-hover:scale-125 group-hover:opacity-30"
      />

      <Icon
        sx={{
          fontSize: 64,
          mb: 3,
          transition: "all 0.4s ease",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
        }}
        className="group-hover:scale-110 group-hover:rotate-6"
      />

      <Typography
        variant="h4"
        className="font-bold mb-2"
        sx={{
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          opacity: 0.95,
          mb: 2,
          lineHeight: 1.4,
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {description}
      </Typography>

      <ArrowForward
        sx={{
          fontSize: 24,
          transition: "all 0.4s ease",
          opacity: 0.9,
        }}
        className="group-hover:translate-x-3 group-hover:opacity-100"
      />
    </Paper>
  );
};

const PreUniversity = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-16">
        <Grid
          container
          spacing={6}
          alignItems="center"
          className="min-h-[75vh]"
        >
          {/* Left Side - Text Content */}
          <Grid item xs={12} lg={6}>
            <Box className="text-center lg:text-left" sx={{ pr: { lg: 2 } }}>
              <Typography
                variant="h2"
                className={`font-extrabold mb-4 ${themeClasses.text.primary}`}
                sx={{
                  fontSize: { xs: "2.2rem", md: "3.2rem", lg: "3.8rem" },
                  lineHeight: 1.1,
                }}
              >
                Shape Your Future with
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ml-3">
                  Smart Choices
                </span>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  lineHeight: 1.6,
                  maxWidth: "580px",
                  mx: { xs: "auto", lg: 0 },
                  color: isDarkMode
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(71,85,105,0.9)",
                  fontWeight: 500,
                }}
              >
                Get personalized guidance to make informed decisions about your
                career path and university selection before starting your higher
                education journey.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Choice Boxes */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ pl: { lg: 3 } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <ChoiceCard
                    icon={Psychology}
                    title="Career Choice"
                    description="Discover careers that align with your strengths and interests"
                    gradient={
                      isDarkMode
                        ? "linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1e3a8a 100%)"
                        : "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
                    }
                    hoverShadow="0 20px 40px rgba(59, 130, 246, 0.4)"
                    onClick={() => navigate("/pre-university/career-choice")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ChoiceCard
                    icon={School}
                    title="University Choice"
                    description="Find the best-fit university to achieve your goals"
                    gradient={
                      isDarkMode
                        ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)"
                        : "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)"
                    }
                    hoverShadow="0 20px 40px rgba(139, 92, 246, 0.4)"
                    onClick={() =>
                      navigate("/pre-university/university-choice")
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PreUniversity;
