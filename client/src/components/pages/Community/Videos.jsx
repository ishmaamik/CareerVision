import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import { FaVideo } from "react-icons/fa";

// Category mapping for search queries
const CATEGORY_SEARCH_TERMS = {
  All: "career development tutorials",
  "Job Related": "job interview tips career advice",
  "Tech & Programming": "programming tutorials coding bootcamp",
  "Business & Finance": "business finance entrepreneurship",
  "Education & Learning": "online learning study tips education",
  "Career Growth": "career growth professional development",
  "Psychology & Wellness": "mental health workplace wellness",
};

const Videos = ({ searchTerm = "", category = "All" }) => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("programming tutorials");
  const [loading, setLoading] = useState(true);
  const [isMounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const apiKey = "AIzaSyAVtxsRpmkD6nw9zk2RSPC_Ruj-l2VJwgA";

  const fetchVideos = async (query) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(searchQuery);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Effect to fetch videos when category changes
  useEffect(() => {
    if (isMounted) {
      const searchTerm =
        CATEGORY_SEARCH_TERMS[category] || "career development tutorials";
      setSearchQuery(searchTerm);
    }
  }, [category, isMounted]);

  // Effect to filter videos when searchTerm changes
  useEffect(() => {
    if (searchTerm && searchTerm.trim() && isMounted) {
      const filteredQuery = `${searchTerm} ${
        CATEGORY_SEARCH_TERMS[category] || ""
      }`.trim();
      setSearchQuery(filteredQuery);
    }
  }, [searchTerm, category, isMounted]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchVideos(searchQuery.trim());
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 6,
          mt: 8,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><pattern id=%22grain%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22><circle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22%23ffffff%22 opacity=%220.1%22/></pattern></defs><rect width=%22100%22 height=%22100%22 fill=%22url(%23grain)%22/></svg>') repeat",
            opacity: 0.3,
          },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              Career Videos
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.95, 
                mb: 4,
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.4,
              }}
            >
              Discover educational content and tutorials to advance your career journey
            </Typography>
          </Box>

          {/* Search Section */}
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            maxWidth: 700,
            mx: "auto",
            flexDirection: { xs: "column", sm: "row" },
          }}>
            <TextField
              placeholder="Search for career topics, skills, tutorials..."
              size="large"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: 3,
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "#666", mr: 1, fontSize: 24 }} />,
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                px: 5,
                py: 2,
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                "&:hover": { 
                  background: "linear-gradient(135deg, #e55a2e 0%, #e8851c 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(255,107,53,0.4)",
                },
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.3s ease",
                minWidth: { xs: "100%", sm: "140px" },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
              opacity: isMounted ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                backgroundColor: "white",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" color="primary">
                Loading Amazing Videos...
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease-in-out",
            }}
          >
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <Box
                  key={index}
                  onClick={() => handleVideoClick(video)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    height: "fit-content",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                      borderColor: "#ff6b35",
                    },
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <img
                      src={
                        video.snippet.thumbnails.maxres?.url ||
                        video.snippet.thumbnails.high?.url ||
                        video.snippet.thumbnails.medium.url
                      }
                      alt={video.snippet.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(102,126,234,0.8) 0%, rgba(118,75,162,0.8) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.95)",
                          borderRadius: "50%",
                          p: 2.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                          transform: "scale(0.8)",
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "scale(1)" },
                        }}
                      >
                        <PlayIcon sx={{ fontSize: 36, color: "#ff6b35" }} />
                      </Box>
                    </Box>
                    
                    {/* Duration Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      HD
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.4,
                        fontSize: "1rem",
                        color: "#2d3748",
                        minHeight: "2.8rem",
                      }}
                    >
                      {video.snippet.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.5,
                        fontSize: "0.875rem",
                        minHeight: "2.6rem",
                      }}
                    >
                      {video.snippet.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2.5,
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Chip
                        label={video.snippet.channelTitle}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: "0.7rem",
                          height: "24px",
                          borderColor: "#e2e8f0",
                          color: "#64748b",
                          maxWidth: "140px",
                          "& .MuiChip-label": {
                            px: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {formatDate(video.snippet.publishedAt)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayIcon />}
                      sx={{
                        background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                        "&:hover": { 
                          background: "linear-gradient(135deg, #e55a2e 0%, #e8851c 100%)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(255,107,53,0.3)",
                        },
                        borderRadius: 2.5,
                        py: 1.2,
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textTransform: "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Watch Now
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 400,
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 6,
                    backgroundColor: "white",
                    borderRadius: 3,
                    boxShadow: 3,
                    maxWidth: 500,
                  }}
                >
                  <FaVideo
                    size={48}
                    color="#ccc"
                    style={{ marginBottom: 16 }}
                  />
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    No Videos Found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try searching for different keywords or topics
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Video Player Modal */}
      <Dialog
        open={isPlayerOpen}
        onClose={handleClosePlayer}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 4, 
            overflow: "hidden",
            maxHeight: "95vh",
            margin: 2,
          },
        }}
      >
        <Box sx={{ position: "relative", backgroundColor: "#000" }}>
          <IconButton
            onClick={handleClosePlayer}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "white",
              zIndex: 10,
              width: 48,
              height: 48,
              "&:hover": { 
                backgroundColor: "rgba(255,107,53,0.9)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>

          <DialogContent sx={{ p: 0 }}>
            {selectedVideo && (
              <>
                {/* Embedded YouTube Player */}
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%",
                    backgroundColor: "#000",
                    minHeight: "400px",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1&rel=0&modestbranding=1&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1`}
                    title={selectedVideo.snippet.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Box>

                {/* Video Info */}
                <Box 
                  sx={{ 
                    p: 4, 
                    backgroundColor: "white",
                    borderTop: "4px solid #ff6b35",
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      color: "#2d3748",
                      lineHeight: 1.3,
                    }}
                  >
                    {selectedVideo.snippet.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Chip
                      label={selectedVideo.snippet.channelTitle}
                      sx={{
                        backgroundColor: "#ff6b35",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        px: 2,
                        py: 1,
                        height: "auto",
                        "&:hover": {
                          backgroundColor: "#e55a2e",
                        }
                      }}
                    />
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      Published: {formatDate(selectedVideo.snippet.publishedAt)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: "1rem",
                      maxHeight: "120px",
                      overflow: "auto",
                      pr: 1,
                    }}
                  >
                    {selectedVideo.snippet.description || "No description available for this video."}
                  </Typography>
                </Box>
              </>
            )}
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default Videos;
