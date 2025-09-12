import axios from "axios";

const BASE_URL = "http://localhost:8080/api/events";

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Get all events
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Register user for an event
export const registerForEvent = async (userId, eventId) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, null, {
      params: {
        userId: userId,
        eventId: eventId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
};

// Get participants of an event
export const getEventParticipants = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${eventId}/participants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event participants:", error);
    throw error;
  }
};

// Helper function to format event date
export const formatEventDate = (dateString) => {
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

// Helper function to check if event is upcoming
export const isUpcoming = (dateString) => {
  return new Date(dateString) > new Date();
};

// Helper function to get event status
export const getEventStatus = (dateString) => {
  const eventDate = new Date(dateString);
  const now = new Date();

  if (eventDate > now) {
    return "upcoming";
  } else if (eventDate.toDateString() === now.toDateString()) {
    return "today";
  } else {
    return "past";
  }
};
