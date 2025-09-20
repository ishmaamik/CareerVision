import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../styles/themes";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ArrowBack,
  Search,
  FilterList,
  Sort,
  CalendarToday,
  LocationOn,
  Work,
  Money,
  MoreVert,
  Notifications,
  Edit,
  Delete,
  Share,
  Download,
  CheckCircle,
  Schedule,
  Warning,
  Cancel,
  TrendingUp,
  Assessment,
  Event,
  Phone,
  VideoCall,
  Person,
  AttachFile,
  Note,
  ExpandMore,
  Launch,
} from "@mui/icons-material";
import {
  mockApplications,
  applicationStatuses,
  applicationStages,
  applicationMetrics,
} from "../../utils/applicationsData";

const Applications = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [applications] = useState(mockApplications);
  const [filteredApplications, setFilteredApplications] =
    useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("application_date");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);

  // Filter applications
  useEffect(() => {
    let filtered = applications;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((app) => app.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "application_date":
          return new Date(b.applicationDate) - new Date(a.applicationDate);
        case "company":
          return a.company.localeCompare(b.company);
        case "match_score":
          return b.matchScore - a.matchScore;
        case "priority": {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, searchTerm, selectedStatus, sortBy]);

  // Get status color
  const getStatusColor = (status) => {
    const statusObj = applicationStatuses.find((s) => s.id === status);
    return statusObj ? statusObj.color : "#6B7280";
  };

  // Get days since application
  const getDaysSinceApplication = (dateString) => {
    const applicationDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - applicationDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get next upcoming interview
  const getUpcomingInterview = () => {
    const now = new Date();
    return applications
      .filter(
        (app) =>
          app.interviewDetails && new Date(app.interviewDetails.date) > now
      )
      .sort(
        (a, b) =>
          new Date(a.interviewDetails.date) - new Date(b.interviewDetails.date)
      )[0];
  };

  // Render statistics cards
  const renderStatsCards = () => {
    const activeApps = applications.filter(
      (app) => !["rejected", "withdrawn"].includes(app.status)
    ).length;

    const offerReceived = applications.filter(
      (app) => app.status === "offer_received"
    ).length;

    const upcomingInterviews = applications.filter(
      (app) =>
        app.interviewDetails && new Date(app.interviewDetails.date) > new Date()
    ).length;

    return (
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <Work className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <Typography variant="h4" className="font-bold">
                {applications.length}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Total Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <Typography variant="h4" className="font-bold">
                {activeApps}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Active Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <Typography variant="h4" className="font-bold">
                {offerReceived}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Offers Received
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={componentStyles.card}>
            <CardContent className="text-center p-4">
              <CalendarToday className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <Typography variant="h4" className="font-bold">
                {upcomingInterviews}
              </Typography>
              <Typography variant="body2" className="opacity-70">
                Upcoming Interviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Render application card
  const renderApplicationCard = (application) => {
    const daysSince = getDaysSinceApplication(application.applicationDate);
    const currentStage =
      application.timeline.find((stage) => !stage.completed) ||
      application.timeline[application.timeline.length - 1];

    return (
      <Card
        key={application.id}
        className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg cursor-pointer`}
        onClick={() => {
          setSelectedApplication(application);
          setShowApplicationDetails(true);
        }}
      >
        <CardContent className="p-6">
          {/* Header */}
          <Box className="flex justify-between items-start mb-4">
            <Box className="flex items-start gap-4 flex-1">
              <Avatar
                src={application.companyLogo}
                alt={application.company}
                className="w-12 h-12"
              />

              <Box className="flex-1">
                <Box className="flex items-center gap-2 mb-2">
                  <Typography variant="h6" className="font-bold">
                    {application.jobTitle}
                  </Typography>
                  <Chip
                    label={
                      applicationStatuses.find(
                        (s) => s.id === application.status
                      )?.name
                    }
                    style={{
                      backgroundColor: getStatusColor(application.status),
                      color: "white",
                    }}
                    size="small"
                  />
                  {application.priority === "high" && (
                    <Chip
                      label="High Priority"
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Typography variant="body1" className="font-medium mb-1">
                  {application.company}
                </Typography>

                <Box className="flex items-center gap-4 text-sm opacity-70 mb-3">
                  <Box className="flex items-center gap-1">
                    <LocationOn className="w-4 h-4" />
                    {application.location}
                  </Box>
                  <Box className="flex items-center gap-1">
                    <Money className="w-4 h-4" />
                    {application.salary}
                  </Box>
                  <Box className="flex items-center gap-1">
                    <CalendarToday className="w-4 h-4" />
                    Applied {daysSince} days ago
                  </Box>
                </Box>
              </Box>
            </Box>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>

          {/* Current Stage */}
          <Box className="mb-4">
            <Typography variant="body2" className="opacity-70 mb-2">
              Current Stage:
            </Typography>
            <Box className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getStatusColor(application.status) }}
              />
              <Typography variant="body1" className="font-medium">
                {currentStage?.stage &&
                  applicationStages.find((s) => s.id === currentStage.stage)
                    ?.name}
              </Typography>
              {application.interviewDetails && (
                <Chip
                  label={`Interview: ${formatDate(
                    application.interviewDetails.date
                  )}`}
                  color="primary"
                  size="small"
                  variant="outlined"
                  icon={<Schedule />}
                />
              )}
            </Box>
          </Box>

          {/* Progress Bar */}
          <Box className="mb-4">
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="body2" className="opacity-70">
                Progress
              </Typography>
              <Typography variant="body2" className="opacity-70">
                {application.timeline.filter((stage) => stage.completed).length}
                /{application.timeline.length} stages
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={
                (application.timeline.filter((stage) => stage.completed)
                  .length /
                  application.timeline.length) *
                100
              }
              className="rounded-full h-2"
            />
          </Box>

          {/* Match Score */}
          <Box className="flex items-center justify-between mb-4">
            <Box className="flex items-center gap-2">
              <Typography variant="body2" className="opacity-70">
                Match Score:
              </Typography>
              <Box className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={{ width: `${application.matchScore}%` }}
                  />
                </div>
                <Typography variant="body2" className="font-medium">
                  {application.matchScore}%
                </Typography>
              </Box>
            </Box>

            {application.referral && (
              <Chip
                label="Referral"
                color="success"
                size="small"
                variant="outlined"
                icon={<Person />}
              />
            )}
          </Box>

          {/* Actions */}
          <Box className="flex justify-between items-center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<Launch />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${application.id}`);
              }}
            >
              View Job
            </Button>

            {application.interviewDetails && (
              <Button
                variant="contained"
                size="small"
                startIcon={<CalendarToday />}
                className={componentStyles.button.primary}
              >
                Interview Details
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render application timeline
  const renderApplicationTimeline = (application) => (
    <Box className="space-y-4">
      {application.timeline.map((stage, index) => {
        const stageInfo = applicationStages.find((s) => s.id === stage.stage);
        const isLast = index === application.timeline.length - 1;

        return (
          <Box key={index} className="flex items-start gap-4">
            {/* Timeline dot and connector */}
            <Box className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stage.completed ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {stage.completed ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <Schedule className="w-5 h-5 text-gray-600" />
                )}
              </div>
              {!isLast && (
                <div
                  className={`w-1 h-12 mt-2 ${
                    stage.completed ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </Box>

            {/* Timeline content */}
            <Box className="flex-1 pb-8">
              <Typography variant="h6" className="font-medium">
                {stageInfo?.name || stage.stage}
              </Typography>
              {stage.date && (
                <Typography variant="body2" className="opacity-70">
                  {formatDate(stage.date)}
                </Typography>
              )}
              {stage.scheduled && !stage.completed && (
                <Chip
                  label="Scheduled"
                  color="primary"
                  size="small"
                  className="mt-1"
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  // Render upcoming interviews section
  const renderUpcomingInterviews = () => {
    const upcomingInterview = getUpcomingInterview();

    if (!upcomingInterview) {
      return (
        <Card className={componentStyles.card}>
          <CardContent className="text-center py-8">
            <CalendarToday className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <Typography variant="h6" className="font-bold mb-2">
              No Upcoming Interviews
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Your next interviews will appear here
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className={componentStyles.card}>
        <CardContent className="p-6">
          <Typography variant="h6" className="font-bold mb-4 flex items-center">
            <CalendarToday className="w-6 h-6 mr-2 text-blue-500" />
            Next Interview
          </Typography>

          <Box className="flex items-start gap-4">
            <Avatar
              src={upcomingInterview.companyLogo}
              alt={upcomingInterview.company}
              className="w-12 h-12"
            />

            <Box className="flex-1">
              <Typography variant="h6" className="font-bold mb-1">
                {upcomingInterview.jobTitle}
              </Typography>
              <Typography variant="body1" className="font-medium mb-2">
                {upcomingInterview.company}
              </Typography>

              <Box className="grid grid-cols-2 gap-4 text-sm">
                <Box>
                  <Typography variant="body2" className="opacity-70">
                    Date & Time
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {formatDate(upcomingInterview.interviewDetails.date)} at{" "}
                    {upcomingInterview.interviewDetails.time}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="opacity-70">
                    Type
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {upcomingInterview.interviewDetails.type}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="opacity-70">
                    Duration
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {upcomingInterview.interviewDetails.duration}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="opacity-70">
                    Interviewer
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {upcomingInterview.interviewDetails.interviewer}
                  </Typography>
                </Box>
              </Box>

              {upcomingInterview.interviewDetails.notes && (
                <Box className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <Typography variant="body2" className="opacity-70 mb-1">
                    Preparation Notes
                  </Typography>
                  <Typography variant="body2">
                    {upcomingInterview.interviewDetails.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box className="flex gap-2 mt-4">
            <Button
              variant="contained"
              size="small"
              startIcon={<CalendarToday />}
            >
              Add to Calendar
            </Button>
            <Button variant="outlined" size="small" startIcon={<Note />}>
              Preparation Notes
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-6">
          <Box className="flex items-center">
            <IconButton
              onClick={() => navigate(-1)}
              className="mr-4"
              style={{ color: isDarkMode ? "#e2e8f0" : "#2d3748" }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h3"
              className={`font-bold ${themeClasses.text.primary}`}
            >
              Applications Tracker
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/jobs")}
            className={componentStyles.button.primary}
          >
            Apply to More Jobs
          </Button>
        </Box>

        {/* Stats Cards */}
        {renderStatsCards()}

        {/* Tabs */}
        <Box className="mb-6">
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            <Tab label="All Applications" icon={<Work />} />
            <Tab label="Upcoming Interviews" icon={<CalendarToday />} />
            <Tab label="Analytics" icon={<Assessment />} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {currentTab === 0 && (
          <Fade in={currentTab === 0}>
            <Box>
              {/* Search and Filters */}
              <Card className={`${componentStyles.card} mb-6`}>
                <CardContent className="p-4">
                  <Box className="flex flex-wrap gap-4 items-center">
                    <TextField
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      className="flex-1 min-w-64"
                    />

                    {/* Status Filter */}
                    <Box className="flex gap-2 flex-wrap">
                      {applicationStatuses.map((status) => (
                        <Chip
                          key={status.id}
                          label={`${status.name} (${status.count})`}
                          onClick={() => setSelectedStatus(status.id)}
                          variant={
                            selectedStatus === status.id ? "filled" : "outlined"
                          }
                          style={{
                            backgroundColor:
                              selectedStatus === status.id
                                ? status.color
                                : "transparent",
                            color:
                              selectedStatus === status.id
                                ? "white"
                                : status.color,
                            borderColor: status.color,
                          }}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Applications List */}
              <Grid container spacing={3}>
                {filteredApplications.length === 0 ? (
                  <Grid item xs={12}>
                    <Card className={componentStyles.card}>
                      <CardContent className="text-center py-16">
                        <Work className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <Typography variant="h5" className="font-bold mb-2">
                          No Applications Found
                        </Typography>
                        <Typography variant="body1" className="opacity-70 mb-4">
                          Start applying to jobs to track your applications here
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate("/jobs")}
                          className={componentStyles.button.primary}
                        >
                          Browse Jobs
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  filteredApplications.map((application) => (
                    <Grid item xs={12} lg={6} key={application.id}>
                      {renderApplicationCard(application)}
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Fade>
        )}

        {currentTab === 1 && (
          <Fade in={currentTab === 1}>
            <Box>{renderUpcomingInterviews()}</Box>
          </Fade>
        )}

        {currentTab === 2 && (
          <Fade in={currentTab === 2}>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card className={componentStyles.card}>
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-bold mb-4">
                        Application Metrics
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Success Rate"
                            secondary={applicationMetrics.successRate}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Average Response Time"
                            secondary={applicationMetrics.averageResponseTime}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Interview Conversion Rate"
                            secondary={
                              applicationMetrics.interviewConversionRate
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Average Time to Offer"
                            secondary={applicationMetrics.averageTimeToOffer}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card className={componentStyles.card}>
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-bold mb-4">
                        Status Distribution
                      </Typography>
                      {applicationStatuses
                        .filter((s) => s.id !== "all")
                        .map((status) => (
                          <Box key={status.id} className="mb-3">
                            <Box className="flex justify-between items-center mb-1">
                              <Typography variant="body2">
                                {status.name}
                              </Typography>
                              <Typography variant="body2">
                                {status.count}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(status.count / applications.length) * 100}
                              style={{ backgroundColor: "#e0e0e0" }}
                              sx={{
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: status.color,
                                },
                              }}
                            />
                          </Box>
                        ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Application Details Dialog */}
        <Dialog
          open={showApplicationDetails}
          onClose={() => setShowApplicationDetails(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedApplication && (
            <>
              <DialogTitle>
                <Box className="flex items-center gap-3">
                  <Avatar
                    src={selectedApplication.companyLogo}
                    alt={selectedApplication.company}
                    className="w-12 h-12"
                  />
                  <Box>
                    <Typography variant="h6" className="font-bold">
                      {selectedApplication.jobTitle}
                    </Typography>
                    <Typography variant="body2" className="opacity-70">
                      {selectedApplication.company}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box className="space-y-6">
                  {/* Timeline */}
                  <Box>
                    <Typography variant="h6" className="font-bold mb-4">
                      Application Timeline
                    </Typography>
                    {renderApplicationTimeline(selectedApplication)}
                  </Box>

                  {/* Interview Details */}
                  {selectedApplication.interviewDetails && (
                    <Box>
                      <Typography variant="h6" className="font-bold mb-4">
                        Upcoming Interview
                      </Typography>
                      <Paper
                        className="p-4"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" className="opacity-70">
                              Date & Time
                            </Typography>
                            <Typography variant="body1" className="font-medium">
                              {formatDate(
                                selectedApplication.interviewDetails.date
                              )}{" "}
                              at {selectedApplication.interviewDetails.time}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" className="opacity-70">
                              Type
                            </Typography>
                            <Typography variant="body1" className="font-medium">
                              {selectedApplication.interviewDetails.type}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" className="opacity-70">
                              Duration
                            </Typography>
                            <Typography variant="body1" className="font-medium">
                              {selectedApplication.interviewDetails.duration}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" className="opacity-70">
                              Interviewer
                            </Typography>
                            <Typography variant="body1" className="font-medium">
                              {selectedApplication.interviewDetails.interviewer}
                            </Typography>
                          </Grid>
                          {selectedApplication.interviewDetails.notes && (
                            <Grid item xs={12}>
                              <Typography
                                variant="body2"
                                className="opacity-70"
                              >
                                Notes
                              </Typography>
                              <Typography variant="body2">
                                {selectedApplication.interviewDetails.notes}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                    </Box>
                  )}

                  {/* Documents */}
                  <Box>
                    <Typography variant="h6" className="font-bold mb-4">
                      Documents
                    </Typography>
                    <List>
                      {selectedApplication.documents.map((doc, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <AttachFile />
                          </ListItemIcon>
                          <ListItemText
                            primary={doc.name}
                            secondary={`Uploaded ${formatDate(
                              doc.uploadDate
                            )} • ${doc.size}`}
                          />
                          <IconButton>
                            <Download />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Notes */}
                  {selectedApplication.notes && (
                    <Box>
                      <Typography variant="h6" className="font-bold mb-4">
                        Notes
                      </Typography>
                      <Paper
                        className="p-4"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                        }}
                      >
                        <Typography variant="body2">
                          {selectedApplication.notes}
                        </Typography>
                      </Paper>
                    </Box>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowApplicationDetails(false)}>
                  Close
                </Button>
                <Button variant="contained" startIcon={<Edit />}>
                  Edit Application
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Sort Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              setSortBy("application_date");
              setAnchorEl(null);
            }}
          >
            Most Recent
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortBy("company");
              setAnchorEl(null);
            }}
          >
            Company Name
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortBy("match_score");
              setAnchorEl(null);
            }}
          >
            Match Score
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortBy("priority");
              setAnchorEl(null);
            }}
          >
            Priority
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default Applications;
