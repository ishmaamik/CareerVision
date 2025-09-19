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

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("programming");
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
        )}&type=video&maxResults=9&key=${apiKey}`
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
  }, []); // Only run on mount

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
          py: 4,
          mt: 10,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Career Videos
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Discover educational content to advance your career
          </Typography>

          {/* Search Section */}
          <Box sx={{ display: "flex", gap: 2, maxWidth: 600 }}>
            <TextField
              placeholder="Search for career topics, skills, tutorials..."
              size="medium"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 2,
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: "#ff6b35",
                "&:hover": { backgroundColor: "#e55a2e" },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 4 }}>
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
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 3,
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
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
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
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.95)",
                          borderRadius: "50%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PlayIcon sx={{ fontSize: 32, color: "#ff6b35" }} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.3,
                      }}
                    >
                      {video.snippet.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.4,
                      }}
                    >
                      {video.snippet.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label={video.snippet.channelTitle}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(video.snippet.publishedAt)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayIcon />}
                      sx={{
                        backgroundColor: "#ff6b35",
                        "&:hover": { backgroundColor: "#e55a2e" },
                        borderRadius: 2,
                        py: 1,
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
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, overflow: "hidden" },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={handleClosePlayer}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              zIndex: 1,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent sx={{ p: 0 }}>
            {selectedVideo && (
              <>
                {/* Embedded YouTube Player */}
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%",
                    backgroundColor: "black",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1&rel=0`}
                    title={selectedVideo.snippet.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>

                {/* Video Info */}
                <Box sx={{ p: 3, backgroundColor: "white" }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {selectedVideo.snippet.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={selectedVideo.snippet.channelTitle}
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Published: {formatDate(selectedVideo.snippet.publishedAt)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {selectedVideo.snippet.description}
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
