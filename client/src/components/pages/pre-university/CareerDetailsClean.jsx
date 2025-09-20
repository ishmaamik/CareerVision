import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Button,
  Skeleton,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Collapse,
  Divider,
  Rating,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  School,
  ExpandMore,
  ExpandLess,
  OpenInNew,
} from "@mui/icons-material";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";
import { mockCareers } from "../../../api/career/mockCareerData";

const CareerDetails = () => {
  const { careerTitle } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  const [career, setCareer] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [expandedUniversity, setExpandedUniversity] = useState(null);

  const apiKey = "AIzaSyAVtxsRpmkD6nw9zk2RSPC_Ruj-l2VJwgA";

  // Mock university data for Bangladesh
  const bangladeshiUniversities = [
    {
      id: 1,
      name: "University of Dhaka",
      ranking: 1,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/University_of_Dhaka_logo.svg/1200px-University_of_Dhaka_logo.svg.png",
      studentReview: {
        rating: 4.5,
        review:
          "Excellent program with experienced faculty and comprehensive curriculum.",
        reviewer: "Rahul Ahmed",
        year: "Final Year Student",
      },
      syllabusLink: "https://du.ac.bd/academic/department_item/CSE",
      location: "Dhaka",
      type: "Public",
      description:
        "One of the oldest and most prestigious universities in Bangladesh with excellent academic programs.",
    },
    {
      id: 2,
      name: "BUET",
      ranking: 2,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Bangladesh_University_of_Engineering_and_Technology_logo.png/1200px-Bangladesh_University_of_Engineering_and_Technology_logo.png",
      studentReview: {
        rating: 4.8,
        review:
          "Top-tier engineering education with cutting-edge research facilities.",
        reviewer: "Fatima Khan",
        year: "Graduate",
      },
      syllabusLink: "https://www.buet.ac.bd/web/#/department/CSE/6",
      location: "Dhaka",
      type: "Public",
      description:
        "Leading engineering university known for its rigorous academic standards and research excellence.",
    },
    {
      id: 3,
      name: "North South University",
      ranking: 3,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/North_South_University_logo.png/1200px-North_South_University_logo.png",
      studentReview: {
        rating: 4.3,
        review: "Modern curriculum with industry connections.",
        reviewer: "Sakib Rahman",
        year: "Alumni",
      },
      syllabusLink: "https://www.northsouth.edu/academic/shls/cse/",
      location: "Dhaka",
      type: "Private",
      description:
        "Private university with strong industry partnerships and modern facilities.",
    },
    {
      id: 4,
      name: "BRAC University",
      ranking: 4,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/BRAC_University_logo.png/1200px-BRAC_University_logo.png",
      studentReview: {
        rating: 4.2,
        review:
          "Well-structured program with focus on both theory and practice.",
        reviewer: "Nadia Sultana",
        year: "3rd Year Student",
      },
      syllabusLink:
        "https://www.bracu.ac.bd/academics/departments/computer-science-and-engineering",
      location: "Dhaka",
      type: "Private",
      description:
        "Well-known private university with comprehensive programs and active student life.",
    },
    {
      id: 5,
      name: "Independent University, Bangladesh",
      ranking: 5,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Independent_University_Bangladesh_logo.png/1200px-Independent_University_Bangladesh_logo.png",
      studentReview: {
        rating: 4.1,
        review: "Small class sizes ensure personalized attention.",
        reviewer: "Tanvir Hasan",
        year: "Alumni",
      },
      syllabusLink:
        "https://www.iub.edu.bd/academics/schools-and-departments/seis/cse",
      location: "Dhaka",
      type: "Private",
      description:
        "Private university focusing on personalized education with small class sizes.",
    },
  ];

  useEffect(() => {
    // Find the career from mock data
    const foundCareer = mockCareers.find(
      (c) => c.careerTitle.toLowerCase().replace(/\s+/g, "-") === careerTitle
    );

    if (foundCareer) {
      setCareer(foundCareer);
      // Fetch related videos
      fetchVideos(`${foundCareer.careerTitle} career guide tutorial`);
    }
    setLoading(false);
  }, [careerTitle]);

  const fetchVideos = async (query) => {
    setVideoLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=12&key=${apiKey}`
      );
      setVideos(response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setVideos([]);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleUniversityClick = (universityId) => {
    setExpandedUniversity(
      expandedUniversity === universityId ? null : universityId
    );
  };

  if (loading) {
    return (
      <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ borderRadius: 3, mb: 4 }}
          />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (!career) {
    return (
      <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h4"
              sx={{ color: isDarkMode ? "#94a3b8" : "#64748b", mb: 2 }}
            >
              Career not found
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/pre-university/career-choice")}
              sx={{ mt: 2 }}
            >
              Back to Career Choice
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header - Smaller and Simpler */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton
              onClick={() => navigate("/pre-university/career-choice")}
              sx={{
                mr: 2,
                color: isDarkMode ? "#e2e8f0" : "#2d3748",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#4a5568" : "#f7fafc",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? "#f8fafc" : "#1e293b",
              }}
            >
              {career.careerTitle}
            </Typography>
          </Box>

          {/* Interest Tags - Smaller */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {career.interestTags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? "#4b5563" : "#f1f5f9",
                  color: isDarkMode ? "#e5e7eb" : "#374151",
                  fontSize: "0.8rem",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Three Sections Side by Side */}
        <Grid container spacing={3}>
          {/* Section 1: Subject Review */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                background: isDarkMode ? "#1e293b" : "#ffffff",
                border: isDarkMode ? "1px solid #374151" : "1px solid #e2e8f0",
                height: "500px",
                overflow: "auto",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? "#f8fafc" : "#1e293b",
                  fontWeight: 600,
                  mb: 3,
                  fontSize: "1.1rem",
                }}
              >
                Subject Review
              </Typography>

              {/* Overview */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? "#e2e8f0" : "#334155",
                    lineHeight: 1.5,
                    fontSize: "0.8rem",
                  }}
                >
                  {career.detailedDescription}
                </Typography>
              </Box>

              {/* Benefits */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  Benefits
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? "#e2e8f0" : "#334155",
                    lineHeight: 1.5,
                    fontSize: "0.8rem",
                  }}
                >
                  {career.benefits}
                </Typography>
              </Box>

              {/* Ideal For */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  Ideal For
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? "#e2e8f0" : "#334155",
                    lineHeight: 1.5,
                    fontSize: "0.8rem",
                  }}
                >
                  {career.idealCandidates}
                </Typography>
              </Box>

              {/* Required Subjects */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isDarkMode ? "#f1f5f9" : "#1e293b",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  Required Subjects
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {career.recommendedSubjects?.map((subject, index) => (
                    <Chip
                      key={index}
                      label={subject}
                      size="small"
                      sx={{
                        backgroundColor: isDarkMode ? "#4b5563" : "#f1f5f9",
                        color: isDarkMode ? "#e5e7eb" : "#374151",
                        fontSize: "0.75rem",
                        height: "24px",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Section 2: Educational Videos */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                background: isDarkMode ? "#1e293b" : "#ffffff",
                border: isDarkMode ? "1px solid #374151" : "1px solid #e2e8f0",
                height: "500px",
                overflow: "auto",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? "#f8fafc" : "#1e293b",
                  fontWeight: 600,
                  mb: 3,
                  fontSize: "1.1rem",
                }}
              >
                Educational Videos
              </Typography>

              {videoLoading ? (
                <Grid container spacing={2}>
                  {Array.from(new Array(4)).map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={80}
                        sx={{ borderRadius: 1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  {videos.slice(0, 5).map((video) => (
                    <Grid item xs={12} key={video.id.videoId}>
                      <Card
                        sx={{
                          borderRadius: 1,
                          backgroundColor: isDarkMode ? "#374151" : "#f8fafc",
                          border: isDarkMode
                            ? "1px solid #4b5563"
                            : "1px solid #e2e8f0",
                          transition: "all 0.2s ease",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: isDarkMode
                              ? "0 4px 12px rgba(0,0,0,0.3)"
                              : "0 4px 12px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", height: "80px" }}>
                          <CardMedia
                            component="iframe"
                            sx={{
                              width: "35%",
                              minWidth: "80px",
                            }}
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={video.snippet.title}
                          />
                          <CardContent
                            sx={{
                              p: 1.5,
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: isDarkMode ? "#f8fafc" : "#1e293b",
                                fontWeight: 600,
                                lineHeight: 1.2,
                                fontSize: "0.75rem",
                                mb: 0.5,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {video.snippet.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: isDarkMode ? "#9ca3af" : "#6b7280",
                                fontSize: "0.65rem",
                              }}
                            >
                              {video.snippet.channelTitle}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>

          {/* Section 3: Universities */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                background: isDarkMode ? "#1e293b" : "#ffffff",
                border: isDarkMode ? "1px solid #374151" : "1px solid #e2e8f0",
                height: "500px",
                overflow: "auto",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: isDarkMode ? "#f8fafc" : "#1e293b",
                  fontWeight: 600,
                  mb: 3,
                  fontSize: "1.1rem",
                }}
              >
                Top Universities
              </Typography>

              <List sx={{ width: "100%", p: 0 }}>
                {bangladeshiUniversities.slice(0, 5).map((university) => (
                  <Box key={university.id} sx={{ mb: 2 }}>
                    <ListItemButton
                      onClick={() => handleUniversityClick(university.id)}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: isDarkMode ? "#374151" : "#f8fafc",
                        border: isDarkMode
                          ? "1px solid #4b5563"
                          : "1px solid #e2e8f0",
                        "&:hover": {
                          backgroundColor: isDarkMode ? "#4b5563" : "#f1f5f9",
                        },
                        p: 1.5,
                      }}
                    >
                      <Avatar
                        src={university.logo}
                        sx={{ width: 30, height: 30, mr: 1.5 }}
                      />
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: isDarkMode ? "#f8fafc" : "#1e293b",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              lineHeight: 1.2,
                              mb: 0.5,
                            }}
                          >
                            {university.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDarkMode ? "#9ca3af" : "#6b7280",
                              fontSize: "0.65rem",
                            }}
                          >
                            Rank #{university.ranking} • {university.location}
                          </Typography>
                        }
                      />
                      {expandedUniversity === university.id ? (
                        <ExpandLess sx={{ fontSize: 16 }} />
                      ) : (
                        <ExpandMore sx={{ fontSize: 16 }} />
                      )}
                    </ListItemButton>

                    <Collapse
                      in={expandedUniversity === university.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          ml: 1,
                          mt: 1,
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: isDarkMode ? "#334155" : "#ffffff",
                          border: isDarkMode
                            ? "1px solid #475569"
                            : "1px solid #e2e8f0",
                        }}
                      >
                        {/* Student Review */}
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: isDarkMode ? "#f8fafc" : "#1e293b",
                              fontWeight: 600,
                              mb: 1,
                              fontSize: "0.8rem",
                            }}
                          >
                            Student Review
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Rating
                              value={university.studentReview.rating}
                              readOnly
                              precision={0.1}
                              size="small"
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: isDarkMode ? "#9ca3af" : "#6b7280",
                                ml: 1,
                                fontSize: "0.65rem",
                              }}
                            >
                              ({university.studentReview.rating}/5)
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDarkMode ? "#d1d5db" : "#374151",
                              fontStyle: "italic",
                              mb: 1,
                              lineHeight: 1.3,
                              fontSize: "0.7rem",
                            }}
                          >
                            "{university.studentReview.review}"
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDarkMode ? "#9ca3af" : "#6b7280",
                              fontSize: "0.65rem",
                            }}
                          >
                            - {university.studentReview.reviewer}
                          </Typography>
                        </Box>

                        <Divider
                          sx={{
                            my: 1.5,
                            borderColor: isDarkMode ? "#475569" : "#e2e8f0",
                          }}
                        />

                        {/* Syllabus Link */}
                        <Button
                          variant="outlined"
                          href={university.syllabusLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<OpenInNew sx={{ fontSize: 12 }} />}
                          size="small"
                          sx={{
                            borderColor: isDarkMode ? "#6b7280" : "#9ca3af",
                            color: isDarkMode ? "#9ca3af" : "#6b7280",
                            fontSize: "0.7rem",
                            p: "4px 8px",
                            "&:hover": {
                              borderColor: isDarkMode ? "#9ca3af" : "#6b7280",
                              backgroundColor: isDarkMode
                                ? "#374151"
                                : "#f8fafc",
                            },
                          }}
                        >
                          View Syllabus
                        </Button>
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CareerDetails;
