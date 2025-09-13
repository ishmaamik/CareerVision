import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Videocam,
  VideocamOff,
  Analytics,
  Mood,
  TrendingUp,
  Warning,
  CheckCircle,
  Psychology,
  CameraAlt,
  Timeline,
  Insights,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components for enhanced UI
const VideoContainer = styled(Box)(({ theme, isActive }) => ({
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  background: isActive
    ? "linear-gradient(145deg, #667eea 0%, #764ba2 100%)"
    : "linear-gradient(145deg, #f3f4f6 0%, #e5e7eb 100%)",
  padding: theme.spacing(1),
  boxShadow: isActive
    ? "0 20px 40px rgba(102, 126, 234, 0.3)"
    : "0 10px 25px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 25px 50px rgba(102, 126, 234, 0.4)",
  },
}));

const StyledVideo = styled("video")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: theme.spacing(1.5),
  background: "#000",
}));

const EmotionCard = styled(Card)(({ theme, emotion }) => {
  const getEmotionColor = (emotion) => {
    const colors = {
      happy: "#4ade80",
      sad: "#64748b",
      angry: "#ef4444",
      surprised: "#f59e0b",
      fear: "#8b5cf6",
      disgusted: "#06b6d4",
      neutral: "#6b7280",
    };
    return colors[emotion?.toLowerCase()] || "#6b7280";
  };

  return {
    background: `linear-gradient(135deg, ${getEmotionColor(
      emotion
    )}15 0%, ${getEmotionColor(emotion)}05 100%)`,
    border: `2px solid ${getEmotionColor(emotion)}30`,
    borderRadius: theme.spacing(2),
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: `0 10px 30px ${getEmotionColor(emotion)}20`,
    },
  };
});

const ProgressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  borderRadius: theme.spacing(1.5),
  marginTop: theme.spacing(1),
}));

