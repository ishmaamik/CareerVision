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
  School as WorkshopIcon,
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

const WorkshopCard = styled(Card)(({ theme }) => ({
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

const WorkshopHeroSection = styled(Box)({
  background: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
  color: "white",
  padding: "4rem 0",
  marginBottom: "2rem",
  borderRadius: "0 0 20px 20px",
  textAlign: "center",
});

const Workshops = () => {
  const { user } = useSelector((state) => state.user);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    description: "",
    organizerEmail: user?.email || "",
    eventDate: "",
    location: "",
    eventType: "WORKSHOP",
  });

  const fetchWorkshops = async () => {
    try {
      // Use full URL and add error handling
      const response = await axios.get("/events/type/WORKSHOP", {
        params: {
          includeDetails: true  // Request full event details
        }
      });
      
      console.log("Raw workshops response:", response);
      console.log("Response data type:", typeof response.data);
      console.log("Response data:", response.data);

      // Ensure we have an array
      let workshopsData = [];
      
      // Check if response is an array or has a data property
      if (Array.isArray(response.data)) {
        workshopsData = response.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        workshopsData = response.data.content;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        workshopsData = response.data.data;
      } else {
        console.warn("Unexpected workshops response format:", response.data);
        workshopsData = [];
      }

      // Validate each workshop has required properties
      workshopsData = workshopsData.filter(workshop => 
        workshop && 
        workshop.id && 
        workshop.title && 
        workshop.eventDate
      );

      // Ensure participants is an array
      workshopsData = workshopsData.map(workshop => ({
        ...workshop,
        participants: Array.isArray(workshop.participants) ? workshop.participants : []
      }));

      setWorkshops(workshopsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
      
      // Log detailed error information
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        
        // Handle specific error responses
        if (error.response.status === 400) {
          showSnackbar(error.response.data.message || "Invalid workshop type", "error");
        } else if (error.response.status === 500) {
          showSnackbar("Server error. Please try again later.", "error");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        showSnackbar("No response from server. Check your connection.", "error");
      } else {
        console.error("Error message:", error.message);
        showSnackbar("An unexpected error occurred", "error");
      }

      setLoading(false);
      
      // Fallback to sample workshops
      const sampleWorkshops = [
        {
          id: 1,
          title: "Professional Skills Workshop",
          description: "Develop essential skills for career success",
          eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Online Workshop",
          eventType: "WORKSHOP",
          participants: []
        }
      ];
      setWorkshops(sampleWorkshops);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleCreateWorkshop = async () => {
    try {
      // Validate required fields
      if (!newWorkshop.title || !newWorkshop.description || !newWorkshop.eventDate) {
        showSnackbar("Please fill in all required fields", "error");
        return;
      }

      const workshopData = {
        ...newWorkshop,
        eventDate: new Date(newWorkshop.eventDate).toISOString(),
        organizerEmail: user?.email || newWorkshop.organizerEmail,
      };

      const response = await axios.post("/events", workshopData);
      
      console.log("Workshop creation response:", response);

      // Ensure the response contains the created event
      const createdWorkshop = response.data;
      
      // Update workshops list
      setWorkshops(prev => [...prev, createdWorkshop]);
      
      // Close dialog and show success message
      setOpenCreateDialog(false);
      showSnackbar("Workshop created successfully!", "success");
    } catch (error) {
      // Most error handling now done in axiosConfig
      showSnackbar("Failed to create workshop. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const getFilteredWorkshops = () => {
    return workshops.filter(
      (workshop) =>
        workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Add a safe participant calculation method
  const calculateTotalParticipants = () => {
    if (!Array.isArray(workshops)) return 0;
    return workshops.reduce(
      (sum, workshop) => sum + (Array.isArray(workshop.participants) ? workshop.participants.length : 0),
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
          Loading Workshops...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <WorkshopHeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Skill-Building Workshops
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            Learn, Practice, and Grow
          </Typography>
          <Box display="flex" justifyContent="center" gap={3}>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {workshops.length}
              </Typography>
              <Typography variant="body2">Total Workshops</Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {calculateTotalParticipants()}
              </Typography>
              <Typography variant="body2">Total Participants</Typography>
            </Box>
          </Box>
        </Container>
      </WorkshopHeroSection>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Search workshops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Tooltip title="Refresh Workshops">
              <IconButton color="primary" onClick={fetchWorkshops}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create Workshop
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {getFilteredWorkshops().map((workshop) => (
            <Grid item xs={12} md={6} lg={4} key={workshop.id}>
              <WorkshopCard>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <WorkshopIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {workshop.title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, minHeight: "60px" }}
                  >
                    {workshop.description}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(workshop.eventDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(workshop.eventDate).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {workshop.location}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {workshop.participants?.length || 0} Registered
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
              </WorkshopCard>
            </Grid>
          ))}
        </Grid>

        {getFilteredWorkshops().length === 0 && (
          <Box textAlign="center" py={8}>
            <WorkshopIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No Workshops Found
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
        <DialogTitle>Create New Workshop</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} pt={1}>
            <TextField
              label="Workshop Title"
              fullWidth
              value={newWorkshop.title}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newWorkshop.description}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
            />
            <TextField
              label="Organizer Email"
              fullWidth
              value={newWorkshop.organizerEmail}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, organizerEmail: e.target.value })}
            />
            <TextField
              label="Date and Time"
              type="datetime-local"
              fullWidth
              value={newWorkshop.eventDate}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, eventDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              fullWidth
              value={newWorkshop.location}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateWorkshop}
          >
            Create Workshop
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

export default Workshops;
