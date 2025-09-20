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
  LinearProgress,
  Chip,
  Slider,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Avatar,
  Fade,
  Zoom,
} from "@mui/material";
import {
  ArrowBack,
  TrendingUp,
  Assessment,
  Timeline,
  School,
  WorkOutline,
  Star,
  BookmarkBorder,
  Bookmark,
  ExpandMore,
  PlayArrow,
  MenuBook,
  EmojiEvents,
  Speed,
  TrendingDown,
  CheckCircle,
  Warning,
  Info,
} from "@mui/icons-material";
import {
  skillCategories,
  skillLevels,
  learningResources,
  skillGapAnalysis,
  careerPathRecommendations,
} from "../../utils/skillsAnalysisData";

const SkillsAnalysis = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [currentTab, setCurrentTab] = useState(0);
  const [userSkills, setUserSkills] = useState({});
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [skillGaps, setSkillGaps] = useState({
    gaps: [],
    strengths: [],
    required: [],
  });
  const [savedSkills, setSavedSkills] = useState(new Set());
  const [selectedSkillForLearning, setSelectedSkillForLearning] =
    useState(null);

  // Initialize with mock user skills
  useEffect(() => {
    const mockUserSkills = {
      programming: 3,
      web_development: 4,
      data_analysis: 2,
      communication: 4,
      project_management: 2,
      ux_design: 1,
      digital_marketing: 3,
      public_speaking: 3,
      team_management: 2,
      graphic_design: 3,
    };
    setUserSkills(mockUserSkills);
  }, []);

  // Calculate skill gaps when target role changes
  useEffect(() => {
    const gaps = skillGapAnalysis.calculateGaps(userSkills, targetRole);
    setSkillGaps(gaps);
  }, [userSkills, targetRole]);

  // Handle skill level change
  const handleSkillChange = (skillId, value) => {
    setUserSkills((prev) => ({
      ...prev,
      [skillId]: value,
    }));
  };

  // Toggle saved skills
  const toggleSavedSkill = (skillId) => {
    setSavedSkills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };

  // Get skill level info
  const getSkillLevelInfo = (level) => {
    return skillLevels.find((l) => l.value === level) || skillLevels[0];
  };

  // Get all skills with categories
  const getAllSkills = () => {
    const allSkills = [];
    Object.entries(skillCategories).forEach(([categoryKey, category]) => {
      category.skills.forEach((skill) => {
        allSkills.push({
          ...skill,
          category: categoryKey,
          categoryName: category.name,
          categoryColor: category.color,
          userLevel: userSkills[skill.id] || 0,
        });
      });
    });
    return allSkills;
  };

  // Render skills overview
  const renderSkillsOverview = () => {
    const allSkills = getAllSkills();
    const topSkills = allSkills
      .filter((skill) => skill.userLevel > 0)
      .sort((a, b) => b.userLevel - a.userLevel)
      .slice(0, 8);

    const averageLevel =
      topSkills.length > 0
        ? topSkills.reduce((sum, skill) => sum + skill.userLevel, 0) /
          topSkills.length
        : 0;

    return (
      <Fade in={currentTab === 0}>
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12} sm={6} md={3}>
              <Card className={componentStyles.card}>
                <CardContent className="text-center p-6">
                  <Assessment className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                  <Typography variant="h4" className="font-bold mb-1">
                    {Object.keys(userSkills).length}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    Skills Tracked
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={componentStyles.card}>
                <CardContent className="text-center p-6">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <Typography variant="h4" className="font-bold mb-1">
                    {averageLevel.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    Average Level
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={componentStyles.card}>
                <CardContent className="text-center p-6">
                  <EmojiEvents className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                  <Typography variant="h4" className="font-bold mb-1">
                    {skillGaps.strengths.length}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    Strengths
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={componentStyles.card}>
                <CardContent className="text-center p-6">
                  <Warning className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                  <Typography variant="h4" className="font-bold mb-1">
                    {skillGaps.gaps.length}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    Skill Gaps
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Top Skills */}
          <Card className={componentStyles.card}>
            <CardContent className="p-6">
              <Typography
                variant="h5"
                className="font-bold mb-6 flex items-center"
              >
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Your Top Skills
              </Typography>
              <Grid container spacing={3}>
                {topSkills.map((skill) => {
                  const levelInfo = getSkillLevelInfo(skill.userLevel);
                  return (
                    <Grid item xs={12} md={6} key={skill.id}>
                      <Paper
                        className="p-4"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                        }}
                      >
                        <Box className="flex justify-between items-center mb-2">
                          <Typography variant="h6" className="font-medium">
                            {skill.name}
                          </Typography>
                          <Chip
                            label={levelInfo.label}
                            style={{
                              backgroundColor: levelInfo.color,
                              color: "white",
                            }}
                            size="small"
                          />
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(skill.userLevel / 5) * 100}
                          className="rounded-full h-2 mb-2"
                          style={{
                            backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
                          }}
                        />
                        <Box className="flex justify-between items-center">
                          <Typography variant="body2" className="opacity-70">
                            {skill.categoryName}
                          </Typography>
                          {skill.inDemand && (
                            <Chip
                              label={`${skill.growth} demand`}
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    );
  };

  // Render skill categories
  const renderSkillCategories = () => (
    <Fade in={currentTab === 1}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Skill Assessment by Category
        </Typography>

        {Object.entries(skillCategories).map(([categoryKey, category]) => (
          <Accordion key={categoryKey} className="mb-4">
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box className="flex items-center">
                <Typography variant="h2" className="mr-3">
                  {category.icon}
                </Typography>
                <Box>
                  <Typography variant="h6" className="font-bold">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" className="opacity-70">
                    {category.skills.length} skills to assess
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {category.skills.map((skill) => (
                  <Grid item xs={12} md={6} key={skill.id}>
                    <Card className={componentStyles.card}>
                      <CardContent className="p-4">
                        <Box className="flex justify-between items-center mb-3">
                          <Typography variant="h6" className="font-medium">
                            {skill.name}
                          </Typography>
                          <Box className="flex items-center gap-2">
                            {skill.inDemand && (
                              <Chip
                                label="High Demand"
                                color="success"
                                size="small"
                                icon={<TrendingUp />}
                              />
                            )}
                            <IconButton
                              onClick={() => toggleSavedSkill(skill.id)}
                              size="small"
                            >
                              {savedSkills.has(skill.id) ? (
                                <Bookmark className="text-blue-500" />
                              ) : (
                                <BookmarkBorder />
                              )}
                            </IconButton>
                          </Box>
                        </Box>

                        <Typography variant="body2" className="mb-3">
                          Current Level:{" "}
                          {getSkillLevelInfo(userSkills[skill.id] || 0).label}
                        </Typography>

                        <Slider
                          value={userSkills[skill.id] || 0}
                          onChange={(e, value) =>
                            handleSkillChange(skill.id, value)
                          }
                          min={0}
                          max={5}
                          step={1}
                          marks
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) =>
                            getSkillLevelInfo(value).label
                          }
                          color="primary"
                        />

                        <Box className="flex justify-between items-center mt-3">
                          <Typography variant="body2" className="opacity-60">
                            Market Growth: {skill.growth}
                          </Typography>
                          <Button
                            size="small"
                            onClick={() =>
                              setSelectedSkillForLearning(skill.id)
                            }
                            startIcon={<School />}
                          >
                            Learn
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Fade>
  );

  // Render skill gaps analysis
  const renderSkillGaps = () => (
    <Fade in={currentTab === 2}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Skills Gap Analysis
        </Typography>

        {/* Target Role Selection */}
        <Card className={`${componentStyles.card} mb-6`}>
          <CardContent className="p-6">
            <Typography variant="h6" className="font-bold mb-4">
              Target Career Role
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(careerPathRecommendations).map((role) => (
                <Grid item xs={12} sm={6} md={3} key={role}>
                  <Button
                    variant={targetRole === role ? "contained" : "outlined"}
                    onClick={() => setTargetRole(role)}
                    fullWidth
                    className="h-14"
                  >
                    {role}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Strengths */}
          <Grid item xs={12} md={6}>
            <Card className={componentStyles.card}>
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-bold mb-4 flex items-center"
                >
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  Your Strengths ({skillGaps.strengths.length})
                </Typography>

                {skillGaps.strengths.length === 0 ? (
                  <Typography
                    variant="body2"
                    className="opacity-70 text-center py-8"
                  >
                    No strong skills identified for this role yet
                  </Typography>
                ) : (
                  <List>
                    {skillGaps.strengths.map((skillId) => {
                      const skill = getAllSkills().find(
                        (s) => s.id === skillId
                      );
                      return (
                        <ListItem key={skillId} className="px-0">
                          <ListItemIcon>
                            <CheckCircle className="text-green-500" />
                          </ListItemIcon>
                          <ListItemText
                            primary={skill?.name || skillId}
                            secondary={`Level: ${
                              getSkillLevelInfo(userSkills[skillId] || 0).label
                            }`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Skill Gaps */}
          <Grid item xs={12} md={6}>
            <Card className={componentStyles.card}>
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-bold mb-4 flex items-center"
                >
                  <Warning className="w-6 h-6 mr-2 text-orange-500" />
                  Skills to Develop ({skillGaps.gaps.length})
                </Typography>

                {skillGaps.gaps.length === 0 ? (
                  <Box className="text-center py-8">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <Typography variant="h6" className="font-bold mb-2">
                      Excellent!
                    </Typography>
                    <Typography variant="body2" className="opacity-70">
                      You meet all skill requirements for this role
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {skillGaps.gaps.map((skillId) => {
                      const skill = getAllSkills().find(
                        (s) => s.id === skillId
                      );
                      const currentLevel = userSkills[skillId] || 0;
                      return (
                        <ListItem key={skillId} className="px-0">
                          <ListItemIcon>
                            <Warning className="text-orange-500" />
                          </ListItemIcon>
                          <ListItemText
                            primary={skill?.name || skillId}
                            secondary={
                              currentLevel === 0
                                ? "Not assessed yet"
                                : `Current: ${
                                    getSkillLevelInfo(currentLevel).label
                                  }`
                            }
                          />
                          <Button
                            size="small"
                            onClick={() => setSelectedSkillForLearning(skillId)}
                            startIcon={<School />}
                          >
                            Learn
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Career Path Recommendation */}
        {careerPathRecommendations[targetRole] && (
          <Card className={`${componentStyles.card} mt-6`}>
            <CardContent className="p-6">
              <Typography
                variant="h6"
                className="font-bold mb-4 flex items-center"
              >
                <Timeline className="w-6 h-6 mr-2 text-blue-500" />
                Career Development Path for {targetRole}
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <Typography variant="h6" className="font-bold mb-2">
                      Current Skills
                    </Typography>
                    <Box className="flex flex-wrap gap-1 justify-center">
                      {careerPathRecommendations[targetRole].currentSkills.map(
                        (skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            color="success"
                          />
                        )
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <Typography variant="h6" className="font-bold mb-2">
                      Next Skills
                    </Typography>
                    <Box className="flex flex-wrap gap-1 justify-center">
                      {careerPathRecommendations[targetRole].nextSkills.map(
                        (skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box className="text-center">
                    <Speed className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                    <Typography variant="h6" className="font-bold mb-2">
                      Timeline
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                      {careerPathRecommendations[targetRole].timeframe}
                    </Typography>
                    <Chip
                      label={`${careerPathRecommendations[targetRole].difficulty} Difficulty`}
                      color={
                        careerPathRecommendations[targetRole].difficulty ===
                        "High"
                          ? "error"
                          : careerPathRecommendations[targetRole].difficulty ===
                            "Medium"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Fade>
  );

  // Render learning resources
  const renderLearningResources = () => (
    <Fade in={currentTab === 3}>
      <Box>
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Learning Resources & Recommendations
        </Typography>

        {/* Recommended Skills to Learn */}
        <Card className={`${componentStyles.card} mb-6`}>
          <CardContent className="p-6">
            <Typography
              variant="h6"
              className="font-bold mb-4 flex items-center"
            >
              <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
              Skills You Should Focus On
            </Typography>

            <Grid container spacing={3}>
              {skillGaps.gaps.slice(0, 6).map((skillId) => {
                const skill = getAllSkills().find((s) => s.id === skillId);
                return (
                  <Grid item xs={12} sm={6} md={4} key={skillId}>
                    <Paper
                      className="p-4 cursor-pointer transition-all duration-300 hover:shadow-lg"
                      onClick={() => setSelectedSkillForLearning(skillId)}
                      style={{
                        backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                      }}
                    >
                      <Typography variant="h6" className="font-bold mb-2">
                        {skill?.name || skillId}
                      </Typography>
                      <Typography variant="body2" className="opacity-70 mb-3">
                        High demand: {skill?.growth || "+20%"} growth
                      </Typography>
                      <Button size="small" startIcon={<PlayArrow />} fullWidth>
                        Start Learning
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        {/* Popular Learning Resources */}
        <Grid container spacing={4}>
          {Object.entries(learningResources)
            .slice(0, 3)
            .map(([skillId, resources]) => (
              <Grid item xs={12} md={4} key={skillId}>
                <Card className={componentStyles.card}>
                  <CardContent className="p-6">
                    <Typography
                      variant="h6"
                      className="font-bold mb-4 capitalize"
                    >
                      {skillId.replace("_", " ")} Resources
                    </Typography>

                    {resources.map((resource, index) => (
                      <Paper
                        key={index}
                        className="p-3 mb-3 cursor-pointer transition-all duration-300 hover:shadow-md"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                        }}
                      >
                        <Box className="flex justify-between items-start mb-2">
                          <Typography
                            variant="subtitle1"
                            className="font-medium"
                          >
                            {resource.name}
                          </Typography>
                          <Chip
                            label={resource.type}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>

                        <Typography variant="body2" className="opacity-70 mb-2">
                          {resource.platform} • {resource.duration}
                        </Typography>

                        <Box className="flex justify-between items-center">
                          <Rating
                            value={resource.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                          />
                          <Button size="small" startIcon={<PlayArrow />}>
                            Start
                          </Button>
                        </Box>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Fade>
  );

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-8">
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
              Skills Analysis
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/career-assessment")}
            startIcon={<Assessment />}
            className={componentStyles.button.primary}
          >
            Take Assessment
          </Button>
        </Box>

        {/* Tabs */}
        <Box className="mb-8">
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            <Tab label="Overview" icon={<Assessment />} />
            <Tab label="Skill Categories" icon={<TrendingUp />} />
            <Tab label="Skill Gaps" icon={<Timeline />} />
            <Tab label="Learning Resources" icon={<School />} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box className="min-h-[60vh]">
          {currentTab === 0 && renderSkillsOverview()}
          {currentTab === 1 && renderSkillCategories()}
          {currentTab === 2 && renderSkillGaps()}
          {currentTab === 3 && renderLearningResources()}
        </Box>

        {/* Learning Resources Dialog */}
        <Dialog
          open={!!selectedSkillForLearning}
          onClose={() => setSelectedSkillForLearning(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Learning Resources for{" "}
            {selectedSkillForLearning &&
              selectedSkillForLearning.replace("_", " ")}
          </DialogTitle>
          <DialogContent>
            {selectedSkillForLearning &&
            learningResources[selectedSkillForLearning] ? (
              <Grid container spacing={2}>
                {learningResources[selectedSkillForLearning].map(
                  (resource, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        className="p-4"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                        }}
                      >
                        <Box className="flex justify-between items-start mb-2">
                          <Typography variant="h6" className="font-medium">
                            {resource.name}
                          </Typography>
                          <Chip
                            label={resource.type}
                            color="primary"
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" className="opacity-70 mb-2">
                          {resource.platform} • {resource.duration}
                        </Typography>
                        <Box className="flex justify-between items-center">
                          <Rating
                            value={resource.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                          />
                          <Button variant="contained" startIcon={<PlayArrow />}>
                            Start Learning
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  )
                )}
              </Grid>
            ) : (
              <Typography variant="body1" className="text-center py-8">
                Learning resources for this skill are coming soon!
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedSkillForLearning(null)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default SkillsAnalysis;
