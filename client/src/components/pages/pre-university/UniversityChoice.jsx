import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import {
  ArrowBack,
  School,
  LocationOn,
  Star,
  TrendingUp,
  Money,
  Group,
  Language,
  Public,
  CheckCircle,
  Search,
  FilterList,
  BookmarkBorder,
  Bookmark,
  Launch,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const UniversityChoice = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [bookmarkedUniversities, setBookmarkedUniversities] = useState(
    new Set()
  );

  const categories = [
    "All Universities",
    "Top Ranked",
    "By Field",
    "Admission Requirements",
    "Scholarships",
  ];

  const fields = [
    { id: "engineering", name: "Engineering", icon: "🔧", color: "#3b82f6" },
    { id: "medicine", name: "Medicine", icon: "🏥", color: "#ef4444" },
    { id: "business", name: "Business", icon: "💼", color: "#059669" },
    {
      id: "computer_science",
      name: "Computer Science",
      icon: "💻",
      color: "#8b5cf6",
    },
    { id: "arts", name: "Arts & Humanities", icon: "🎨", color: "#ec4899" },
    { id: "science", name: "Natural Sciences", icon: "🔬", color: "#10b981" },
    {
      id: "social_science",
      name: "Social Sciences",
      icon: "👥",
      color: "#f59e0b",
    },
    { id: "law", name: "Law", icon: "⚖️", color: "#374151" },
  ];

  const universities = [
    {
      id: 1,
      name: "Stanford University",
      location: "California, USA",
      ranking: 3,
      rating: 4.9,
      tuition: "$56,169",
      acceptanceRate: "4%",
      studentCount: "17,000",
      type: "Private",
      logo: "S",
      color: "#8C1515",
      fields: ["engineering", "computer_science", "business"],
      programs: [
        "Computer Science",
        "Electrical Engineering",
        "MBA",
        "Artificial Intelligence",
      ],
      highlights: [
        "Top-ranked Computer Science program",
        "Strong industry connections in Silicon Valley",
        "Excellent research opportunities",
        "High graduate employment rate",
      ],
      requirements: {
        gpa: "3.9+",
        sat: "1470-1570",
        toefl: "100+",
        essays: "3 required",
        recommendations: "2 academic",
      },
      scholarships: [
        "Need-based financial aid",
        "Merit scholarships available",
        "Knight-Hennessy Scholars Program",
      ],
    },
    {
      id: 2,
      name: "Harvard University",
      location: "Massachusetts, USA",
      ranking: 2,
      rating: 4.8,
      tuition: "$54,002",
      acceptanceRate: "3%",
      studentCount: "23,000",
      type: "Private",
      logo: "H",
      color: "#A51C30",
      fields: ["medicine", "law", "business"],
      programs: ["Medicine", "Law", "Business Administration", "Public Health"],
      highlights: [
        "Oldest university in the US",
        "World-renowned faculty",
        "Extensive alumni network",
        "Leading research institution",
      ],
      requirements: {
        gpa: "4.0",
        sat: "1460-1580",
        toefl: "100+",
        essays: "5 required",
        recommendations: "2 academic + 1 personal",
      },
      scholarships: [
        "Harvard Financial Aid Initiative",
        "Merit-based scholarships",
        "International student aid",
      ],
    },
    {
      id: 3,
      name: "MIT",
      location: "Massachusetts, USA",
      ranking: 1,
      rating: 4.9,
      tuition: "$53,790",
      acceptanceRate: "7%",
      studentCount: "11,500",
      type: "Private",
      logo: "MIT",
      color: "#750014",
      fields: ["engineering", "computer_science", "science"],
      programs: [
        "Mechanical Engineering",
        "Computer Science",
        "Physics",
        "Mathematics",
      ],
      highlights: [
        "Leading technology and engineering school",
        "Strong innovation and entrepreneurship culture",
        "Cutting-edge research facilities",
        "High startup founding rate among graduates",
      ],
      requirements: {
        gpa: "3.9+",
        sat: "1520-1580",
        toefl: "90+",
        essays: "4 required",
        recommendations: "2 academic",
      },
      scholarships: [
        "Need-based financial aid",
        "International student support",
        "Research assistantships",
      ],
    },
    {
      id: 4,
      name: "University of Oxford",
      location: "Oxford, UK",
      ranking: 4,
      rating: 4.8,
      tuition: "£9,250-£37,510",
      acceptanceRate: "17%",
      studentCount: "24,000",
      type: "Public",
      logo: "OX",
      color: "#002147",
      fields: ["arts", "medicine", "law"],
      programs: [
        "Philosophy, Politics & Economics",
        "Medicine",
        "English Literature",
        "History",
      ],
      highlights: [
        "One of the oldest universities in the world",
        "Tutorial system of teaching",
        "Beautiful historic campus",
        "Strong tradition in humanities",
      ],
      requirements: {
        gpa: "AAA A-levels",
        sat: "Not required",
        toefl: "100+",
        essays: "Personal statement",
        recommendations: "1 academic reference",
      },
      scholarships: [
        "Rhodes Scholarships",
        "Clarendon Fund",
        "Various college scholarships",
      ],
    },
    {
      id: 5,
      name: "University of Toronto",
      location: "Toronto, Canada",
      ranking: 25,
      rating: 4.6,
      tuition: "CAD $58,160",
      acceptanceRate: "43%",
      studentCount: "97,000",
      type: "Public",
      logo: "UT",
      color: "#002A5C",
      fields: ["engineering", "medicine", "arts"],
      programs: [
        "Engineering Science",
        "Computer Science",
        "Medicine",
        "Rotman Commerce",
      ],
      highlights: [
        "Top research university in Canada",
        "Diverse international community",
        "Strong co-op programs",
        "Located in major financial center",
      ],
      requirements: {
        gpa: "85%+",
        sat: "1200+",
        toefl: "100+",
        essays: "Supplementary application",
        recommendations: "Not required",
      },
      scholarships: [
        "International scholarships",
        "Lester B. Pearson Scholarships",
        "President's Scholars of Excellence",
      ],
    },
    {
      id: 6,
      name: "National University of Singapore",
      location: "Singapore",
      ranking: 11,
      rating: 4.5,
      tuition: "S$17,550-S$58,450",
      acceptanceRate: "5%",
      studentCount: "40,000",
      type: "Public",
      logo: "NUS",
      color: "#003D7A",
      fields: ["engineering", "business", "computer_science"],
      programs: [
        "Computer Engineering",
        "Business Administration",
        "Medicine",
        "Data Science",
      ],
      highlights: [
        "Leading university in Asia",
        "Strong industry partnerships",
        "Gateway to Asian markets",
        "Excellent job placement rates",
      ],
      requirements: {
        gpa: "AAA/AAB A-levels",
        sat: "1350+",
        toefl: "92+",
        essays: "Personal statement",
        recommendations: "2 academic",
      },
      scholarships: [
        "ASEAN Undergraduate Scholarship",
        "Merit scholarships",
        "Financial aid for international students",
      ],
    },
  ];

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.programs.some((program) =>
        program.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => uni.fields.includes(filter));

    return matchesSearch && matchesFilters;
  });

  const handleBookmark = (universityId) => {
    setBookmarkedUniversities((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(universityId)) {
        newBookmarks.delete(universityId);
      } else {
        newBookmarks.add(universityId);
      }
      return newBookmarks;
    });
  };

  const handleFilterToggle = (fieldId) => {
    setSelectedFilters((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const renderUniversityCard = (university) => (
    <Card
      key={university.id}
      className={`${componentStyles.card} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      sx={{ borderRadius: 3, height: "100%" }}
    >
      <CardContent className="p-6">
        {/* Header */}
        <Box className="flex items-start justify-between mb-4">
          <Box className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: university.color,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {university.logo}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                className={`font-bold ${themeClasses.text.primary}`}
              >
                {university.name}
              </Typography>
              <Box className="flex items-center gap-1">
                <LocationOn sx={{ fontSize: 16, color: "gray" }} />
                <Typography
                  variant="body2"
                  className={themeClasses.text.secondary}
                >
                  {university.location}
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={() => handleBookmark(university.id)}
            size="small"
          >
            {bookmarkedUniversities.has(university.id) ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>
        </Box>

        {/* Rankings and Stats */}
        <Box className="grid grid-cols-2 gap-4 mb-4">
          <Box className="text-center">
            <Typography
              variant="h6"
              className={`font-bold ${themeClasses.brand.primary}`}
            >
              #{university.ranking}
            </Typography>
            <Typography
              variant="caption"
              className={themeClasses.text.secondary}
            >
              World Ranking
            </Typography>
          </Box>
          <Box className="text-center">
            <Box className="flex items-center justify-center gap-1">
              <Rating
                value={university.rating}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography variant="body2" className={themeClasses.text.primary}>
                {university.rating}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              className={themeClasses.text.secondary}
            >
              Rating
            </Typography>
          </Box>
        </Box>

        {/* Key Info */}
        <Box className="space-y-2 mb-4">
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Tuition:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.tuition}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Acceptance Rate:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.acceptanceRate}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Students:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.studentCount}
            </Typography>
          </Box>
        </Box>

        {/* Fields */}
        <Box className="mb-4">
          <Typography
            variant="body2"
            className={`font-medium mb-2 ${themeClasses.text.primary}`}
          >
            Strong Fields:
          </Typography>
          <Box className="flex flex-wrap gap-1">
            {university.fields.map((fieldId) => {
              const field = fields.find((f) => f.id === fieldId);
              return (
                <Chip
                  key={fieldId}
                  label={field?.name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem" }}
                />
              );
            })}
          </Box>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          endIcon={<Launch />}
          className="mt-2"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/pre-university")}
            startIcon={<ArrowBack />}
            className={componentStyles.button.secondary}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            className={`font-bold ${themeClasses.text.primary}`}
          >
            University Choice Guide
          </Typography>
          <Box /> {/* Spacer */}
        </Box>

        {/* Search and Filters */}
        <Paper
          className={`p-6 mb-8 ${componentStyles.card}`}
          sx={{ borderRadius: 3 }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search universities, programs, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className={themeClasses.text.muted} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="body2"
                  className={`font-medium mb-2 ${themeClasses.text.primary}`}
                >
                  Filter by Field:
                </Typography>
                <Box className="flex flex-wrap gap-1">
                  {fields.slice(0, 4).map((field) => (
                    <Chip
                      key={field.id}
                      label={field.name}
                      clickable
                      variant={
                        selectedFilters.includes(field.id)
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        selectedFilters.includes(field.id)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleFilterToggle(field.id)}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Box className="mb-6">
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Universities Grid */}
        {selectedTab === 0 && (
          <Box>
            <Box className="flex items-center justify-between mb-6">
              <Typography
                variant="h5"
                className={`font-semibold ${themeClasses.text.primary}`}
              >
                All Universities ({filteredUniversities.length})
              </Typography>
              {selectedFilters.length > 0 && (
                <Button
                  onClick={() => setSelectedFilters([])}
                  size="small"
                  variant="outlined"
                >
                  Clear Filters
                </Button>
              )}
            </Box>

            <Grid container spacing={4}>
              {filteredUniversities.map((university) => (
                <Grid item xs={12} md={6} lg={4} key={university.id}>
                  {renderUniversityCard(university)}
                </Grid>
              ))}
            </Grid>

            {filteredUniversities.length === 0 && (
              <Paper className={`p-8 text-center ${componentStyles.card}`}>
                <Typography
                  variant="h6"
                  className={`mb-4 ${themeClasses.text.primary}`}
                >
                  No universities found
                </Typography>
                <Typography
                  variant="body1"
                  className={themeClasses.text.secondary}
                >
                  Try adjusting your search terms or filters.
                </Typography>
              </Paper>
            )}
          </Box>
        )}

        {/* Top Ranked Tab */}
        {selectedTab === 1 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Top Ranked Universities
            </Typography>
            <Grid container spacing={4}>
              {universities
                .sort((a, b) => a.ranking - b.ranking)
                .slice(0, 6)
                .map((university) => (
                  <Grid item xs={12} md={6} lg={4} key={university.id}>
                    {renderUniversityCard(university)}
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {/* By Field Tab */}
        {selectedTab === 2 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Universities by Field
            </Typography>
            <Grid container spacing={3}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={field.id}>
                  <Card
                    className={`cursor-pointer ${componentStyles.card} hover:shadow-lg transition-all duration-300`}
                    onClick={() => {
                      setSelectedFilters([field.id]);
                      setSelectedTab(0);
                    }}
                    sx={{ borderRadius: 3 }}
                  >
                    <CardContent className="text-center p-4">
                      <Typography variant="h3" className="mb-2">
                        {field.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        className={`font-semibold ${themeClasses.text.primary}`}
                      >
                        {field.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={themeClasses.text.secondary}
                      >
                        {
                          universities.filter((uni) =>
                            uni.fields.includes(field.id)
                          ).length
                        }{" "}
                        universities
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Requirements Tab */}
        {selectedTab === 3 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Admission Requirements
            </Typography>
            <Grid container spacing={4}>
              {universities.slice(0, 3).map((university) => (
                <Grid item xs={12} md={6} lg={4} key={university.id}>
                  <Card
                    className={componentStyles.card}
                    sx={{ borderRadius: 3 }}
                  >
                    <CardContent className="p-6">
                      <Box className="flex items-center gap-3 mb-4">
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: university.color,
                            color: "white",
                          }}
                        >
                          {university.logo}
                        </Avatar>
                        <Typography
                          variant="h6"
                          className={`font-bold ${themeClasses.text.primary}`}
                        >
                          {university.name}
                        </Typography>
                      </Box>

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="GPA Requirement"
                            secondary={university.requirements.gpa}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <School color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="SAT Score"
                            secondary={university.requirements.sat}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Language color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="TOEFL/IELTS"
                            secondary={university.requirements.toefl}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Action Buttons */}
        <Box className="text-center mt-12">
          <Button
            onClick={() => navigate("/pre-university/career-choice")}
            variant="outlined"
            size="large"
            className="mr-4"
          >
            Explore Careers
          </Button>
          <Button
            onClick={() => navigate("/pre-university")}
            variant="contained"
            size="large"
            className={componentStyles.button.primary}
          >
            Back to Overview
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UniversityChoice;
