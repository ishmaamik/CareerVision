import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
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
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Videocam as WebinarIcon,
  Add as AddIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import axios from '../../api/axiosConfig'; // Import the configured axios instance

const WebinarCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  cursor: "pointer",
  borderRadius: "16px",
  boxShadow: theme.shadows[4],
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[12],
  },
  position: "relative",
  overflow: "visible",
}));

const WebinarHeroSection = styled(Box)({
  background: "linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
  borderRadius: "0 0 20px 20px",
  textAlign: "center",
});

const Webinars = () => {
  const { user } = useSelector((state) => state.user);
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newWebinar, setNewWebinar] = useState({
    title: "",
    description: "",
    organizerEmail: user?.email || "",
    eventDate: "",
    location: "Online Zoom Meeting",
    eventType: "WEBINAR",
  });

  const fetchWebinars = async () => {
    try {
      const response = await axios.get("/events/type/WEBINAR");
      
      console.log("Raw webinars response:", response);
      console.log("Response data type:", typeof response.data);
      console.log("Response data:", response.data);

      // Ensure we have an array
      let webinarsData = [];
      if (Array.isArray(response.data)) {
        webinarsData = response.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        webinarsData = response.data.content;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        webinarsData = response.data.data;
      } else {
        console.warn("Unexpected webinars response format:", response.data);
        webinarsData = [];
      }

      // Validate each webinar has required properties
      webinarsData = webinarsData.filter(webinar => 
        webinar && 
        webinar.id && 
        webinar.title && 
        webinar.eventDate
      );

      // Ensure participants is an array
      webinarsData = webinarsData.map(webinar => ({
        ...webinar,
        participants: Array.isArray(webinar.participants) ? webinar.participants : []
      }));

      setWebinars(webinarsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch webinars:", error);
      
      // Log detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }

      setLoading(false);
      showSnackbar("Unable to fetch webinars. Please check your connection.", "error");
      
      // Fallback to sample webinars
      const sampleWebinars = [
        {
          id: 1,
          title: "Career Development Webinar",
          description: "Learn strategies for professional growth",
          eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Online via Zoom",
          eventType: "WEBINAR",
          participants: []
        }
      ];
      setWebinars(sampleWebinars);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleCreateWebinar = async () => {
    try {
      // Validate required fields
      if (!newWebinar.title || !newWebinar.description || !newWebinar.eventDate) {
        showSnackbar("Please fill in all required fields", "error");
        return;
      }

      const webinarData = {
        ...newWebinar,
        eventDate: new Date(newWebinar.eventDate).toISOString(),
        organizerEmail: user?.email || newWebinar.organizerEmail,
      };

      const response = await axios.post("/events", webinarData);
      
      console.log("Webinar creation response:", response);

      // Ensure the response contains the created event
      const createdWebinar = response.data;
      
      // Update webinars list
      setWebinars(prev => [...prev, createdWebinar]);
      
      // Close dialog and show success message
      setOpenCreateDialog(false);
      showSnackbar("Webinar created successfully!", "success");
    } catch (error) {
      console.error("Error creating webinar:", error);
      
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

      showSnackbar("Failed to create webinar. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const getFilteredWebinars = () => {
    return webinars.filter(
      (webinar) =>
        webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webinar.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Safely calculate total participants
  const calculateTotalParticipants = () => {
    // Ensure webinars is an array before calling reduce
    if (!Array.isArray(webinars)) {
      console.warn("webinars is not an array:", webinars);
      return 0;
    }

    return webinars.reduce((sum, webinar) => {
      // Ensure participants is an array
      const participantsCount = Array.isArray(webinar.participants) 
        ? webinar.participants.length 
        : 0;
      return sum + participantsCount;
    }, 0);
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
          Loading Webinars...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <WebinarHeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Expert-Led Webinars
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            Learn from Industry Professionals
          </Typography>
          <Box display="flex" justifyContent="center" gap={3}>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {webinars.length}
              </Typography>
              <Typography variant="body2">Total Webinars</Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {calculateTotalParticipants()}
              </Typography>
              <Typography variant="body2">Total Participants</Typography>
            </Box>
          </Box>
        </Container>
      </WebinarHeroSection>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Search webinars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Tooltip title="Refresh Webinars">
              <IconButton color="primary" onClick={fetchWebinars}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create Webinar
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {getFilteredWebinars().map((webinar) => (
            <Grid item xs={12} md={6} lg={4} key={webinar.id}>
              <WebinarCard status="upcoming">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <WebinarIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {webinar.title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, minHeight: "60px" }}
                  >
                    {webinar.description}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(webinar.eventDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(webinar.eventDate).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {webinar.location}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {webinar.participants?.length || 0} Registered
                      </Typography>
                    </Box>
                  </Box>

                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </WebinarCard>
            </Grid>
          ))}
        </Grid>

        {getFilteredWebinars().length === 0 && (
          <Box textAlign="center" py={8}>
            <WebinarIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No Webinars Found
            </Typography>
          </Box>
        )}
      </Container>

      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Webinar</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} pt={1}>
            <TextField
              label="Webinar Title"
              fullWidth
              value={newWebinar.title}
              onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newWebinar.description}
              onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
            />
            <TextField
              label="Organizer Email"
              fullWidth
              value={newWebinar.organizerEmail}
              onChange={(e) => setNewWebinar({ ...newWebinar, organizerEmail: e.target.value })}
            />
            <TextField
              label="Date and Time"
              type="datetime-local"
              fullWidth
              value={newWebinar.eventDate}
              onChange={(e) => setNewWebinar({ ...newWebinar, eventDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateWebinar}
          >
            Create Webinar
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default Webinars;
