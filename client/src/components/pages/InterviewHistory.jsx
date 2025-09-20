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
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack,
  Search,
  FilterList,
  TrendingUp,
  Assessment,
  School,
  Work,
  Psychology,
  Code,
  BusinessCenter,
  PersonSearch,
  Star,
  Timer,
  CheckCircle,
  AccessTime,
  Person,
  CalendarToday,
  ExpandMore,
  Launch,
  Share,
  Download,
  Analytics,
  EmojiEvents,
  Feedback,
  History,
  TrendingDown,
  TrendingFlat,
  Lightbulb,
  BookmarkBorder,
  Bookmark,
  PlayArrow,
  BarChart,
  ShowChart,
  PieChart,
} from "@mui/icons-material";
import {
  interviewHistoryData,
  performanceAnalytics,
  improvementRecommendations,
  skillCategories,
  interviewGoals,
  certificationBadges,
} from "../../utils/interviewHistoryData";

const InterviewHistory = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Filter interview history
  const filteredHistory = interviewHistoryData.filter((interview) => {
    if (selectedType !== "all" && interview.type !== selectedType) return false;
    if (selectedIndustry !== "all" && interview.industry !== selectedIndustry)
      return false;
    if (
      searchTerm &&
      !interview.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !interview.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="text-green-500" />;
      case "declining":
        return <TrendingDown className="text-red-500" />;
      default:
        return <TrendingFlat className="text-gray-500" />;
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 90) return "success";
    if (score >= 80) return "warning";
    if (score >= 70) return "info";
    return "error";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Render overview stats
  const renderOverviewStats = () => (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <Assessment className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <Typography variant="h4" className="font-bold">
              {performanceAnalytics.overall.totalInterviews}
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Total Interviews
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={componentStyles.card}>
          <CardContent className="text-center p-4">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <Typography variant="h4" className="font-bold">
              {performanceAnalytics.overall.averageScore}
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
              +{performanceAnalytics.overall.improvementRate}%
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
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <Typography variant="h4" className="font-bold">
              {performanceAnalytics.overall.successRate}%
            </Typography>
            <Typography variant="body2" className="opacity-70">
              Success Rate
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Render interview session card
  const renderInterviewCard = (interview) => {
    const IconComponent =
      {
        technical: Code,
        behavioral: Psychology,
        case_study: BusinessCenter,
        hr_screening: PersonSearch,
      }[interview.type] || Assessment;

    return (
      <Card
        key={interview.id}
        className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg cursor-pointer`}
        onClick={() => {
          setSelectedSession(interview);
          setShowSessionDetails(true);
        }}
      >
        <CardContent className="p-6">
          <Box className="flex items-start gap-4">
            <Avatar
              src={interview.interviewer.avatar}
              alt={interview.interviewer.name}
              className="w-12 h-12"
            />

            <Box className="flex-1">
              <Box className="flex items-center justify-between mb-2">
                <Typography variant="h6" className="font-bold">
                  {interview.title}
                </Typography>
                <Chip
                  label={`${interview.score}/100`}
                  color={getScoreColor(interview.score)}
                  size="small"
                />
              </Box>

              <Typography variant="body1" className="font-medium mb-2">
                {interview.company} • {interview.position}
              </Typography>

              <Box className="flex items-center gap-4 mb-3 text-sm opacity-70">
                <Box className="flex items-center gap-1">
                  <IconComponent className="w-4 h-4" />
                  {interview.type.replace("_", " ").toUpperCase()}
                </Box>
                <Box className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  {interview.duration} min
                </Box>
                <Box className="flex items-center gap-1">
                  <CalendarToday className="w-4 h-4" />
                  {formatDate(interview.completedAt)}
                </Box>
              </Box>

              <Box className="mb-3">
                <Typography variant="body2" className="opacity-70 mb-1">
                  Overall Feedback:
                </Typography>
                <Typography variant="body2" className="line-clamp-2">
                  {interview.feedback.overall}
                </Typography>
              </Box>

              <Box className="flex flex-wrap gap-1">
                {interview.tags.slice(0, 3).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    className="text-xs"
                  />
                ))}
                {interview.tags.length > 3 && (
                  <Chip
                    label={`+${interview.tags.length - 3} more`}
                    size="small"
                    variant="outlined"
                    className="text-xs"
                  />
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render skills progression
  const renderSkillsProgression = () => (
    <Grid container spacing={4}>
      {Object.entries(performanceAnalytics.skillsProgression).map(
        ([skill, data]) => (
          <Grid item xs={12} md={6} key={skill}>
            <Card className={componentStyles.card}>
              <CardContent className="p-6">
                <Box className="flex items-center justify-between mb-4">
                  <Typography variant="h6" className="font-bold">
                    {skill}
                  </Typography>
                  <Box className="flex items-center gap-2">
                    {getTrendIcon(data.trend)}
                    <Chip
                      label={data.currentLevel}
                      color={
                        data.currentLevel === "Expert"
                          ? "success"
                          : data.currentLevel === "Advanced"
                          ? "primary"
                          : "default"
                      }
                      size="small"
                    />
                  </Box>
                </Box>

                <Box className="mb-4">
                  <Box className="flex justify-between items-center mb-2">
                    <Typography variant="body2" className="opacity-70">
                      Current Level: {data.currentLevel}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-green-600 font-medium"
                    >
                      +{data.improvement}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={data.scores[data.scores.length - 1]}
                    className="rounded-full h-3"
                  />
                </Box>

                <Box className="flex justify-between text-sm opacity-70">
                  <span>Progress</span>
                  <span>{data.scores[data.scores.length - 1]}/100</span>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )
      )}
    </Grid>
  );

  // Render performance by type
  const renderPerformanceByType = () => (
    <Grid container spacing={3}>
      {Object.entries(performanceAnalytics.byType).map(([type, data]) => {
        const IconComponent =
          {
            technical: Code,
            behavioral: Psychology,
            case_study: BusinessCenter,
            hr_screening: PersonSearch,
          }[type] || Assessment;

        return (
          <Grid item xs={12} sm={6} md={3} key={type}>
            <Card className={componentStyles.card}>
              <CardContent className="text-center p-4">
                <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <Typography variant="h6" className="font-bold capitalize mb-2">
                  {type.replace("_", " ")}
                </Typography>
                <Typography variant="h4" className="font-bold mb-1">
                  {Math.round(data.averageScore)}
                </Typography>
                <Typography variant="body2" className="opacity-70 mb-2">
                  Average Score
                </Typography>
                <Typography variant="body2" className="text-green-600">
                  {data.count} interviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  // Render improvement recommendations
  const renderRecommendations = () => (
    <Grid container spacing={3}>
      {improvementRecommendations.map((rec) => (
        <Grid item xs={12} md={6} key={rec.id}>
          <Card className={componentStyles.card}>
            <CardContent className="p-6">
              <Box className="flex items-start justify-between mb-4">
                <Box>
                  <Typography variant="h6" className="font-bold mb-1">
                    {rec.category}
                  </Typography>
                  <Chip
                    label={rec.priority.toUpperCase()}
                    color={
                      rec.priority === "high"
                        ? "error"
                        : rec.priority === "medium"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </Box>
                <IconButton>
                  <BookmarkBorder />
                </IconButton>
              </Box>

              <Typography variant="body2" className="opacity-70 mb-4">
                {rec.description}
              </Typography>

              <Box className="mb-4">
                <Typography variant="body2" className="font-medium mb-2">
                  Recommended Resources:
                </Typography>
                <List className="p-0">
                  {rec.resources.slice(0, 2).map((resource, index) => (
                    <ListItem key={index} className="px-0 py-1">
                      <ListItemIcon className="min-w-8">
                        <School className="w-4 h-4" />
                      </ListItemIcon>
                      <ListItemText
                        primary={resource.title}
                        secondary={`${resource.type} • ${resource.duration}`}
                        primaryTypographyProps={{ className: "text-sm" }}
                        secondaryTypographyProps={{ className: "text-xs" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box className="flex justify-between items-center">
                <Typography variant="body2" className="opacity-70">
                  Est. Time: {rec.estimatedImprovementTime}
                </Typography>
                <Button variant="outlined" size="small">
                  Start Learning
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Render goals section
  const renderGoals = () => (
    <Grid container spacing={3}>
      {interviewGoals.map((goal) => (
        <Grid item xs={12} md={6} key={goal.id}>
          <Card
            className={`${componentStyles.card} transition-all duration-300 hover:shadow-lg cursor-pointer`}
            onClick={() => {
              setSelectedGoal(goal);
              setShowGoalDialog(true);
            }}
          >
            <CardContent className="p-6">
              <Box className="flex items-start justify-between mb-4">
                <Box className="flex-1">
                  <Typography variant="h6" className="font-bold mb-1">
                    {goal.title}
                  </Typography>
                  <Typography variant="body2" className="opacity-70 mb-2">
                    {goal.description}
                  </Typography>
                  <Chip
                    label={
                      skillCategories.find((c) => c.id === goal.category)?.name
                    }
                    size="small"
                    style={{
                      backgroundColor:
                        skillCategories.find((c) => c.id === goal.category)
                          ?.color + "20",
                      color: skillCategories.find((c) => c.id === goal.category)
                        ?.color,
                    }}
                  />
                </Box>
                <Assessment className="text-blue-500" />
              </Box>

              <Box className="mb-4">
                <Box className="flex justify-between items-center mb-2">
                  <Typography variant="body2" className="opacity-70">
                    Progress
                  </Typography>
                  <Typography variant="body2" className="font-medium">
                    {goal.currentScore}/{goal.targetScore}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={goal.progress}
                  className="rounded-full h-2"
                />
              </Box>

              <Box className="flex justify-between items-center">
                <Typography variant="body2" className="opacity-70">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-blue-600 font-medium"
                >
                  {goal.progress}% complete
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Add New Goal Card */}
      <Grid item xs={12} md={6}>
        <Card
          className={`${componentStyles.card} border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer`}
        >
          <CardContent className="p-6 text-center">
            <Assessment className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <Typography variant="h6" className="font-bold mb-2">
              Set New Goal
            </Typography>
            <Typography variant="body2" className="opacity-70 mb-4">
              Create a personalized improvement goal
            </Typography>
            <Button variant="outlined" startIcon={<Assessment />}>
              Create Goal
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Render certification badges
  const renderBadges = () => (
    <Grid container spacing={3}>
      {certificationBadges.map((badge) => (
        <Grid item xs={12} sm={6} md={4} key={badge.id}>
          <Card
            className={`${componentStyles.card} ${
              badge.earned ? "border-2 border-yellow-400" : ""
            }`}
          >
            <CardContent className="text-center p-6">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  badge.earned ? "bg-yellow-100" : "bg-gray-100"
                }`}
              >
                <EmojiEvents
                  className={`w-8 h-8 ${
                    badge.earned ? "text-yellow-600" : "text-gray-400"
                  }`}
                />
              </div>

              <Typography variant="h6" className="font-bold mb-2">
                {badge.title}
              </Typography>

              <Typography variant="body2" className="opacity-70 mb-4">
                {badge.description}
              </Typography>

              {badge.earned ? (
                <Chip label="EARNED" color="warning" variant="filled" />
              ) : (
                <Box>
                  <Box className="mb-2">
                    <CircularProgress
                      variant="determinate"
                      value={badge.progress}
                      size={40}
                      thickness={4}
                    />
                  </Box>
                  <Typography variant="body2" className="opacity-70">
                    {badge.progress}% complete
                  </Typography>
                </Box>
              )}
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
              Interview History & Analytics
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/mock-interviews")}
            className={componentStyles.button.primary}
            startIcon={<PlayArrow />}
          >
            Practice More
          </Button>
        </Box>

        {/* Overview Stats */}
        {renderOverviewStats()}

        {/* Tabs */}
        <Box className="mb-6">
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            <Tab label="Interview History" icon={<History />} />
            <Tab label="Skills Analysis" icon={<Analytics />} />
            <Tab label="Performance" icon={<BarChart />} />
            <Tab label="Recommendations" icon={<Lightbulb />} />
            <Tab label="Goals" icon={<Assessment />} />
            <Tab label="Achievements" icon={<EmojiEvents />} />
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
                      placeholder="Search interviews..."
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

                    <FormControl size="small" className="min-w-32">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        label="Type"
                      >
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="technical">Technical</MenuItem>
                        <MenuItem value="behavioral">Behavioral</MenuItem>
                        <MenuItem value="case_study">Case Study</MenuItem>
                        <MenuItem value="hr_screening">HR Screening</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" className="min-w-32">
                      <InputLabel>Industry</InputLabel>
                      <Select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        label="Industry"
                      >
                        <MenuItem value="all">All Industries</MenuItem>
                        <MenuItem value="technology">Technology</MenuItem>
                        <MenuItem value="consulting">Consulting</MenuItem>
                        <MenuItem value="finance">Finance</MenuItem>
                        <MenuItem value="engineering">Engineering</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>

              {/* Interview History List */}
              <Grid container spacing={3}>
                {filteredHistory.length === 0 ? (
                  <Grid item xs={12}>
                    <Card className={componentStyles.card}>
                      <CardContent className="text-center py-16">
                        <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <Typography variant="h5" className="font-bold mb-2">
                          No Interview History Found
                        </Typography>
                        <Typography variant="body1" className="opacity-70 mb-4">
                          Start practicing interviews to build your history
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => navigate("/mock-interviews")}
                          className={componentStyles.button.primary}
                        >
                          Start First Interview
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  filteredHistory.map((interview) => (
                    <Grid item xs={12} lg={6} key={interview.id}>
                      {renderInterviewCard(interview)}
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Fade>
        )}

        {currentTab === 1 && (
          <Fade in={currentTab === 1}>
            <Box>{renderSkillsProgression()}</Box>
          </Fade>
        )}

        {currentTab === 2 && (
          <Fade in={currentTab === 2}>
            <Box>{renderPerformanceByType()}</Box>
          </Fade>
        )}

        {currentTab === 3 && (
          <Fade in={currentTab === 3}>
            <Box>{renderRecommendations()}</Box>
          </Fade>
        )}

        {currentTab === 4 && (
          <Fade in={currentTab === 4}>
            <Box>{renderGoals()}</Box>
          </Fade>
        )}

        {currentTab === 5 && (
          <Fade in={currentTab === 5}>
            <Box>{renderBadges()}</Box>
          </Fade>
        )}

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
                      {formatDate(selectedSession.completedAt)}
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

                  {/* Detailed Feedback */}
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

                  {/* Skills Assessed */}
                  <Box>
                    <Typography variant="h6" className="font-bold mb-3">
                      Skills Assessed
                    </Typography>
                    <Box className="flex flex-wrap gap-2">
                      {selectedSession.skillsAssessed.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowSessionDetails(false)}>
                  Close
                </Button>
                <Button variant="outlined" startIcon={<Share />}>
                  Share
                </Button>
                <Button variant="contained" startIcon={<Download />}>
                  Download Report
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Goal Details Dialog */}
        <Dialog
          open={showGoalDialog}
          onClose={() => setShowGoalDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedGoal && (
            <>
              <DialogTitle>
                <Typography variant="h5" className="font-bold">
                  {selectedGoal.title}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box className="space-y-6">
                  <Typography variant="body1">
                    {selectedGoal.description}
                  </Typography>

                  <Box className="grid grid-cols-2 gap-4">
                    <Box>
                      <Typography variant="body2" className="opacity-70">
                        Current Score
                      </Typography>
                      <Typography variant="h4" className="font-bold">
                        {selectedGoal.currentScore}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" className="opacity-70">
                        Target Score
                      </Typography>
                      <Typography variant="h4" className="font-bold">
                        {selectedGoal.targetScore}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" className="font-bold mb-3">
                      Milestones
                    </Typography>
                    <List>
                      {selectedGoal.milestones.map((milestone) => (
                        <ListItem key={milestone.id}>
                          <ListItemIcon>
                            {milestone.completed ? (
                              <CheckCircle className="text-green-500" />
                            ) : (
                              <AccessTime className="text-gray-400" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={milestone.title}
                            className={
                              milestone.completed
                                ? "line-through opacity-70"
                                : ""
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowGoalDialog(false)}>Close</Button>
                <Button variant="contained">Update Goal</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default InterviewHistory;
