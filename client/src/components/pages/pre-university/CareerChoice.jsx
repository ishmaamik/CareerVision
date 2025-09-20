import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Skeleton,
} from "@mui/material";
import { ArrowBack, Search, FilterList } from "@mui/icons-material";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";
import { mockCareers } from "../../../api/career/mockCareerData";
import CareerCard from "../../cards/CareerCard";

const CareerChoice = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading careers
  useEffect(() => {
    const loadCareers = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCareers(mockCareers);
        setLoading(false);
      }, 1000);
    };
    loadCareers();
  }, []);

  // Get unique interest tags for filter options
  const filterOptions = useMemo(() => {
    const allTags = careers.flatMap((career) => career.interestTags);
    const uniqueTags = [...new Set(allTags)];
    return ["all", ...uniqueTags.slice(0, 10)]; // Limit to first 10 unique tags
  }, [careers]);

  // Filter careers based on search and filter
  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesSearch =
        career.careerTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.interestTags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilter =
        selectedFilter === "all" ||
        career.interestTags.some((tag) =>
          tag.toLowerCase().includes(selectedFilter.toLowerCase())
        );

      return matchesSearch && matchesFilter;
    });
  }, [careers, searchTerm, selectedFilter]);

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton
              onClick={() => navigate("/pre-university")}
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
              variant="h3"
              className={`font-bold ${themeClasses.text.primary}`}
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Explore Career Paths
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? "#94a3b8" : "#64748b",
              mb: 4,
              maxWidth: "600px",
              fontWeight: 400,
            }}
          >
            Find the perfect career that matches your interests and skills.
          </Typography>

          {/* Search and Filter Section */}
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              background: isDarkMode ? "#2d3748" : "#ffffff",
              border: isDarkMode ? "1px solid #4a5568" : "1px solid #e2e8f0",
              mb: { xs: 3, md: 4 },
            }}
          >
            <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search careers, skills, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search
                          sx={{ color: isDarkMode ? "#94a3b8" : "#64748b" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                      "& fieldset": {
                        borderColor: isDarkMode ? "#475569" : "#e2e8f0",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? "#5a6578" : "#cbd5e0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6366f1",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? "#f1f5f9" : "#1e293b",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <FilterList
                    sx={{ mr: 2, color: isDarkMode ? "#94a3b8" : "#64748b" }}
                  />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {filterOptions.slice(0, 5).map((option) => (
                      <Chip
                        key={option}
                        label={option === "all" ? "All" : option}
                        onClick={() => setSelectedFilter(option)}
                        variant={
                          selectedFilter === option ? "filled" : "outlined"
                        }
                        size="small"
                        sx={{
                          backgroundColor:
                            selectedFilter === option
                              ? "#6366f1"
                              : "transparent",
                          color:
                            selectedFilter === option
                              ? "white"
                              : isDarkMode
                              ? "#f1f5f9"
                              : "#1e293b",
                          borderColor: isDarkMode ? "#475569" : "#e2e8f0",
                          "&:hover": {
                            backgroundColor:
                              selectedFilter === option
                                ? "#5b5bd6"
                                : isDarkMode
                                ? "#475569"
                                : "#f8fafc",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Career Cards Grid */}
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 3 }}
            sx={{ justifyContent: "center" }}
          >
            {loading
              ? // Loading skeletons
                Array.from(new Array(9)).map((_, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ maxWidth: "420px" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={280}
                      sx={{ borderRadius: 3, aspectRatio: "4/3" }}
                    />
                  </Grid>
                ))
              : filteredCareers.slice(0, 9).map((career) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={career.id}
                    sx={{ maxWidth: "420px" }}
                  >
                    <CareerCard career={career} />
                  </Grid>
                ))}
          </Grid>
        </Box>

        {/* No Results */}
        {!loading && filteredCareers.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: isDarkMode ? "#a0aec0" : "#4a5568",
                mb: 2,
              }}
            >
              No careers found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? "#a0aec0" : "#4a5568",
              }}
            >
              Try adjusting your search terms or filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CareerChoice;
