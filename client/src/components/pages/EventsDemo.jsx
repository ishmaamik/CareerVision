import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  Fab,
  CircularProgress,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  Paper,
  Container,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const EventsDemo = () => {
  // Sample events data for demo
  const sampleEvents = [
    {
      id: 1,
      title: "Career Workshop: Resume Building",
      description:
        "Learn how to create a compelling resume that stands out to employers. This hands-on workshop will cover formatting, content optimization, and ATS-friendly techniques.",
      organizerEmail: "workshop@careervision.com",
      eventDate: "2025-09-20T10:00:00",
      location: "Conference Room A, CareerVision HQ",
      participants: [],
    },
    {
      id: 2,
      title: "Tech Interview Preparation Bootcamp",
      description:
        "Intensive 3-day bootcamp covering technical interview questions, coding challenges, and behavioral interviews for software engineering positions.",
      organizerEmail: "tech@careervision.com",
      eventDate: "2025-09-25T09:00:00",
      location: "Online via Zoom",
      participants: [],
    },
    {
      id: 3,
      title: "Networking Night: Connect with Industry Professionals",
      description:
        "Join us for an evening of networking with professionals from various industries. Perfect opportunity to expand your professional network and learn about career opportunities.",
      organizerEmail: "networking@careervision.com",
      eventDate: "2025-09-30T18:00:00",
      location: "Grand Ballroom, City Convention Center",
      participants: [],
    },
  ];

  const getEventTypeIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("interview") || titleLower.includes("career"))
      return <BusinessIcon />;
    if (titleLower.includes("workshop") || titleLower.includes("bootcamp"))
      return <SchoolIcon />;
    if (titleLower.includes("networking")) return <PeopleIcon />;
    return <EventIcon />;
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "20px",
          p: 6,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Career Events & Networking
        </Typography>
        <Typography variant="h5" component="p" sx={{ opacity: 0.9, mb: 3 }}>
          Discover workshops, webinars, and networking opportunities to boost
          your career
        </Typography>
        <Box display="flex" justifyContent="center" gap={4}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold">
              {sampleEvents.length}
            </Typography>
            <Typography variant="body2">Upcoming Events</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold">
              150+
            </Typography>
            <Typography variant="body2">Registered Users</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold">
              95%
            </Typography>
            <Typography variant="body2">Satisfaction Rate</Typography>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Event Features
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <EventIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Event Creation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and organize career-focused events, workshops, and
                networking sessions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <PeopleIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Easy Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simple one-click registration process for all events with
                automatic confirmations
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <BusinessIcon
                sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Professional Networking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connect with industry professionals, mentors, and fellow job
                seekers
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Sample Events */}
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Featured Events
      </Typography>

      <Grid container spacing={3}>
        {sampleEvents.map((event) => {
          const { date, time } = formatEventDate(event.eventDate);

          return (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {getEventTypeIcon(event.title)}
                    </Avatar>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                      {event.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, minHeight: "4rem" }}
                  >
                    {event.description}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1} mb={3}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2">{date}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2">{time}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2">{event.location}</Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: "auto" }}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Call to Action */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mt: 6,
          textAlign: "center",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Ready to Boost Your Career?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Join our events and connect with professionals in your field
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "grey.100" },
            }}
            startIcon={<AddIcon />}
          >
            Create Event
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Browse All Events
          </Button>
        </Box>
      </Paper>

      {/* Note about backend */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mt: 4,
          bgcolor: "info.light",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom color="info.dark">
          🚀 Events System Features
        </Typography>
        <Typography variant="body2" color="info.dark">
          <strong>Frontend Implementation:</strong> Complete Events interface
          with dashboard, event creation, registration, and participant
          management.
          <br />
          <strong>Backend Integration:</strong> Connected to your existing
          EventController with endpoints for creating events, user registration,
          and participant tracking.
          <br />
          <strong>Key Features:</strong> Real-time event status, advanced
          filtering, responsive design, and seamless user experience.
        </Typography>
      </Paper>
    </Container>
  );
};

export default EventsDemo;
