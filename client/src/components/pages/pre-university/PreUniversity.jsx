import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";
import {
  Psychology,
  School,
  ArrowForward,
  TrendingUp,
  Timeline,
  Assessment,
  Star,
  CheckCircle,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
} from "@mui/material";

// Reusable ChoiceCard Component
const ChoiceCard = ({
  icon: IconComponent,
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

      <IconComponent
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Assessment,
      title: "Personality Assessment",
      description:
        "Discover your strengths and interests through comprehensive assessments",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Get real-time data on career demand and salary trends",
    },
    {
      icon: Timeline,
      title: "Career Roadmaps",
      description: "Step-by-step guidance from education to career success",
    },
  ];

  const benefits = [
    "Make informed career decisions",
    "Discover hidden talents and interests",
    "Access comprehensive university database",
    "Get personalized recommendations",
    "Connect with industry professionals",
  ];

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      {/* Hero Section */}
      <Container maxWidth="xl" className="py-16">
        <Fade in={isVisible} timeout={1000}>
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
                    mb: 4,
                    color: isDarkMode
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(71,85,105,0.9)",
                    fontWeight: 500,
                  }}
                >
                  Get personalized guidance to make informed decisions about
                  your career path and university selection before starting your
                  higher education journey.
                </Typography>

                {/* Benefits List */}
                <Box sx={{ mb: 4, display: { xs: "none", md: "block" } }}>
                  <List sx={{ py: 0 }}>
                    {benefits.slice(0, 3).map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle
                            sx={{
                              color: "#10B981",
                              fontSize: 20,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={benefit}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.95rem",
                              color: themeClasses.text.secondary,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/pre-university/career-choice")}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                    },
                    transition: "all 0.3s ease",
                    display: { xs: "none", md: "inline-flex" },
                  }}
                >
                  Start Your Journey
                  <ArrowForward sx={{ ml: 1 }} />
                </Button>
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

                {/* Mobile CTA Button */}
                <Box
                  sx={{
                    mt: 4,
                    textAlign: "center",
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/pre-university/career-choice")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Start Your Journey
                    <ArrowForward sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(67, 56, 202, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Fade in={isVisible} timeout={1500}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                className={`font-bold mb-3 ${themeClasses.text.primary}`}
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                Why Choose Our Platform?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: themeClasses.text.secondary,
                  maxWidth: "600px",
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                Advanced tools and insights to help you make the best decisions
                for your future
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={isVisible} timeout={1000 + index * 300}>
                  <Card
                    sx={{
                      height: "100%",
                      background: isDarkMode
                        ? "rgba(30, 41, 59, 0.8)"
                        : "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${
                        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                      }`,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: isDarkMode
                          ? "0 20px 40px rgba(0,0,0,0.3)"
                          : "0 20px 40px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: 2,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          mb: 3,
                        }}
                      >
                        <feature.icon sx={{ fontSize: 32, color: "white" }} />
                      </Box>
                      <Typography
                        variant="h5"
                        className={`font-semibold mb-2 ${themeClasses.text.primary}`}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: themeClasses.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Fade in={isVisible} timeout={2000}>
          <Grid container spacing={4} sx={{ textAlign: "center" }}>
            {[
              { number: "500+", label: "Career Paths" },
              { number: "1000+", label: "Universities" },
              { number: "95%", label: "Success Rate" },
              { number: "50K+", label: "Students Helped" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box>
                  <Typography
                    variant="h3"
                    className={`font-bold ${themeClasses.text.primary}`}
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: themeClasses.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default PreUniversity;
