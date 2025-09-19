import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Tab,
  Tabs,
  Fab,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Event as EventIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Dashboard as DashboardIcon,
  ViewList as ViewListIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import axios from '../../api/axiosConfig'; // Import the configured axios instance

// Styled components
const StyledCard = styled(Card)(({ theme, status }) => ({
  transition: "all 0.3s ease",
  cursor: "pointer",
  border:
    status === "today"
      ? "2px solid #ff5722"
      : status === "upcoming"
      ? "2px solid #2196f3"
      : "1px solid #e0e0e0",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
  position: "relative",
  overflow: "visible",
}));

const StatusChip = styled(Chip)(({ status }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  backgroundColor:
    status === "today"
      ? "#ff5722"
      : status === "upcoming"
      ? "#2196f3"
      : "#757575",
  color: "white",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "0.75rem",
}));

const HeroSection = styled(Box)({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
  borderRadius: "0 0 20px 20px",
});

const DynamicEvents = () => {
  const { user } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setMounted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [backendConnected, setBackendConnected] = useState(false);

  // Form state for creating events
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    organizerEmail: user?.email || "",
    eventDate: "",
    location: "",
    eventType: "WORKSHOP", // Default event type
  });

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/events");
      
      console.log("Raw events response:", response);
      console.log("Response data type:", typeof response.data);
      console.log("Response data:", response.data);

      // Ensure we have an array
      let eventsData = [];
      if (Array.isArray(response.data)) {
        eventsData = response.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        eventsData = response.data.content;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        eventsData = response.data.data;
      } else {
        console.warn("Unexpected events response format:", response.data);
        eventsData = [];
      }

      // Validate each event has required properties
      eventsData = eventsData.filter(event => 
        event && 
        event.id && 
        event.title && 
        event.eventDate
      );

      // Ensure participants is an array
      eventsData = eventsData.map(event => ({
        ...event,
        participants: Array.isArray(event.participants) ? event.participants : []
      }));

      setEvents(eventsData);
      setBackendConnected(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      
      // Log detailed error information
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      setBackendConnected(false);
      setLoading(false);
      showSnackbar("Unable to fetch events. Please check your connection.", "error");
      
      // Fallback to sample events
      const sampleEvents = [
        {
          id: 1,
          title: "Career Workshop: Resume Building",
          description: "Learn how to create a compelling resume that stands out to employers.",
          eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Online via Zoom",
          organizerEmail: "workshop@careervision.com",
          eventType: "WORKSHOP",
          participants: []
        },
        {
          id: 2,
          title: "Tech Interview Preparation",
          description: "Intensive preparation for technical interviews.",
          eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Online Conference",
          organizerEmail: "interviews@careervision.com",
          eventType: "CONFERENCE",
          participants: []
        }
      ];
      setEvents(sampleEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Create a new event
  const handleCreateEvent = async () => {
    try {
      // Validate required fields
      if (!newEvent.title || !newEvent.description || !newEvent.eventDate) {
        showSnackbar("Please fill in all required fields", "error");
        return;
      }

      const eventData = {
        ...newEvent,
        eventDate: new Date(newEvent.eventDate).toISOString(),
        organizerEmail: user?.email || newEvent.organizerEmail,
      };

      const response = await axios.post("/events", eventData);
      
      console.log("Event creation response:", response);

      // Ensure the response contains the created event
      const createdEvent = response.data;
      
      // Update events list
      setEvents(prev => [...prev, createdEvent]);
      
      // Close dialog and show success message
      setOpenCreateDialog(false);
      showSnackbar("Event created successfully!", "success");
    } catch (error) {
      console.error("Error creating event:", error);
      
      // Log detailed error information
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      showSnackbar("Failed to create event. Please try again.", "error");
    }
  };

  // Register for an event
  const handleRegisterForEvent = async (eventId) => {
    try {
      if (!user?.id) {
        showSnackbar("Please log in to register for events", "error");
        return;
      }

      await axios.post(`/api/events/${eventId}/register/${user.id}`);
      
      // Refresh events to get updated participant list
      fetchEvents();
      
      showSnackbar("Successfully registered for the event!", "success");
    } catch (error) {
      console.error("Error registering for event:", error);
      showSnackbar(
        "Error registering for event. You may already be registered.",
        "error"
      );
    }
  };

  // Get event participants
  const handleEventDetails = async (event) => {
    try {
      const response = await axios.get(`/api/events/${event.id}/participants`);
      setParticipants(response.data);
      setSelectedEvent(event);
      setOpenDetailsDialog(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
      showSnackbar("Failed to load event details", "error");
    }
  };

  // Utility functions
  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    
    if (eventDateTime.toDateString() === now.toDateString()) {
      return "today";
    } else if (eventDateTime > now) {
      return "upcoming";
    } else {
      return "past";
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getEventTypeIcon = (eventType) => {
    const typeMap = {
      WORKSHOP: <SchoolIcon />,
      CONFERENCE: <BusinessIcon />,
      NETWORKING_EVENT: <PeopleIcon />,
      CAREER_TALK: <PersonIcon />,
      WEBINAR: <EventIcon />
    };
    return typeMap[eventType] || <EventIcon />;
  };

  const isUserRegistered = (event) => {
    return event.participants?.some(
      (participant) => participant.user.id === user?.id
    );
  };

  // Safely calculate total participants
  const calculateTotalParticipants = () => {
    // Ensure events is an array before calling reduce
    if (!Array.isArray(events)) {
      console.warn("events is not an array:", events);
      return 0;
    }

    return events.reduce((sum, event) => {
      // Ensure participants is an array
      const participantsCount = Array.isArray(event.participants) 
        ? event.participants.length 
        : 0;
      return sum + participantsCount;
    }, 0);
  };

  // Update getFilteredEvents method to be more robust
  const getFilteredEvents = () => {
    // Ensure events is an array
    if (!Array.isArray(events)) {
      console.warn("events is not an array:", events);
      return [];
    }

    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (tabValue) {
      case 1: // Upcoming
        return filtered.filter(
          (event) => getEventStatus(event.eventDate) === "upcoming"
        );
      case 2: // Today
        return filtered.filter(
          (event) => getEventStatus(event.eventDate) === "today"
        );
      case 3: // Past
        return filtered.filter(
          (event) => getEventStatus(event.eventDate) === "past"
        );
      default:
        return filtered;
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading events...
        </Typography>
      </Box>
    );
  }

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Backend Connection Status */}
      {!backendConnected && (
        <Alert
          severity="warning"
          sx={{ mb: 2, mx: 2 }}
          action={
            <IconButton
              aria-label="refresh"
              color="inherit"
              size="small"
              onClick={fetchEvents}
            >
              <RefreshIcon />
            </IconButton>
          }
        >
          Backend not connected. Using local data. Click refresh to retry
          connection.
        </Alert>
      )}

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Career Events & Networking
            </Typography>
            <Typography variant="h5" component="p" sx={{ opacity: 0.9, mb: 3 }}>
              {backendConnected
                ? "Create, discover and join career-boosting events"
                : "Demo mode - showing sample events"}
            </Typography>
            <Box display="flex" justifyContent="center" gap={3}>
              <Box textAlign="center">
                <Typography variant="h3" fontWeight="bold">
                  {events.length}
                </Typography>
                <Typography variant="body2">Total Events</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h3" fontWeight="bold">
                  {
                    events.filter(
                      (e) => getEventStatus(e.eventDate) === "upcoming"
                    ).length
                  }
                </Typography>
                <Typography variant="body2">Upcoming</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h3" fontWeight="bold">
                  {calculateTotalParticipants()}
                </Typography>
                <Typography variant="body2">Total Participants</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Search and Filter Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Search events by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Tooltip title="Refresh Events">
              <IconButton color="primary" onClick={fetchEvents}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label={`All Events (${events.length})`} />
            <Tab
              label={`Upcoming (${
                events.filter((e) => getEventStatus(e.eventDate) === "upcoming")
                  .length
              })`}
            />
            <Tab
              label={`Today (${
                events.filter((e) => getEventStatus(e.eventDate) === "today")
                  .length
              })`}
            />
            <Tab
              label={`Past (${
                events.filter((e) => getEventStatus(e.eventDate) === "past")
                  .length
              })`}
            />
          </Tabs>
        </Paper>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {getFilteredEvents().map((event) => {
            const { date, time } = formatEventDate(event.eventDate);
            const status = getEventStatus(event.eventDate);
            const isRegistered = isUserRegistered(event);

            return (
              <Grid item xs={12} md={6} lg={4} key={event.id}>
                <StyledCard
                  status={status}
                  onClick={() => handleEventDetails(event)}
                >
                  <StatusChip
                    label={status === "today" ? "TODAY" : status.toUpperCase()}
                    status={status}
                    size="small"
                  />

                  <CardContent sx={{ pt: 5 }}>
                    {/* Event Icon and Title */}
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {getEventTypeIcon(event.eventType)}
                      </Avatar>
                      <Typography variant="h6" component="h3" fontWeight="bold">
                        {event.title}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {event.description}
                    </Typography>

                    {/* Event Details */}
                    <Box display="flex" flexDirection="column" gap={1} mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2">{date}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2">{time}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {event.location}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <EmailIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {event.organizerEmail}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Participants */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {event.participants?.length || 0} registered
                        </Typography>
                      </Box>
                      {isRegistered && (
                        <Chip
                          label="Registered"
                          color="success"
                          size="small"
                          icon={<PersonIcon />}
                        />
                      )}
                    </Box>

                    {/* Register Button */}
                    <Button
                      fullWidth
                      variant={isRegistered ? "outlined" : "contained"}
                      color="primary"
                      disabled={status === "past" || isRegistered}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isRegistered) {
                          handleRegisterForEvent(event.id);
                        }
                      }}
                      sx={{ mt: "auto" }}
                    >
                      {isRegistered
                        ? "Already Registered"
                        : status === "past"
                        ? "Event Ended"
                        : "Register Now"}
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>

        {getFilteredEvents().length === 0 && (
          <Box textAlign="center" py={8}>
            <EventIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Be the first to create an event!"}
            </Typography>
          </Box>
        )}

        {/* Floating Action Button for Creating Events */}
        <Fab
          color="primary"
          aria-label="add event"
          sx={{ position: "fixed", bottom: 32, right: 32 }}
          onClick={() => setOpenCreateDialog(true)}
        >
          <AddIcon />
        </Fab>

        {/* Create Event Dialog */}
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={2}>
              <EventIcon color="primary" />
              Create New Event
              {!backendConnected && (
                <Chip label="Local Mode" size="small" color="warning" />
              )}
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={3} pt={1}>
              <TextField
                select
                label="Event Type"
                fullWidth
                value={newEvent.eventType}
                onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                SelectProps={{ native: true }}
              >
                {["WORKSHOP", "CONFERENCE", "NETWORKING_EVENT", "CAREER_TALK", "WEBINAR"].map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, " ")}
                  </option>
                ))}
              </TextField>
              <TextField
                label="Event Title *"
                fullWidth
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="e.g., Career Workshop: Resume Building"
              />

              <TextField
                label="Description *"
                fullWidth
                multiline
                rows={3}
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Describe what participants will learn or experience..."
              />

              <TextField
                label="Organizer Email *"
                fullWidth
                type="email"
                value={newEvent.organizerEmail}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, organizerEmail: e.target.value })
                }
                placeholder="contact@example.com"
              />

              <TextField
                label="Event Date & Time *"
                fullWidth
                type="datetime-local"
                value={newEvent.eventDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, eventDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Location *"
                fullWidth
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="e.g., Online via Zoom, Conference Room A, etc."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreateEvent}
              startIcon={<AddIcon />}
            >
              Create Event
            </Button>
          </DialogActions>
        </Dialog>

        {/* Event Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={2}>
              {selectedEvent && getEventTypeIcon(selectedEvent.eventType)}
              {selectedEvent?.title}
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Box display="flex" flexDirection="column" gap={3} pt={1}>
                <Typography variant="body1">
                  {selectedEvent.description}
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <CalendarIcon color="primary" />
                    <Typography variant="body1">
                      {formatEventDate(selectedEvent.eventDate).date}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="body1">
                      {formatEventDate(selectedEvent.eventDate).time}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <LocationOnIcon color="primary" />
                    <Typography variant="body1">
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <EmailIcon color="primary" />
                    <Typography variant="body1">
                      {selectedEvent.organizerEmail}
                    </Typography>
                  </Box>
                </Box>

                {/* Participants Section */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Registered Participants ({participants.length})
                  </Typography>
                  {participants.length > 0 ? (
                    <Grid container spacing={2}>
                      {participants.map((participant, index) => (
                        <Grid item xs={12} sm={6} key={participant.user.id || index}>
                          <Box display="flex" alignItems="center" gap={2} p={1}>
                            <Avatar sx={{ bgcolor: "secondary.main" }}>
                              {participant.user.name?.[0]?.toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {participant.user.name || "User"}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {participant.user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No participants registered yet.
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
            {selectedEvent &&
              !isUserRegistered(selectedEvent) &&
              getEventStatus(selectedEvent.eventDate) !== "past" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleRegisterForEvent(selectedEvent.id);
                    setOpenDetailsDialog(false);
                  }}
                  startIcon={<PersonIcon />}
                >
                  Register for Event
                </Button>
              )}
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default DynamicEvents;
