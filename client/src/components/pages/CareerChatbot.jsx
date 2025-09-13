import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  Chip,
  Card,
  CardContent,
  Fab,
  Collapse,
  LinearProgress,
  Tooltip,
  Badge,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import {
  Send,
  Chat,
  SmartToy,
  Person,
  History,
  Search,
  Clear,
  Minimize,
  Psychology,
  Work,
  School,
  TrendingUp,
  Close,
  AutoAwesome,
  QuestionAnswer,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { User } from "../../context/UserContext";

// Styled components for beautiful UI
const ChatContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  width: 400,
  height: 600,
  display: "flex",
  flexDirection: "column",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  zIndex: 1300,
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "90%",
    right: "2.5%",
    bottom: 10,
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
}));

const ChatBody = styled(Box)({
  flex: 1,
  backgroundColor: "#f8f9ff",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const MessagesList = styled(List)({
  flex: 1,
  overflow: "auto",
  padding: "16px",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#c1c1c1",
    borderRadius: 3,
  },
});

const UserMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "#667eea",
  color: "white",
  padding: theme.spacing(1.5, 2),
  borderRadius: "20px 20px 4px 20px",
  marginLeft: "auto",
  maxWidth: "80%",
  wordWrap: "break-word",
  boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
}));

const BotMessage = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  color: "#333",
  padding: theme.spacing(1.5, 2),
  borderRadius: "20px 20px 20px 4px",
  marginRight: "auto",
  maxWidth: "80%",
  wordWrap: "break-word",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  border: "1px solid #e0e0e0",
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "white",
  borderTop: "1px solid #e0e0e0",
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "flex-end",
}));

const FloatingChatButton = styled(Fab)(() => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease",
  zIndex: 1300,
}));

