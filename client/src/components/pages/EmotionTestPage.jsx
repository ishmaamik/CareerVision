import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import EmotionCapture from "../EmotionCapture";

const EmotionTestPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          🎯 Interview Emotion Training
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Practice your interview presence with real-time AI emotion analysis
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 2 }}>
        <EmotionCapture />
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          💡 <strong>Tips for best results:</strong> Ensure good lighting, look
          directly at the camera, and maintain a natural expression during
          analysis.
        </Typography>
      </Box>
    </Container>
  );
};

export default EmotionTestPage;
