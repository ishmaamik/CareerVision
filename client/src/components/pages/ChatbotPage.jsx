import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import {
  SmartToy,
  Psychology,
  Work,
  School,
  TrendingUp,
  QuestionAnswer,
  AutoAwesome,
} from "@mui/icons-material";
import CareerChatbot from "./CareerChatbot";

const ChatbotPage = () => {
  const features = [
    {
      icon: <Work />,
      title: "Career Guidance",
      description:
        "Get personalized advice on career paths, job transitions, and professional development.",
      color: "#667eea",
    },
    {
      icon: <QuestionAnswer />,
      title: "Interview Preparation",
      description:
        "Practice interview questions, get tips on body language, and boost your confidence.",
      color: "#764ba2",
    },
    {
      icon: <School />,
      title: "Resume Optimization",
      description:
        "Improve your resume with AI-powered suggestions and industry best practices.",
      color: "#f093fb",
    },
    {
      icon: <TrendingUp />,
      title: "Skill Development",
      description:
        "Discover trending skills in your field and create a learning roadmap.",
      color: "#f5576c",
    },
    {
      icon: <Psychology />,
      title: "Career Psychology",
      description:
        "Understand workplace dynamics, stress management, and work-life balance.",
      color: "#4facfe",
    },
    {
      icon: <AutoAwesome />,
      title: "AI-Powered Insights",
      description:
        "Get data-driven recommendations based on current market trends.",
      color: "#43e97b",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <SmartToy sx={{ fontSize: 50 }} />
        </Avatar>

        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          CareerVision AI Assistant
        </Typography>

        <Typography variant="h6" color="text.secondary" paragraph>
          Your intelligent companion for career growth and professional success
        </Typography>

        <Chip
          label="Powered by Gemini AI"
          icon={<AutoAwesome />}
          variant="outlined"
          sx={{
            fontSize: "1rem",
            p: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
          }}
        />
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3} mb={6}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    bgcolor: feature.color,
                  }}
                >
                  {feature.icon}
                </Avatar>

                <Typography variant="h6" gutterBottom fontWeight="bold">
                  {feature.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How to Use Section */}
      <Card
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
          >
            How to Get Started
          </Typography>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#667eea",
                }}
              >
                1
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Click the Chat Button
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Look for the floating AI chat button in the bottom-right corner
                of any page.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#764ba2",
                }}
              >
                2
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Ask Your Question
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type your career-related question or choose from quick action
                buttons.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#f093fb",
                }}
              >
                3
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Get AI-Powered Advice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receive personalized, actionable advice to advance your career.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
          Ready to boost your career? 🚀
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Start chatting with our AI assistant now and take the next step in
          your professional journey!
        </Typography>
      </Box>

      {/* The actual chatbot component */}
      <CareerChatbot />
    </Container>
  );
};

export default ChatbotPage;
