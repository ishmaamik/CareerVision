import React, { useState, useEffect } from "react";
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

import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  getAllEvents,
  createEvent,
  registerForEvent,
  getEventParticipants,
  formatEventDate,
  getEventStatus,
} from "../../api/events/events";
import EventsDashboard from "./EventsDashboard";

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

const Events = () => {
  const { user } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [mainTabValue, setMainTabValue] = useState(0); // Main tabs: Dashboard vs Events List
  const [filterTabValue, setFilterTabValue] = useState(0); // Filter tabs within Events List
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setMounted] = useState(false);

  // Form state for creating events
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    organizerEmail: user?.email || "",
    eventDate: "",
    location: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    fetchEvents();
    return () => clearTimeout(timer);
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      if (
        !newEvent.title ||
        !newEvent.description ||
        !newEvent.eventDate ||
        !newEvent.location
      ) {
        alert("Please fill in all required fields");
        return;
      }

      await createEvent({
        ...newEvent,
        organizerEmail: user?.email || newEvent.organizerEmail,
      });

      setOpenCreateDialog(false);
      setNewEvent({
        title: "",
        description: "",
        organizerEmail: user?.email || "",
        eventDate: "",
        location: "",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event. Please try again.");
    }
  };

  const handleRegisterForEvent = async (eventId) => {
    try {
      if (!user?.id) {
        alert("Please log in to register for events");
        return;
      }

      await registerForEvent(user.id, eventId);
      alert("Successfully registered for the event!");
      fetchEvents(); // Refresh to show updated participant count
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Error registering for event. You may already be registered.");
    }
  };

  const handleEventDetails = async (event) => {
    try {
      setSelectedEvent(event);
      const participantsList = await getEventParticipants(event.id);
      setParticipants(participantsList);
      setOpenDetailsDialog(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const getFilteredEvents = () => {
    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (filterTabValue) {
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

  const getEventTypeIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("interview") || titleLower.includes("career"))
      return <Business />;
    if (titleLower.includes("workshop") || titleLower.includes("training"))
      return <School />;
    if (titleLower.includes("networking")) return <People />;
    return <EventIcon />;
  };

  const isUserRegistered = (event) => {
    return event.participants?.some(
      (participant) => participant.id === user?.id
    );
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
      </Box>
    );
  }

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
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
              Discover workshops, webinars, and networking opportunities to
              boost your career
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
                  {events.reduce(
                    (sum, e) => sum + (e.participants?.length || 0),
                    0
                  )}
                </Typography>
                <Typography variant="body2">Total Attendees</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Main Navigation Tabs */}
        <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={mainTabValue}
            onChange={(e, newValue) => setMainTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
            centered
          >
            <Tab label="Dashboard" icon={<Dashboard />} iconPosition="start" />
            <Tab label="Events List" icon={<ViewList />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Dashboard Tab */}
        {mainTabValue === 0 && <EventsDashboard />}

        {/* Events List Tab */}
        {mainTabValue === 1 && (
          <>
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
                      <Search sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
                <Tooltip title="Advanced Filters">
                  <IconButton color="primary">
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </Box>

              <Tabs
                value={filterTabValue}
                onChange={(e, newValue) => setFilterTabValue(newValue)}
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label={`All Events (${events.length})`} />
                <Tab
                  label={`Upcoming (${
                    events.filter(
                      (e) => getEventStatus(e.eventDate) === "upcoming"
                    ).length
                  })`}
                />
                <Tab
                  label={`Today (${
                    events.filter(
                      (e) => getEventStatus(e.eventDate) === "today"
                    ).length
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
                        label={
                          status === "today" ? "TODAY" : status.toUpperCase()
                        }
                        status={status}
                        size="small"
                      />

                      <CardContent sx={{ pt: 5 }}>
                        {/* Event Icon and Title */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {getEventTypeIcon(event.title)}
                          </Avatar>
                          <Typography
                            variant="h6"
                            component="h3"
                            fontWeight="bold"
                          >
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
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap={1}
                          mb={2}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <Calendar fontSize="small" color="action" />
                            <Typography variant="body2">{date}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AccessTime fontSize="small" color="action" />
                            <Typography variant="body2">{time}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2">
                              {event.location}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Email fontSize="small" color="action" />
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
                            <People fontSize="small" color="action" />
                            <Typography variant="body2">
                              {event.participants?.length || 0} registered
                            </Typography>
                          </Box>
                          {isRegistered && (
                            <Chip
                              label="Registered"
                              color="success"
                              size="small"
                              icon={<Person />}
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
                <EventIcon
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
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
          </>
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
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={3} pt={1}>
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

              <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                <Button onClick={() => setOpenCreateDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreateEvent}
                  startIcon={<AddIcon />}
                >
                  Create Event
                </Button>
              </Box>
            </Box>
          </DialogContent>
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
              {selectedEvent && getEventTypeIcon(selectedEvent.title)}
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
                    <Calendar color="primary" />
                    <Typography variant="body1">
                      {formatEventDate(selectedEvent.eventDate).date}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <AccessTime color="primary" />
                    <Typography variant="body1">
                      {formatEventDate(selectedEvent.eventDate).time}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <LocationOn color="primary" />
                    <Typography variant="body1">
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Email color="primary" />
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
                      {participants.map((participant) => (
                        <Grid item xs={12} sm={6} key={participant.id}>
                          <Box display="flex" alignItems="center" gap={2} p={1}>
                            <Avatar sx={{ bgcolor: "secondary.main" }}>
                              {participant.name?.[0]?.toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {participant.name || "User"}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {participant.email}
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

                <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                  <Button onClick={() => setOpenDetailsDialog(false)}>
                    Close
                  </Button>
                  {!isUserRegistered(selectedEvent) &&
                    getEventStatus(selectedEvent.eventDate) !== "past" && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleRegisterForEvent(selectedEvent.id);
                          setOpenDetailsDialog(false);
                        }}
                        startIcon={<Person />}
                      >
                        Register for Event
                      </Button>
                    )}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default Events;
