import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Tooltip,
  Stack,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  VideoCall as VideoCallIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Event as EventIcon,
  Link as LinkIcon,
  FileCopy as CopyIcon,
} from "@mui/icons-material";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";

const InterviewScheduling = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const componentStyles = getComponentStyles(theme);

  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [scheduleDialog, setScheduleDialog] = useState(false);

  const [newInterview, setNewInterview] = useState({
    candidateId: "",
    type: "video",
    date: new Date(),
    duration: 60,
    interviewers: [],
    location: "",
    notes: "",
  });

  // Mock data
  const interviews = [
    {
      id: 1,
      candidateName: "John Smith",
      candidateEmail: "john.smith@email.com",
      candidateAvatar: "/avatars/john.jpg",
      jobTitle: "Senior React Developer",
      date: "2024-01-25T10:00:00Z",
      duration: 60,
      type: "video",
      status: "scheduled",
      interviewers: [
        { id: 1, name: "Alice Johnson", role: "Tech Lead" },
        { id: 2, name: "Bob Wilson", role: "Senior Developer" },
      ],
      meetingLink: "https://meet.google.com/abc-defg-hij",
      location: "Online",
      stage: "Technical Interview",
      notes: "Focus on React, TypeScript, and system design",
      feedback: null,
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      candidateEmail: "sarah.johnson@email.com",
      candidateAvatar: "/avatars/sarah.jpg",
      jobTitle: "Product Manager",
      date: "2024-01-24T14:30:00Z",
      duration: 45,
      type: "phone",
      status: "completed",
      interviewers: [{ id: 3, name: "Carol Davis", role: "PM Director" }],
      meetingLink: null,
      location: "Phone Call",
      stage: "Initial Screening",
      notes: "Product strategy and leadership discussion",
      feedback: {
        rating: 4.5,
        summary: "Strong product sense and leadership experience",
        decision: "proceed",
      },
    },
    {
      id: 3,
      candidateName: "Mike Chen",
      candidateEmail: "mike.chen@email.com",
      candidateAvatar: "/avatars/mike.jpg",
      jobTitle: "UX Designer",
      date: "2024-01-26T11:00:00Z",
      duration: 90,
      type: "in-person",
      status: "scheduled",
      interviewers: [
        { id: 4, name: "Diana Lee", role: "Design Lead" },
        { id: 5, name: "Eric Brown", role: "Product Designer" },
      ],
      meetingLink: null,
      location: "Conference Room A",
      stage: "Design Challenge",
      notes: "Portfolio review and design exercise",
      feedback: null,
    },
    {
      id: 4,
      candidateName: "Emma Davis",
      candidateEmail: "emma.davis@email.com",
      candidateAvatar: "/avatars/emma.jpg",
      jobTitle: "DevOps Engineer",
      date: "2024-01-23T15:00:00Z",
      duration: 60,
      type: "video",
      status: "cancelled",
      interviewers: [{ id: 6, name: "Frank Miller", role: "DevOps Lead" }],
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      location: "Online",
      stage: "Technical Interview",
      notes: "Infrastructure and automation focus",
      feedback: null,
    },
  ];

  const candidates = [
    { id: 1, name: "John Smith", jobTitle: "Senior React Developer" },
    { id: 2, name: "Sarah Johnson", jobTitle: "Product Manager" },
    { id: 3, name: "Mike Chen", jobTitle: "UX Designer" },
    { id: 4, name: "Emma Davis", jobTitle: "DevOps Engineer" },
  ];

  const interviewers = [
    { id: 1, name: "Alice Johnson", role: "Tech Lead" },
    { id: 2, name: "Bob Wilson", role: "Senior Developer" },
    { id: 3, name: "Carol Davis", role: "PM Director" },
    { id: 4, name: "Diana Lee", role: "Design Lead" },
    { id: 5, name: "Eric Brown", role: "Product Designer" },
    { id: 6, name: "Frank Miller", role: "DevOps Lead" },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      case "rescheduled":
        return "warning";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <VideoCallIcon />;
      case "phone":
        return <PhoneIcon />;
      case "in-person":
        return <PersonIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const InterviewCard = ({ interview }) => (
    <Card
      className={`${themeClasses.surface} hover:shadow-lg transition-all duration-300`}
    >
      <CardContent>
        <Box display="flex" justifyContent="between" alignItems="start" mb={2}>
          <Box display="flex" alignItems="center" flex={1}>
            <Avatar
              src={interview.candidateAvatar}
              sx={{ width: 48, height: 48, mr: 2 }}
            >
              {interview.candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="h6" className={themeClasses.text}>
                {interview.candidateName}
              </Typography>
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                {interview.jobTitle}
              </Typography>
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                {interview.stage}
              </Typography>
            </Box>
          </Box>
          <Box textAlign="right">
            <Chip
              label={interview.status}
              color={getStatusColor(interview.status)}
              size="small"
              sx={{ mb: 1 }}
            />
            <Box display="flex" gap={0.5}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={1}>
              <CalendarIcon
                sx={{ fontSize: 16, mr: 1 }}
                className={themeClasses.textSecondary}
              />
              <Typography variant="body2" className={themeClasses.text}>
                {formatDate(interview.date)} at {formatTime(interview.date)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <TimeIcon
                sx={{ fontSize: 16, mr: 1 }}
                className={themeClasses.textSecondary}
              />
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
              >
                Duration: {interview.duration} minutes
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              {getTypeIcon(interview.type)}
              <Typography
                variant="body2"
                className={themeClasses.textSecondary}
                ml={1}
              >
                {interview.location}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mb={2}>
          <Typography variant="subtitle2" className={themeClasses.text} mb={1}>
            Interviewers:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {interview.interviewers.map((interviewer) => (
              <Chip
                key={interviewer.id}
                label={`${interviewer.name} (${interviewer.role})`}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>

        {interview.notes && (
          <Box mb={2}>
            <Typography
              variant="subtitle2"
              className={themeClasses.text}
              mb={1}
            >
              Notes:
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {interview.notes}
            </Typography>
          </Box>
        )}

        {interview.feedback && (
          <Box mb={2}>
            <Alert severity="success" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Feedback Available</Typography>
              <Typography variant="body2">
                Rating: {interview.feedback.rating}/5 -{" "}
                {interview.feedback.summary}
              </Typography>
            </Alert>
          </Box>
        )}

        <Box display="flex" gap={1} flexWrap="wrap">
          {interview.status === "scheduled" && (
            <>
              {interview.meetingLink && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LinkIcon />}
                  sx={componentStyles.button}
                  onClick={() => window.open(interview.meetingLink, "_blank")}
                >
                  Join Meeting
                </Button>
              )}
              <Button variant="outlined" size="small" startIcon={<EmailIcon />}>
                Send Reminder
              </Button>
            </>
          )}
          {interview.status === "completed" && !interview.feedback && (
            <Button
              variant="contained"
              size="small"
              startIcon={<CheckIcon />}
              sx={componentStyles.button}
            >
              Add Feedback
            </Button>
          )}
          <Button variant="outlined" size="small" startIcon={<CopyIcon />}>
            Copy Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const InterviewTableRow = ({ interview }) => (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar src={interview.candidateAvatar} sx={{ mr: 2 }}>
            {interview.candidateName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" className={themeClasses.text}>
              {interview.candidateName}
            </Typography>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {interview.jobTitle}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" className={themeClasses.text}>
            {formatDate(interview.date)}
          </Typography>
          <Typography variant="body2" className={themeClasses.textSecondary}>
            {formatTime(interview.date)}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          {getTypeIcon(interview.type)}
          <Typography
            variant="body2"
            className={themeClasses.textSecondary}
            ml={1}
          >
            {interview.type}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={interview.status}
          color={getStatusColor(interview.status)}
          size="small"
        />
      </TableCell>
      <TableCell>{interview.stage}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={0.5}>
          {interview.interviewers.slice(0, 2).map((interviewer) => (
            <Tooltip
              key={interviewer.id}
              title={`${interviewer.name} (${interviewer.role})`}
            >
              <Avatar sx={{ width: 24, height: 24 }}>
                {interviewer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
            </Tooltip>
          ))}
          {interview.interviewers.length > 2 && (
            <Avatar sx={{ width: 24, height: 24, bgcolor: "grey.400" }}>
              +{interview.interviewers.length - 2}
            </Avatar>
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <Box display="flex" gap={0.5}>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          {interview.meetingLink && (
            <IconButton
              size="small"
              color="primary"
              onClick={() => window.open(interview.meetingLink, "_blank")}
            >
              <LinkIcon />
            </IconButton>
          )}
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

  const ScheduleDialog = () => (
    <Dialog
      open={scheduleDialog}
      onClose={() => setScheduleDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Schedule New Interview</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Candidate</InputLabel>
                <Select
                  value={newInterview.candidateId}
                  onChange={(e) =>
                    setNewInterview({
                      ...newInterview,
                      candidateId: e.target.value,
                    })
                  }
                >
                  {candidates.map((candidate) => (
                    <MenuItem key={candidate.id} value={candidate.id}>
                      {candidate.name} - {candidate.jobTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Interview Type</InputLabel>
                <Select
                  value={newInterview.type}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, type: e.target.value })
                  }
                >
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="in-person">In-Person</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Duration (minutes)</InputLabel>
                <Select
                  value={newInterview.duration}
                  onChange={(e) =>
                    setNewInterview({
                      ...newInterview,
                      duration: e.target.value,
                    })
                  }
                >
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={45}>45 minutes</MenuItem>
                  <MenuItem value={60}>60 minutes</MenuItem>
                  <MenuItem value={90}>90 minutes</MenuItem>
                  <MenuItem value={120}>120 minutes</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interview Date & Time"
                type="datetime-local"
                value={
                  newInterview.date
                    ? newInterview.date.toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setNewInterview({
                    ...newInterview,
                    date: new Date(e.target.value),
                  })
                }
                sx={componentStyles.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location/Meeting Link"
                value={newInterview.location}
                onChange={(e) =>
                  setNewInterview({ ...newInterview, location: e.target.value })
                }
                placeholder="Conference room or video call link"
                sx={componentStyles.textField}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={componentStyles.textField}>
                <InputLabel>Interviewers</InputLabel>
                <Select
                  multiple
                  value={newInterview.interviewers}
                  onChange={(e) =>
                    setNewInterview({
                      ...newInterview,
                      interviewers: e.target.value,
                    })
                  }
                  renderValue={(selected) =>
                    selected
                      .map((id) => interviewers.find((i) => i.id === id)?.name)
                      .join(", ")
                  }
                >
                  {interviewers.map((interviewer) => (
                    <MenuItem key={interviewer.id} value={interviewer.id}>
                      {interviewer.name} ({interviewer.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newInterview.notes}
                onChange={(e) =>
                  setNewInterview({ ...newInterview, notes: e.target.value })
                }
                placeholder="Interview focus areas, preparation notes..."
                sx={componentStyles.textField}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setScheduleDialog(false)}>Cancel</Button>
        <Button variant="contained" sx={componentStyles.button}>
          Schedule Interview
        </Button>
      </DialogActions>
    </Dialog>
  );

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.stage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || interview.status === filterStatus;
    const matchesType = filterType === "all" || interview.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const tabConfig = [
    { label: "Card View", icon: <ScheduleIcon /> },
    { label: "Table View", icon: <CalendarIcon /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              className={themeClasses.text}
              mb={1}
            >
              Interview Scheduling
            </Typography>
            <Typography variant="body1" className={themeClasses.textSecondary}>
              Schedule and manage candidate interviews
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setScheduleDialog(true)}
            sx={componentStyles.button}
          >
            Schedule Interview
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ScheduleIcon sx={{ color: "#3B82F6", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {
                        interviews.filter((i) => i.status === "scheduled")
                          .length
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Scheduled
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CheckIcon sx={{ color: "#10B981", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {
                        interviews.filter((i) => i.status === "completed")
                          .length
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Completed
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <VideoCallIcon sx={{ color: "#8B5CF6", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {interviews.filter((i) => i.type === "video").length}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      Video Calls
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={themeClasses.surface}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CalendarIcon sx={{ color: "#F59E0B", mr: 2 }} />
                  <Box>
                    <Typography variant="h6" className={themeClasses.text}>
                      {
                        interviews.filter(
                          (i) =>
                            new Date(i.date) > new Date() &&
                            new Date(i.date) <
                              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        ).length
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      className={themeClasses.textSecondary}
                    >
                      This Week
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={themeClasses.textSecondary} />
                  </InputAdornment>
                ),
              }}
              sx={componentStyles.textField}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="rescheduled">Rescheduled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={componentStyles.textField}>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="video">Video Call</MenuItem>
                <MenuItem value="phone">Phone Call</MenuItem>
                <MenuItem value="in-person">In-Person</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" className={themeClasses.textSecondary}>
              {filteredInterviews.length} interviews found
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* View Toggle */}
      <Box mb={3}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              minHeight: "48px",
              color: themeClasses.textSecondary,
            },
            "& .Mui-selected": {
              color: "#3B82F6 !important",
            },
          }}
        >
          {tabConfig.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {filteredInterviews.map((interview) => (
            <Grid item xs={12} md={6} lg={4} key={interview.id}>
              <InterviewCard interview={interview} />
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <TableContainer component={Paper} className={themeClasses.surface}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Interviewers</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <InterviewTableRow key={interview.id} interview={interview} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Schedule Dialog */}
      <ScheduleDialog />
    </Container>
  );
};

export default InterviewScheduling;