const CareerChatbot = () => {
  const { userDetails } = useContext(User);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef(null);

  // Get user data from context or localStorage
  const getCurrentUser = () => {
    if (userDetails) return userDetails;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }

    // Fallback for testing - using the test user from the database
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("name");
    if (userId) {
      return { id: parseInt(userId), name: userName || "User" };
    }

    return null;
  };

  const currentUser = getCurrentUser();

  // Quick action buttons
  const quickActions = [
    {
      icon: <Work />,
      text: "Career Planning",
      prompt:
        "I need help with career planning and finding the right path for me.",
    },
    {
      icon: <QuestionAnswer />,
      text: "Interview Tips",
      prompt: "Can you give me some interview preparation tips?",
    },
    {
      icon: <School />,
      text: "Resume Help",
      prompt:
        "I need help improving my resume and making it more attractive to employers.",
    },
    {
      icon: <TrendingUp />,
      text: "Skill Development",
      prompt: "What skills should I develop to advance in my career?",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && currentUser) {
      if (messages.length === 0) {
        const loadData = async () => {
          await loadChatHistory();
          showWelcomeMessage();
        };
        loadData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showWelcomeMessage = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: "bot",
      content: `Hello ${
        currentUser?.name || "there"
      }! 👋 I'm your CareerVision AI assistant. I'm here to help you with career advice, interview preparation, resume tips, and much more. How can I assist you today?`,
      timestamp: new Date(),
      isWelcome: true,
    };
    setMessages([welcomeMessage]);
  };

  const loadChatHistory = async () => {
    if (!currentUser?.id) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/history/${currentUser.id}?limit=20`
      );
      const data = await response.json();

      if (data.status === "success" && data.messages) {
        const chatMessages = data.messages.flatMap((msg) => [
          {
            id: `${msg.id}-user`,
            type: "user",
            content: msg.userMessage,
            timestamp: new Date(msg.createdAt),
          },
          {
            id: `${msg.id}-bot`,
            type: "bot",
            content: msg.botResponse,
            timestamp: new Date(msg.createdAt),
            messageType: msg.messageType,
          },
        ]);
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || !currentUser?.id) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          message: messageText.trim(),
          conversationId: conversationId,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const botMessage = {
          id: `${data.id}-bot`,
          type: "bot",
          content: data.botResponse,
          timestamp: new Date(data.timestamp),
          messageType: data.messageType,
        };

        setMessages((prev) => [...prev, botMessage]);
        setConversationId(data.conversationId);
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content:
          "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  const getMessageTypeIcon = (messageType) => {
    switch (messageType) {
      case "CAREER_ADVICE":
        return <Work fontSize="small" />;
      case "INTERVIEW_PREP":
        return <QuestionAnswer fontSize="small" />;
      case "RESUME_HELP":
        return <School fontSize="small" />;
      case "SKILL_DEVELOPMENT":
        return <TrendingUp fontSize="small" />;
      default:
        return <Psychology fontSize="small" />;
    }
  };

  if (!isOpen) {
    return (
      <FloatingChatButton onClick={() => setIsOpen(true)} size="large">
        <Badge badgeContent="AI" color="secondary">
          <SmartToy fontSize="large" />
        </Badge>
      </FloatingChatButton>
    );
  }

  return (
    <ChatContainer elevation={24}>
      <ChatHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
            <AutoAwesome />
          </Avatar>
          <Box>
            <Typography variant="h6" color="white" fontWeight="bold">
              CareerVision AI
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">
              Your Career Assistant
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={() => setIsOpen(false)}
            sx={{ color: "white" }}
          >
            <Close />
          </IconButton>
        </Box>
      </ChatHeader>

      <ChatBody>
        {messages.length === 0 ? (
          <Box p={3} textAlign="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "#667eea",
              }}
            >
              <SmartToy fontSize="large" />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Welcome to CareerVision AI! 🚀
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              I'm here to help you with career advice, interview preparation,
              and professional development.
            </Typography>

            <Grid container spacing={1}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={action.icon}
                    onClick={() => handleQuickAction(action.prompt)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "0.75rem",
                      p: 1,
                    }}
                    fullWidth
                  >
                    {action.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <MessagesList>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{ flexDirection: "column", alignItems: "stretch", p: 0.5 }}
              >
                <Box
                  display="flex"
                  alignItems="flex-end"
                  gap={1}
                  justifyContent={
                    message.type === "user" ? "flex-end" : "flex-start"
                  }
                >
                  {message.type === "bot" && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#667eea" }}>
                      <SmartToy fontSize="small" />
                    </Avatar>
                  )}

                  <Box maxWidth="80%">
                    {message.type === "user" ? (
                      <UserMessage>
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                      </UserMessage>
                    ) : (
                      <BotMessage>
                        {message.messageType && (
                          <Chip
                            icon={getMessageTypeIcon(message.messageType)}
                            label={message.messageType.replace("_", " ")}
                            size="small"
                            sx={{ mb: 1, fontSize: "0.7rem", height: 20 }}
                          />
                        )}
                        <Typography
                          variant="body2"
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(message.content),
                          }}
                        />
                      </BotMessage>
                    )}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        textAlign: message.type === "user" ? "right" : "left",
                        mt: 0.5,
                        fontSize: "0.7rem",
                      }}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>

                  {message.type === "user" && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#764ba2" }}>
                      <Person fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              </ListItem>
            ))}

            {isLoading && (
              <ListItem sx={{ justifyContent: "flex-start" }}>
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "#667eea", mr: 1 }}
                >
                  <SmartToy fontSize="small" />
                </Avatar>
                <BotMessage>
                  <Typography variant="body2">
                    <em>Thinking...</em>
                  </Typography>
                  <LinearProgress sx={{ mt: 1, borderRadius: 1 }} />
                </BotMessage>
              </ListItem>
            )}

            <div ref={messagesEndRef} />
          </MessagesList>
        )}

        <InputContainer>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Ask me anything about your career..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={isLoading || !currentUser}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#f8f9ff",
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading || !currentUser}
            sx={{
              bgcolor: "#667eea",
              color: "white",
              "&:hover": { bgcolor: "#5a6fd8" },
              "&:disabled": { bgcolor: "#ccc" },
            }}
          >
            <Send />
          </IconButton>
        </InputContainer>
      </ChatBody>
    </ChatContainer>
  );
};

export default CareerChatbot;