export default function EmotionCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // State management
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [emotionDetails, setEmotionDetails] = useState({});
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [isRealTimeMode, setIsRealTimeMode] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [error, setError] = useState(null);
  const [interviewMode, setInterviewMode] = useState(false);

  // Emotion configurations
  const emotionConfig = {
    happy: { icon: "😊", color: "#4ade80", label: "Happy" },
    sad: { icon: "😢", color: "#64748b", label: "Sad" },
    angry: { icon: "😠", color: "#ef4444", label: "Angry" },
    surprised: { icon: "😲", color: "#f59e0b", label: "Surprised" },
    fear: { icon: "😨", color: "#8b5cf6", label: "Fear" },
    disgusted: { icon: "🤢", color: "#06b6d4", label: "Disgusted" },
    neutral: { icon: "😐", color: "#6b7280", label: "Neutral" },
  };

  // Initialize camera
  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsVideoActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Camera initialization error:", err);
      setError(
        "Unable to access camera. Please ensure camera permissions are granted."
      );
      setIsVideoActive(false);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsVideoActive(false);
    setIsRealTimeMode(false);
  }, []);

  // Fetch global statistics from enhanced backend
  const fetchGlobalStats = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5001/emotion-stats");
      if (response.ok) {
        const result = await response.json();
        if (result.status === "success" && result.stats) {
          // Store global stats in local storage or state for display
          localStorage.setItem("emotionStats", JSON.stringify(result.stats));
        }
      }
    } catch (err) {
      console.error("Failed to fetch global stats:", err);
    }
  }, []);

  // Capture and analyze emotion
  const analyzeEmotion = useCallback(async () => {
    if (!videoRef.current || !isVideoActive) return;

    setIsAnalyzing(true);
    try {
      // Create canvas for image capture
      const canvas = canvasRef.current || document.createElement("canvas");
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      // Send to enhanced emotion detection API
      const response = await fetch("http://localhost:5001/analyze-emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.error);
      }

      // Update state with enhanced results
      const emotion = data.emotion?.toLowerCase();
      const details = data.details || {};
      const insights = data.insights || {};

      setCurrentEmotion(emotion);
      setEmotionDetails(details);
      setAnalysisCount((prev) => prev + 1);

      // Use enhanced confidence from backend
      const confidence =
        insights.confidence_score || Math.max(...Object.values(details));
      setConfidenceLevel(Math.round(confidence));

      // Add to history with enhanced data
      const timestamp = new Date().toLocaleTimeString();
      setEmotionHistory((prev) => [
        ...prev.slice(-9), // Keep last 10 entries
        {
          emotion,
          confidence,
          timestamp,
          details,
          insights: {
            interview_readiness: insights.interview_readiness,
            stability_score: insights.stability_score,
            recommendations: insights.recommendations || [],
          },
        },
      ]);

      setError(null);

      // Fetch global stats periodically for enhanced analytics
      if (analysisCount % 5 === 0) {
        fetchGlobalStats();
      }
    } catch (err) {
      console.error("Emotion analysis error:", err);
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [isVideoActive, analysisCount, fetchGlobalStats]);

  // Real-time analysis toggle
  const toggleRealTimeMode = useCallback(() => {
    if (isRealTimeMode) {
      clearInterval(intervalRef.current);
      setIsRealTimeMode(false);
    } else {
      setIsRealTimeMode(true);
      intervalRef.current = setInterval(analyzeEmotion, 3000); // Analyze every 3 seconds
    }
  }, [isRealTimeMode, analyzeEmotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      stopCamera();
    };
  }, [stopCamera]);

  // Interview mode insights
  const getInterviewInsights = () => {
    if (emotionHistory.length < 3) return null;

    const recentEmotions = emotionHistory.slice(-5);
    const dominantEmotion = recentEmotions.reduce((acc, curr) => {
      acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
      return acc;
    }, {});

    const mostFrequent = Object.entries(dominantEmotion).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    const avgConfidence =
      recentEmotions.reduce((sum, item) => sum + item.confidence, 0) /
      recentEmotions.length;

    return {
      dominantEmotion: mostFrequent,
      confidence: Math.round(avgConfidence),
      stability: recentEmotions.length >= 3 ? "Good" : "Building...",
      recommendation:
        mostFrequent === "neutral" || mostFrequent === "happy"
          ? "Great composure for interview!"
          : "Try relaxation techniques to appear more confident.",
    };
  };

  const insights = getInterviewInsights();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}
            >
              <Psychology fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                AI Emotion Analysis
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Real-time emotion detection for interview preparation
              </Typography>
            </Box>
          </Box>
          <Box textAlign="right">
            <Typography variant="h6">Analyses: {analysisCount}</Typography>
            <Chip
              label={isVideoActive ? "Camera Active" : "Camera Inactive"}
              color={isVideoActive ? "success" : "error"}
              variant="outlined"
              sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Video Feed Section */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="between"
                mb={2}
              >
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <CameraAlt color="primary" />
                  Video Feed
                </Typography>
                <Box display="flex" gap={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={interviewMode}
                        onChange={(e) => setInterviewMode(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Interview Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isRealTimeMode}
                        onChange={toggleRealTimeMode}
                        disabled={!isVideoActive}
                        color="secondary"
                      />
                    }
                    label="Real-time Analysis"
                  />
                </Box>
              </Box>

              <VideoContainer isActive={isVideoActive}>
                <StyledVideo ref={videoRef} autoPlay playsInline muted />
                {!isVideoActive && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{ transform: "translate(-50%, -50%)" }}
                    textAlign="center"
                  >
                    <VideocamOff
                      sx={{ fontSize: 60, color: "rgba(0,0,0,0.3)", mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Camera is not active
                    </Typography>
                  </Box>
                )}
              </VideoContainer>

              <Box display="flex" gap={2} mt={3} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={isVideoActive ? <VideocamOff /> : <Videocam />}
                  onClick={isVideoActive ? stopCamera : initializeCamera}
                  size="large"
                  sx={{
                    px: 4,
                    background: isVideoActive
                      ? "linear-gradient(45deg, #ef4444, #dc2626)"
                      : "linear-gradient(45deg, #10b981, #059669)",
                    "&:hover": {
                      background: isVideoActive
                        ? "linear-gradient(45deg, #dc2626, #b91c1c)"
                        : "linear-gradient(45deg, #059669, #047857)",
                    },
                  }}
                >
                  {isVideoActive ? "Stop Camera" : "Start Camera"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={
                    isAnalyzing ? <CircularProgress size={20} /> : <Analytics />
                  }
                  onClick={analyzeEmotion}
                  disabled={!isVideoActive || isAnalyzing}
                  size="large"
                  sx={{ px: 4 }}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Emotion Results Section */}
        <Grid item xs={12} md={4}>
          {/* Current Emotion */}
          {currentEmotion && (
            <EmotionCard emotion={currentEmotion} elevation={3} sx={{ mb: 3 }}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Current Emotion
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  mb={2}
                >
                  <Typography fontSize="3rem">
                    {emotionConfig[currentEmotion]?.icon || "❓"}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color:
                          emotionConfig[currentEmotion]?.color || "#6b7280",
                      }}
                    >
                      {emotionConfig[currentEmotion]?.label || currentEmotion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Confidence: {confidenceLevel}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={confidenceLevel}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor:
                        emotionConfig[currentEmotion]?.color || "#6b7280",
                    },
                  }}
                />
              </CardContent>
            </EmotionCard>
          )}

          {/* Interview Insights */}
          {interviewMode && insights && (
            <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={2}
                >
                  <Insights color="primary" />
                  Interview Insights
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Dominant Emotion:</Typography>
                    <Chip
                      label={insights.dominantEmotion}
                      size="small"
                      sx={{
                        bgcolor:
                          emotionConfig[insights.dominantEmotion]?.color + "20",
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Stability:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {insights.stability}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Alert severity="info" sx={{ mt: 1 }}>
                    {insights.recommendation}
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Emotion Details */}
          {Object.keys(emotionDetails).length > 0 && (
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={2}
                >
                  <Timeline color="primary" />
                  Emotion Breakdown
                </Typography>
                <ProgressContainer>
                  {Object.entries(emotionDetails)
                    .sort(([, a], [, b]) => b - a)
                    .map(([emotion, confidence]) => (
                      <Box key={emotion} mb={2}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={0.5}
                        >
                          <Typography
                            variant="body2"
                            display="flex"
                            alignItems="center"
                            gap={1}
                          >
                            <span>{emotionConfig[emotion]?.icon || "❓"}</span>
                            {emotionConfig[emotion]?.label || emotion}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {Math.round(confidence)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={confidence}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(0,0,0,0.1)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor:
                                emotionConfig[emotion]?.color || "#6b7280",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    ))}
                </ProgressContainer>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Emotion History */}
        {emotionHistory.length > 0 && (
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={3}
                >
                  <TrendingUp color="primary" />
                  Emotion History
                </Typography>
                <Grid container spacing={2}>
                  {emotionHistory.slice(-8).map((entry, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          borderRadius: 2,
                          border: `2px solid ${
                            emotionConfig[entry.emotion]?.color
                          }30`,
                          transition: "transform 0.2s",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      >
                        <Typography fontSize="2rem" mb={1}>
                          {emotionConfig[entry.emotion]?.icon || "❓"}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" mb={0.5}>
                          {emotionConfig[entry.emotion]?.label || entry.emotion}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {entry.timestamp}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="primary"
                          fontWeight="bold"
                        >
                          {Math.round(entry.confidence)}%
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Box>
  );
}
