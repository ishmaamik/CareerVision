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
  Business as ConferenceIcon,
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

const ConferenceCard = styled(Card)(({ theme }) => ({
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

const ConferenceHeroSection = styled(Box)({
  background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
  borderRadius: "0 0 20px 20px",
  textAlign: "center",
});

const Conferences = () => {
  const { user } = useSelector((state) => state.user);
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newConference, setNewConference] = useState({
    title: "",
    description: "",
    organizerEmail: user?.email || "",
    eventDate: "",
    location: "",
    eventType: "CONFERENCE",
  });

  const fetchConferences = async () => {
    try {
      const response = await axios.get("/events/type/CONFERENCE");
      
      console.log("Raw conferences response:", response);
      console.log("Response data type:", typeof response.data);
      console.log("Response data:", response.data);

      // Ensure we have an array
      let conferencesData = [];
      if (Array.isArray(response.data)) {
        conferencesData = response.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        conferencesData = response.data.content;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        conferencesData = response.data.data;
      } else {
        console.warn("Unexpected conferences response format:", response.data);
        conferencesData = [];
      }

      // Validate each conference has required properties
      conferencesData = conferencesData.filter(conference => 
        conference && 
        conference.id && 
        conference.title && 
        conference.eventDate
      );

      // Ensure participants is an array
      conferencesData = conferencesData.map(conference => ({
        ...conference,
        participants: Array.isArray(conference.participants) ? conference.participants : []
      }));

      setConferences(conferencesData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch conferences:", error);
      setLoading(false);
      showSnackbar("Unable to fetch conferences. Please check your connection.", "error");
      
      // Fallback to sample conferences
      const sampleConferences = [
        {
          id: 1,
          title: "Tech Innovation Conference",
          description: "Explore the latest trends in technology and innovation",
          eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Convention Center",
          eventType: "CONFERENCE",
          participants: []
        }
      ];
      setConferences(sampleConferences);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  const handleCreateConference = async () => {
    try {
      // Validate required fields
      if (!newConference.title || !newConference.description || !newConference.eventDate) {
        showSnackbar("Please fill in all required fields", "error");
        return;
      }

      const conferenceData = {
        ...newConference,
        eventDate: new Date(newConference.eventDate).toISOString(),
        organizerEmail: user?.email || newConference.organizerEmail,
      };

      const response = await axios.post("/events", conferenceData);
      
      console.log("Conference creation response:", response);

      // Ensure the response contains the created event
      const createdConference = response.data;
      
      // Update conferences list
      setConferences(prev => [...prev, createdConference]);
      
      // Close dialog and show success message
      setOpenCreateDialog(false);
      showSnackbar("Conference created successfully!", "success");
    } catch (error) {
      console.error("Error creating conference:", error);
      showSnackbar("Failed to create conference. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const getFilteredConferences = () => {
    return conferences.filter(
      (conference) =>
        conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conference.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Add a safe participant calculation method
  const calculateTotalParticipants = () => {
    if (!Array.isArray(conferences)) return 0;
    return conferences.reduce(
      (sum, conference) => sum + (Array.isArray(conference.participants) ? conference.participants.length : 0),
      0
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
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading Conferences...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ConferenceHeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Professional Conferences
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            Network, Learn, and Grow
          </Typography>
          <Box display="flex" justifyContent="center" gap={3}>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {conferences.length}
              </Typography>
              <Typography variant="body2">Total Conferences</Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {calculateTotalParticipants()}
              </Typography>
              <Typography variant="body2">Total Participants</Typography>
            </Box>
          </Box>
        </Container>
      </ConferenceHeroSection>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Search conferences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Tooltip title="Refresh Conferences">
              <IconButton color="primary" onClick={fetchConferences}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create Conference
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {getFilteredConferences().map((conference) => (
            <Grid item xs={12} md={6} lg={4} key={conference.id}>
              <ConferenceCard>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <ConferenceIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {conference.title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, minHeight: "60px" }}
                  >
                    {conference.description}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(conference.eventDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(conference.eventDate).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {conference.location}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {conference.participants?.length || 0} Registered
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
              </ConferenceCard>
            </Grid>
          ))}
        </Grid>

        {getFilteredConferences().length === 0 && (
          <Box textAlign="center" py={8}>
            <ConferenceIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No Conferences Found
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
        <DialogTitle>Create New Conference</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} pt={1}>
            <TextField
              label="Conference Title"
              fullWidth
              value={newConference.title}
              onChange={(e) => setNewConference({ ...newConference, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newConference.description}
              onChange={(e) => setNewConference({ ...newConference, description: e.target.value })}
            />
            <TextField
              label="Organizer Email"
              fullWidth
              value={newConference.organizerEmail}
              onChange={(e) => setNewConference({ ...newConference, organizerEmail: e.target.value })}
            />
            <TextField
              label="Date and Time"
              type="datetime-local"
              fullWidth
              value={newConference.eventDate}
              onChange={(e) => setNewConference({ ...newConference, eventDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              fullWidth
              value={newConference.location}
              onChange={(e) => setNewConference({ ...newConference, location: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateConference}
          >
            Create Conference
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

export default Conferences;
