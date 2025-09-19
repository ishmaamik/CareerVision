import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getThemeClasses } from "../../../styles/themes";
import { useTheme } from "../../../context/ThemeContext";
import {
  Search as SearchIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Send as SendIcon,
  Business as BusinessIcon,
  LocalHospital as MedicalIcon,
  Computer as TechIcon,
  Palette as CreativeIcon,
  Group as SocialIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { mockCareers } from "../../../api/career/mockCareerData";

// Styled Components
const CareerCard = styled(Card)(({ isDarkMode }) => ({
  borderRadius: "8px",
  border: `1px solid ${
    isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  }`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: isDarkMode
      ? "0 4px 12px rgba(0, 0, 0, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

const ChatContainer = styled(Paper)(({ isDarkMode }) => ({
  height: "600px",
  borderRadius: "8px",
  border: `1px solid ${
    isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  }`,
  display: "flex",
  flexDirection: "column",
}));

const ChatMessage = styled(Box)(({ isUser, isDarkMode }) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  marginBottom: "12px",
  "& .message-bubble": {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "16px",
    backgroundColor: isUser
      ? "#1976d2"
      : isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.05)",
    color: isUser ? "white" : "inherit",
  },
}));

// Message types
const MESSAGE_TYPES = {
  USER: "user",
  BOT: "bot",
};

const CareerExplorer = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const chatEndRef = useRef(null);

  // State management
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: MESSAGE_TYPES.BOT,
      content:
        "Hello! I'm your career assistant. I can help you explore different career paths, answer questions about specific fields, and provide personalized recommendations. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Fetch careers
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        // Use mock data directly
        const data = mockCareers;
        setCareers(data);
        setFilteredCareers(data);
        setError(null);
      } catch (err) {
        console.error("Error loading careers:", err);
        setError("Failed to load careers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCareers(careers);
      return;
    }

    const filtered = careers.filter(
      (career) =>
        career.careerTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.interestTags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredCareers(filtered);
  }, [searchQuery, careers]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Helper functions
  const getCareerIcon = (career) => {
    const title = career.careerTitle.toLowerCase();
    const tags = career.interestTags?.join(" ").toLowerCase() || "";

    if (
      title.includes("doctor") ||
      title.includes("nurse") ||
      tags.includes("healthcare")
    )
      return <MedicalIcon />;
    if (
      title.includes("engineer") ||
      title.includes("developer") ||
      tags.includes("technology")
    )
      return <TechIcon />;
    if (
      title.includes("designer") ||
      title.includes("artist") ||
      tags.includes("creative")
    )
      return <CreativeIcon />;
    if (
      title.includes("manager") ||
      title.includes("business") ||
      tags.includes("business")
    )
      return <BusinessIcon />;
    if (
      title.includes("teacher") ||
      title.includes("social") ||
      tags.includes("social")
    )
      return <SocialIcon />;
    return <WorkIcon />;
  };

  const getCareerCategory = (career) => {
    const title = career.careerTitle.toLowerCase();
    const tags = career.interestTags?.join(" ").toLowerCase() || "";

    if (
      title.includes("doctor") ||
      title.includes("nurse") ||
      tags.includes("healthcare")
    )
      return "healthcare";
    if (
      title.includes("engineer") ||
      title.includes("developer") ||
      tags.includes("technology")
    )
      return "technology";
    if (
      title.includes("designer") ||
      title.includes("artist") ||
      tags.includes("creative")
    )
      return "creative";
    if (
      title.includes("manager") ||
      title.includes("business") ||
      tags.includes("business")
    )
      return "business";
    return "general";
  };

  // Chat functionality
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: MESSAGE_TYPES.USER,
      content: message,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";

    if (
      lowerMessage.includes("career") &&
      (lowerMessage.includes("suggest") || lowerMessage.includes("recommend"))
    ) {
      response =
        "I'd be happy to suggest some careers! What fields interest you most? Technology, healthcare, business, or creative fields?";
    } else if (
      lowerMessage.includes("technology") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("software")
    ) {
      response =
        "Technology offers exciting opportunities! Here are some tech careers you might find interesting. The field includes software development, data science, cybersecurity, and more.";
      // Filter careers to show technology ones
      const techCareers = careers.filter(
        (career) => getCareerCategory(career) === "technology"
      );
      setFilteredCareers(techCareers);
    } else if (
      lowerMessage.includes("healthcare") ||
      lowerMessage.includes("medical") ||
      lowerMessage.includes("doctor")
    ) {
      response =
        "Healthcare is a rewarding field where you make a real difference. Here are some healthcare career options that might interest you.";
      const healthcareCareers = careers.filter(
        (career) => getCareerCategory(career) === "healthcare"
      );
      setFilteredCareers(healthcareCareers);
    } else if (
      lowerMessage.includes("business") ||
      lowerMessage.includes("management") ||
      lowerMessage.includes("finance")
    ) {
      response =
        "Business offers diverse opportunities across many industries. Here are some business career paths you might consider.";
      const businessCareers = careers.filter(
        (career) => getCareerCategory(career) === "business"
      );
      setFilteredCareers(businessCareers);
    } else if (
      lowerMessage.includes("creative") ||
      lowerMessage.includes("design") ||
      lowerMessage.includes("art")
    ) {
      response =
        "Creative fields let you express yourself professionally. Here are some creative career options that combine artistry with career growth.";
      const creativeCareers = careers.filter(
        (career) => getCareerCategory(career) === "creative"
      );
      setFilteredCareers(creativeCareers);
    } else if (
      lowerMessage.includes("salary") ||
      lowerMessage.includes("pay") ||
      lowerMessage.includes("money")
    ) {
      response =
        "Salary varies by career, location, and experience. I can show you careers with different earning potentials. What field interests you?";
    } else if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("study")
    ) {
      response =
        "Education requirements vary significantly. Some careers require specific degrees, others value skills and experience. What career are you considering?";
    } else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      response =
        "Hello! I'm here to help you explore career opportunities. You can ask me about specific careers, get recommendations, or learn about requirements and salaries.";
    } else if (lowerMessage.includes("help")) {
      response =
        "I can help you with career recommendations, information about specific fields, salary expectations, education requirements, and job market insights. What would you like to explore?";
    } else if (
      lowerMessage.includes("all") ||
      lowerMessage.includes("show all") ||
      lowerMessage.includes("everything")
    ) {
      response =
        "Here are all the careers in our database. You can search or ask me about specific fields to narrow down the options.";
      setFilteredCareers(careers);
    } else {
      response =
        "That's an interesting question! I can help you explore careers, provide recommendations, or answer specific questions about career fields. What would you like to know more about?";
    }

    return {
      id: Date.now() + 1,
      type: MESSAGE_TYPES.BOT,
      content: response,
      timestamp: new Date(),
    };
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(currentMessage);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            className={themeClasses.text.primary}
            sx={{ fontWeight: 600 }}
          >
            Career Explorer
          </Typography>
          <IconButton onClick={toggleTheme} sx={{ borderRadius: "8px" }}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {/* Main Layout */}
        <Grid container spacing={3}>
          {/* Left Side - Career Cards */}
          <Grid item xs={12} md={8}>
            {/* Search Bar */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: "8px" }}>
              <TextField
                fullWidth
                placeholder="Search careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSearchQuery("")}
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </Paper>

            {/* Career Grid */}
            <Grid container spacing={2}>
              {filteredCareers.map((career) => (
                <Grid item xs={12} sm={6} lg={4} key={career.id}>
                  <CareerCard isDarkMode={isDarkMode}>
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getCareerIcon(career)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, fontSize: "1rem" }}
                          >
                            {career.careerTitle}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              textTransform: "uppercase",
                            }}
                          >
                            {getCareerCategory(career)}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ mb: 2, color: "text.secondary", lineHeight: 1.4 }}
                      >
                        {career.summary?.substring(0, 100)}...
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {career.interestTags?.slice(0, 2).map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {career.interestTags?.length > 2 && (
                          <Chip
                            label={`+${career.interestTags.length - 2}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </CareerCard>
                </Grid>
              ))}
            </Grid>

            {filteredCareers.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", borderRadius: "8px" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No careers found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try different search terms or ask the assistant for
                  recommendations.
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Right Side - Chat Assistant */}
          <Grid item xs={12} md={4}>
            <ChatContainer isDarkMode={isDarkMode}>
              {/* Chat Header */}
              <Box
                sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Career Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ask me anything about careers
                </Typography>
              </Box>

              {/* Chat Messages */}
              <Box
                sx={{ flex: 1, p: 2, overflowY: "auto", maxHeight: "400px" }}
              >
                {chatMessages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    isUser={message.type === MESSAGE_TYPES.USER}
                    isDarkMode={isDarkMode}
                  >
                    <Box className="message-bubble">
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </ChatMessage>
                ))}

                {isTyping && (
                  <ChatMessage isUser={false} isDarkMode={isDarkMode}>
                    <Box className="message-bubble">
                      <Typography variant="body2">Typing...</Typography>
                    </Box>
                  </ChatMessage>
                )}
                <div ref={chatEndRef} />
              </Box>

              {/* Chat Input */}
              <Box
                sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Ask about careers..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "20px" },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => sendMessage(currentMessage)}
                    disabled={!currentMessage.trim()}
                    sx={{ borderRadius: "20px", minWidth: "48px" }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
              </Box>
            </ChatContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CareerExplorer;
