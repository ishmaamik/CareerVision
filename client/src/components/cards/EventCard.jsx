import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import {
  Calendar,
  AccessTime,
  LocationOn,
  Email,
  People,
  Person,
  Event as EventIcon,
  Business,
  School,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { formatEventDate, getEventStatus } from "../../api/events/events";

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

const EventCard = ({ event, onEventClick, onRegister, isUserRegistered }) => {
  const { date, time } = formatEventDate(event.eventDate);
  const status = getEventStatus(event.eventDate);
  const isRegistered = isUserRegistered(event);

  const getEventTypeIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("interview") || titleLower.includes("career"))
      return <Business />;
    if (titleLower.includes("workshop") || titleLower.includes("training"))
      return <School />;
    if (titleLower.includes("networking")) return <People />;
    return <EventIcon />;
  };

  return (
    <StyledCard status={status} onClick={() => onEventClick(event)}>
      <StatusChip
        label={status === "today" ? "TODAY" : status.toUpperCase()}
        status={status}
        size="small"
      />

      <CardContent sx={{ pt: 5 }}>
        {/* Event Icon and Title */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {getEventTypeIcon(event.title)}
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
            <Calendar fontSize="small" color="action" />
            <Typography variant="body2">{date}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2">{time}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{event.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">{event.organizerEmail}</Typography>
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
              onRegister(event.id);
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
  );
};

export default EventCard;
