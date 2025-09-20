import React, { useState } from "react";
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
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack,
  Search,
  FilterList,
  PlayArrow,
  Schedule,
  Assessment,
  TrendingUp,
  School,
  Work,
  Psychology,
  Code,
  BusinessCenter,
  PersonSearch,
  Groups,
  Slideshow,
  Star,
  Timer,
  CheckCircle,
  AccessTime,
  Person,
  CalendarToday,
  VideoCall,
  Mic,
  Camera,
  Settings,
  ExpandMore,
  Launch,
  BookmarkBorder,
  Bookmark,
  Share,
  Download,
  QuestionAnswer,
  Lightbulb,
  Analytics,
  EmojiEvents,
  Feedback,
  History,
} from "@mui/icons-material";
import {
  interviewTypes,
  difficultyLevels,
  mockInterviewSessions,
  upcomingInterviewSchedule,
  interviewTips,
  companies,
} from "../../utils/mockInterviewsData";

const MockInterviews = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showInterviewSetup, setShowInterviewSetup] = useState(false);
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [savedInterviews, setSavedInterviews] = useState([]);

  // Filter interview types
  const filteredInterviewTypes = interviewTypes.filter((type) => {
    if (selectedType !== "all" && type.id !== selectedType) return false;
    if (
      searchTerm &&
      !type.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  // Get recent sessions
  const recentSessions = mockInterviewSessions.slice(0, 3);

  // Calculate performance stats
  const averageScore =
    mockInterviewSessions.reduce((sum, session) => sum + session.score, 0) /
    mockInterviewSessions.length;
  const totalSessions = mockInterviewSessions.length;
  const improvementRate = 15; // Mock improvement rate

  // Toggle saved interview
  const toggleSavedInterview = (interviewId) => {
    setSavedInterviews((prev) =>
      prev.includes(interviewId)
        ? prev.filter((id) => id !== interviewId)
        : [...prev, interviewId]
    );
  };

  // Start interview
  const startInterview = (type, company = null) => {
    setSelectedInterviewType(type);
    setSelectedCompany(company);
    setShowInterviewSetup(true);
  };

  // Render performance overview
  const renderPerformanceOverview = () => (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <Assessment className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <Typography variant="h4" className="font-bold">
              {totalSessions}
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Total Sessions
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <Typography variant="h4" className="font-bold">
              {Math.round(averageScore)}
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Average Score
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <Typography variant="h4" className="font-bold">
              +{improvementRate}%
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Improvement Rate
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <Schedule className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <Typography variant="h4" className="font-bold">
              {upcomingInterviewSchedule.length}
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Scheduled
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Render interview type card
  const renderInterviewTypeCard = (type) => {
    const IconComponent =
      {
        psychology: Psychology,
        code: Code,
        business_center: BusinessCenter,
        person_search: PersonSearch,
        groups: Groups,
        slideshow: Slideshow,
      }[type.icon] || Assessment;

    return (
      <Card
        key={type.id}
        className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg`}
      >
        <CardContent className="p-6">
          {/* Header */}
          <Box className="flex justify-between items-start mb-4">
            <Box className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: type.color + "20" }}
              >
                <IconComponent
                  style={{ color: type.color }}
                  className="w-6 h-6"
                />
              </div>
              <Box>
                <Typography variant="h6" className="font-bold">
                  {type.name}
                </Typography>
                <Chip
                  label={type.difficulty}
                  size="small"
                  color={
                    type.difficulty === "Easy"
                      ? "success"
                      : type.difficulty === "Medium"
                      ? "warning"
                      : "error"
                  }
                  variant="outlined"
                />
              </Box>
            </Box>

            <IconButton
              onClick={() => toggleSavedInterview(type.id)}
              color={savedInterviews.includes(type.id) ? "primary" : "default"}
            >
              {savedInterviews.includes(type.id) ? (
                <Bookmark />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
          </Box>

          {/* Description */}
          <Typography variant="body2" className="opacity-70 mb-4">
            {type.description}
          </Typography>

          {/* Details */}
          <Box className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <Box>
              <Typography variant="body2" className="opacity-70">
                Duration
              </Typography>
              <Typography variant="body1" className="font-medium">
                {type.duration}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" className="opacity-70">
                Questions
              </Typography>
              <Typography variant="body1" className="font-medium">
                {type.questionCount}
              </Typography>
            </Box>
          </Box>

          {/* Features */}
          <Box className="mb-4">
            <Typography variant="body2" className="opacity-70 mb-2">
              Key Features
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {type.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  size="small"
                  variant="outlined"
                  className="text-xs"
                />
              ))}
            </Box>
          </Box>

          {/* Actions */}
          <Box className="flex gap-2">
            <Button
              variant="contained"
              onClick={() => startInterview(type)}
              className={componentStyles.button.primary}
              startIcon={<PlayArrow />}
              fullWidth
            >
              Start Interview
            </Button>
            <Tooltip title="View Tips">
              <IconButton
                onClick={() => {
                  // Show tips for this interview type
                }}
                className="border"
              >
                <Lightbulb />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render recent session card
  const renderRecentSessionCard = (session) => {
    const typeInfo = interviewTypes.find((t) => t.id === session.type);
    const IconComponent =
      {
        psychology: Psychology,
        code: Code,
        business_center: BusinessCenter,
        person_search: PersonSearch,
        groups: Groups,
        slideshow: Slideshow,
      }[typeInfo?.icon] || Assessment;

    return (
      <Card
        key={session.id}
        className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg cursor-pointer`}
        onClick={() => {
          setSelectedSession(session);
          setShowSessionDetails(true);
        }}
      >
        <CardContent className="p-4">
          <Box className="flex items-start gap-3">
            <Avatar
              src={session.interviewer.avatar}
              alt={session.interviewer.name}
              className="w-12 h-12"
            />

            <Box className="flex-1">
              <Typography variant="h6" className="font-bold mb-1">
                {session.title}
              </Typography>

              <Box className="flex items-center gap-2 mb-2">
                <Chip
                  label={typeInfo?.name}
                  size="small"
                  style={{ backgroundColor: typeInfo?.color, color: "white" }}
                />
                <Typography variant="body2" className="opacity-70">
                  {new Date(session.completedAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box className="flex items-center gap-4 mb-3">
                <Box className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <Typography variant="body2">
                    {session.duration} min
                  </Typography>
                </Box>
                <Box className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <Typography variant="body2" className="font-medium">
                    {session.score}/100
                  </Typography>
                </Box>
              </Box>

              <LinearProgress
                variant="determinate"
                value={session.score}
                className="rounded-full h-2"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render upcoming schedule
  const renderUpcomingSchedule = () => (
    <Card className={componentStyles.card}>
      <CardContent className="p-6">
        <Typography variant="h6" className="font-bold mb-4 flex items-center">
          <Schedule className="w-6 h-6 mr-2 text-blue-500" />
          Upcoming Sessions
        </Typography>

        {upcomingInterviewSchedule.length === 0 ? (
          <Box className="text-center py-8">
            <CalendarToday className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <Typography variant="h6" className="font-bold mb-2">
              No Scheduled Sessions
            </Typography>
            <Typography variant="body2" className="opacity-70 mb-4">
              Schedule your next practice session
            </Typography>
            <Button
              variant="contained"
              onClick={() => setCurrentTab(0)}
              className={componentStyles.button.primary}
            >
              Schedule Session
            </Button>
          </Box>
        ) : (
          <List>
            {upcomingInterviewSchedule.map((session) => (
              <ListItem key={session.id} className="px-0">
                <ListItemIcon>
                  <Avatar
                    style={{
                      backgroundColor: interviewTypes.find(
                        (t) => t.id === session.type
                      )?.color,
                    }}
                    className="w-10 h-10"
                  >
                    <Assessment />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={session.title}
                  secondary={`${new Date(
                    session.scheduledAt
                  ).toLocaleDateString()} at ${new Date(
                    session.scheduledAt
                  ).toLocaleTimeString()}`}
                />
                <Button variant="outlined" size="small">
                  Reschedule
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );

  // Render company-specific interviews
  const renderCompanyInterviews = () => (
    <Grid container spacing={3}>
      {companies.map((company) => (
        <Grid item xs={12} sm={6} md={4} key={company.id}>
          <Card
            className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg`}
          >
            <CardContent className="p-6 text-center">
              <Avatar
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 mx-auto mb-4"
              />
              <Typography variant="h6" className="font-bold mb-2">
                {company.name}
              </Typography>

              <Box className="flex flex-wrap justify-center gap-1 mb-4">
                {company.interviewStyles.map((style) => {
                  const typeInfo = interviewTypes.find((t) => t.id === style);
                  return (
                    <Chip
                      key={style}
                      label={typeInfo?.name}
                      size="small"
                      variant="outlined"
                    />
                  );
                })}
              </Box>

              <Button
                variant="contained"
                onClick={() =>
                  startInterview(company.interviewStyles[0], company)
                }
                className={componentStyles.button.primary}
                fullWidth
              >
                Practice Interview
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

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
              Mock Interviews
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => setCurrentTab(2)}
            className={componentStyles.button.primary}
            startIcon={<Analytics />}
          >
            View Analytics
          </Button>
        </Box>

        {/* Performance Overview */}
        {renderPerformanceOverview()}

        {/* Tabs */}
        <Box className="mb-6">
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            <Tab label="Practice Interviews" icon={<PlayArrow />} />
            <Tab label="Company-Specific" icon={<Work />} />
            <Tab label="My Sessions" icon={<History />} />
            <Tab label="Upcoming" icon={<Schedule />} />
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
                      placeholder="Search interview types..."
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

                    <FormControl size="small" className="min-w-40">
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        label="Difficulty"
                      >
                        <MenuItem value="all">All Levels</MenuItem>
                        {difficultyLevels.map((level) => (
                          <MenuItem key={level.id} value={level.id}>
                            {level.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>

              {/* Interview Types Grid */}
              <Grid container spacing={3}>
                {filteredInterviewTypes.map((type) => (
                  <Grid item xs={12} sm={6} lg={4} key={type.id}>
                    {renderInterviewTypeCard(type)}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {currentTab === 1 && (
          <Fade in={currentTab === 1}>
            <Box>{renderCompanyInterviews()}</Box>
          </Fade>
        )}

        {currentTab === 2 && (
          <Fade in={currentTab === 2}>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                  <Card className={componentStyles.card}>
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-bold mb-4">
                        Recent Sessions
                      </Typography>

                      {recentSessions.length === 0 ? (
                        <Box className="text-center py-8">
                          <Assessment className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <Typography variant="h6" className="font-bold mb-2">
                            No Sessions Yet
                          </Typography>
                          <Typography
                            variant="body2"
                            className="opacity-70 mb-4"
                          >
                            Start your first practice session to see results
                            here
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => setCurrentTab(0)}
                            className={componentStyles.button.primary}
                          >
                            Start First Session
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {recentSessions.map((session) => (
                            <Grid item xs={12} key={session.id}>
                              {renderRecentSessionCard(session)}
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  {renderUpcomingSchedule()}
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}

        {currentTab === 3 && (
          <Fade in={currentTab === 3}>
            <Box>{renderUpcomingSchedule()}</Box>
          </Fade>
        )}

        {/* Interview Setup Dialog */}
        <Dialog
          open={showInterviewSetup}
          onClose={() => setShowInterviewSetup(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" className="font-bold">
              Interview Setup
            </Typography>
          </DialogTitle>
          <DialogContent>
            {selectedInterviewType && (
              <Box className="space-y-6">
                <Box
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: selectedInterviewType.color + "20",
                    }}
                  >
                    <Assessment
                      style={{ color: selectedInterviewType.color }}
                      className="w-6 h-6"
                    />
                  </div>
                  <Box>
                    <Typography variant="h6" className="font-bold">
                      {selectedInterviewType.name}
                    </Typography>
                    <Typography variant="body2" className="opacity-70">
                      {selectedInterviewType.description}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" className="font-bold mb-4">
                    System Check
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle className="text-green-500" />
                      </ListItemIcon>
                      <ListItemText primary="Camera Access" secondary="Ready" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle className="text-green-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Microphone Access"
                        secondary="Ready"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle className="text-green-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Internet Connection"
                        secondary="Stable"
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box>
                  <Typography variant="h6" className="font-bold mb-4">
                    Interview Tips
                  </Typography>
                  <List>
                    {interviewTips[selectedInterviewType.id]
                      ?.slice(0, 3)
                      .map((tip, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Lightbulb className="text-yellow-500" />
                          </ListItemIcon>
                          <ListItemText primary={tip} />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowInterviewSetup(false)}>Cancel</Button>
            <Button
              variant="contained"
              className={componentStyles.button.primary}
              startIcon={<PlayArrow />}
              onClick={() => {
                setShowInterviewSetup(false);
                // Navigate to interview room
                navigate("/interview-room", {
                  state: {
                    interviewType: selectedInterviewType,
                    company: selectedCompany,
                  },
                });
              }}
            >
              Start Interview
            </Button>
          </DialogActions>
        </Dialog>

        {/* Session Details Dialog */}
        <Dialog
          open={showSessionDetails}
          onClose={() => setShowSessionDetails(false)}
          maxWidth="lg"
          fullWidth
        >
          {selectedSession && (
            <>
              <DialogTitle>
                <Box className="flex items-center gap-3">
                  <Avatar
                    src={selectedSession.interviewer.avatar}
                    alt={selectedSession.interviewer.name}
                    className="w-12 h-12"
                  />
                  <Box>
                    <Typography variant="h6" className="font-bold">
                      {selectedSession.title}
                    </Typography>
                    <Typography variant="body2" className="opacity-70">
                      {new Date(
                        selectedSession.completedAt
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box className="space-y-6">
                  {/* Overall Score */}
                  <Box
                    className="text-center p-6 rounded-lg"
                    style={{
                      backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                    }}
                  >
                    <Typography variant="h3" className="font-bold mb-2">
                      {selectedSession.score}/100
                    </Typography>
                    <Rating
                      value={selectedSession.score / 20}
                      readOnly
                      size="large"
                    />
                    <Typography variant="body1" className="mt-2">
                      {selectedSession.feedback.overall}
                    </Typography>
                  </Box>

                  {/* Feedback */}
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        className="font-bold mb-3 text-green-600"
                      >
                        Strengths
                      </Typography>
                      <List>
                        {selectedSession.feedback.strengths.map(
                          (strength, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <CheckCircle className="text-green-500" />
                              </ListItemIcon>
                              <ListItemText primary={strength} />
                            </ListItem>
                          )
                        )}
                      </List>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        className="font-bold mb-3 text-orange-600"
                      >
                        Areas for Improvement
                      </Typography>
                      <List>
                        {selectedSession.feedback.improvements.map(
                          (improvement, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <Lightbulb className="text-orange-500" />
                              </ListItemIcon>
                              <ListItemText primary={improvement} />
                            </ListItem>
                          )
                        )}
                      </List>
                    </Grid>
                  </Grid>

                  {/* Questions */}
                  <Box>
                    <Typography variant="h6" className="font-bold mb-4">
                      Questions & Responses
                    </Typography>
                    {selectedSession.questions.map((question, index) => (
                      <Accordion key={question.id}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Box className="flex items-center justify-between w-full mr-4">
                            <Typography variant="body1" className="font-medium">
                              Question {index + 1}
                            </Typography>
                            <Chip
                              label={`${question.score}/100`}
                              color={
                                question.score >= 80
                                  ? "success"
                                  : question.score >= 60
                                  ? "warning"
                                  : "error"
                              }
                              size="small"
                            />
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box className="space-y-3">
                            <Box>
                              <Typography
                                variant="body2"
                                className="font-medium opacity-70"
                              >
                                Question:
                              </Typography>
                              <Typography variant="body1">
                                {question.question}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="body2"
                                className="font-medium opacity-70"
                              >
                                Your Response:
                              </Typography>
                              <Typography variant="body1">
                                {question.answer}
                              </Typography>
                            </Box>
                            <Box className="flex justify-between text-sm opacity-70">
                              <span>
                                Time Spent: {question.timeSpent} minutes
                              </span>
                              <span>Score: {question.score}/100</span>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowSessionDetails(false)}>
                  Close
                </Button>
                <Button variant="outlined" startIcon={<Share />}>
                  Share Results
                </Button>
                <Button variant="contained" startIcon={<Download />}>
                  Download Report
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default MockInterviews;
