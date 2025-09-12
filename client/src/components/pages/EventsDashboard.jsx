import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  Event,
  People,
  CalendarToday,
  AccessTime,
  LocationOn,
  Business,
  School,
  Group,
} from "@mui/icons-material";
import {
  getAllEvents,
  getEventStatus,
  formatEventDate,
} from "../../api/events/events";

const EventsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    today: 0,
    past: 0,
    totalParticipants: 0,
    avgParticipants: 0,
  });

  useEffect(() => {
    fetchEventsAndStats();
  }, []);

  const fetchEventsAndStats = async () => {
    try {
      const eventsData = await getAllEvents();
      setEvents(eventsData);

      const upcoming = eventsData.filter(
        (e) => getEventStatus(e.eventDate) === "upcoming"
      );
      const today = eventsData.filter(
        (e) => getEventStatus(e.eventDate) === "today"
      );
      const past = eventsData.filter(
        (e) => getEventStatus(e.eventDate) === "past"
      );
      const totalParticipants = eventsData.reduce(
        (sum, e) => sum + (e.participants?.length || 0),
        0
      );

      setStats({
        total: eventsData.length,
        upcoming: upcoming.length,
        today: today.length,
        past: past.length,
        totalParticipants,
        avgParticipants:
          eventsData.length > 0
            ? Math.round(totalParticipants / eventsData.length)
            : 0,
      });
    } catch (error) {
      console.error("Error fetching events stats:", error);
    }
  };

  const getEventTypeStats = () => {
    const types = {
      career: events.filter(
        (e) =>
          e.title.toLowerCase().includes("career") ||
          e.title.toLowerCase().includes("interview")
      ).length,
      workshop: events.filter(
        (e) =>
          e.title.toLowerCase().includes("workshop") ||
          e.title.toLowerCase().includes("training")
      ).length,
      networking: events.filter(
        (e) =>
          e.title.toLowerCase().includes("networking") ||
          e.title.toLowerCase().includes("meetup")
      ).length,
      webinar: events.filter(
        (e) =>
          e.title.toLowerCase().includes("webinar") ||
          e.title.toLowerCase().includes("seminar")
      ).length,
    };
    return types;
  };

  const getUpcomingEvents = () => {
    return events
      .filter((e) => getEventStatus(e.eventDate) === "upcoming")
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
      .slice(0, 5);
  };

  const getPopularEvents = () => {
    return events
      .sort(
        (a, b) => (b.participants?.length || 0) - (a.participants?.length || 0)
      )
      .slice(0, 5);
  };

  const typeStats = getEventTypeStats();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Events Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Event sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Events
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {stats.upcoming}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Upcoming Events
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {stats.totalParticipants}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Participants
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Group sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {stats.avgParticipants}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Avg. Participants
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Event Types Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Event Types Distribution
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Object.entries(typeStats).map(([type, count]) => {
                const percentage =
                  stats.total > 0 ? (count / stats.total) * 100 : 0;
                const getIcon = () => {
                  switch (type) {
                    case "career":
                      return <Business fontSize="small" />;
                    case "workshop":
                      return <School fontSize="small" />;
                    case "networking":
                      return <People fontSize="small" />;
                    case "webinar":
                      return <Event fontSize="small" />;
                    default:
                      return <Event fontSize="small" />;
                  }
                };
                const getColor = () => {
                  switch (type) {
                    case "career":
                      return "#2196f3";
                    case "workshop":
                      return "#4caf50";
                    case "networking":
                      return "#ff9800";
                    case "webinar":
                      return "#9c27b0";
                    default:
                      return "#757575";
                  }
                };

                return (
                  <Box key={type} sx={{ mb: 2 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {getIcon()}
                        <Typography
                          variant="body2"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {type}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {count} ({percentage.toFixed(1)}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getColor(),
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Upcoming Events
            </Typography>
            <List>
              {getUpcomingEvents().map((event, index) => {
                const { date, time } = formatEventDate(event.eventDate);
                return (
                  <React.Fragment key={event.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <Event />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.title}
                        secondary={
                          <Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              mt={0.5}
                            >
                              <CalendarToday fontSize="small" />
                              <Typography variant="caption">{date}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <AccessTime fontSize="small" />
                              <Typography variant="caption">{time}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <LocationOn fontSize="small" />
                              <Typography variant="caption">
                                {event.location}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Chip
                        label={`${event.participants?.length || 0} registered`}
                        size="small"
                        variant="outlined"
                      />
                    </ListItem>
                    {index < getUpcomingEvents().length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
              {getUpcomingEvents().length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No upcoming events"
                    secondary="Create your first event to get started!"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Popular Events */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Most Popular Events
            </Typography>
            <Grid container spacing={2}>
              {getPopularEvents().map((event) => {
                const status = getEventStatus(event.eventDate);
                const { date } = formatEventDate(event.eventDate);

                return (
                  <Grid item xs={12} md={6} lg={4} key={event.id}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="start"
                          mb={2}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ flex: 1 }}
                          >
                            {event.title}
                          </Typography>
                          <Chip
                            label={status}
                            size="small"
                            color={
                              status === "upcoming"
                                ? "primary"
                                : status === "today"
                                ? "error"
                                : "default"
                            }
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {event.description.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                        </Typography>

                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <CalendarToday fontSize="small" color="action" />
                          <Typography variant="caption">{date}</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="caption">
                            {event.location}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <People fontSize="small" color="primary" />
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="primary"
                          >
                            {event.participants?.length || 0} participants
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {getPopularEvents().length === 0 && (
              <Box textAlign="center" py={4}>
                <Event sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  No events created yet. Be the first to organize an event!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventsDashboard;
