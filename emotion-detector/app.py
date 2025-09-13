from flask import Flask, request, jsonify
from deepface import DeepFace
from flask_cors import CORS
import base64
import cv2
import numpy as np
import logging
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Store analysis history (in production, use a database)
analysis_history = []

def calculate_emotion_insights(emotion_data):
    """Calculate additional insights from emotion data"""
    try:
        emotions = emotion_data["emotion"]
        dominant = emotion_data["dominant_emotion"]
        
        # Calculate confidence score
        max_confidence = max(emotions.values())
        
        # Calculate emotional stability (variance in top emotions)
        top_emotions = sorted(emotions.values(), reverse=True)[:3]
        stability = 100 - (np.std(top_emotions) * 100)
        
        # Interview readiness score
        positive_emotions = emotions.get("happy", 0) + emotions.get("neutral", 0)
        negative_emotions = emotions.get("angry", 0) + emotions.get("fear", 0) + emotions.get("sad", 0)
        readiness_score = min(100, positive_emotions + (100 - negative_emotions))
        
        # Recommendations
        recommendations = []
        if dominant in ["angry", "fear", "sad"]:
            recommendations.append("Consider taking deep breaths to appear more composed")
        if emotions.get("surprised", 0) > 30:
            recommendations.append("Try to maintain a more neutral expression")
        if emotions.get("neutral", 0) > 60:
            recommendations.append("Great composure! You appear confident and professional")
        if max_confidence < 50:
            recommendations.append("Ensure good lighting for better analysis accuracy")
            
        return {
            "confidence_score": round(max_confidence, 2),
            "stability_score": round(stability, 2),
            "interview_readiness": round(readiness_score, 2),
            "recommendations": recommendations,
            "analysis_quality": "high" if max_confidence > 70 else "medium" if max_confidence > 50 else "low"
        }
    except Exception as e:
        logger.error(f"Error calculating insights: {e}")
        return {}

@app.route("/analyze-emotion", methods=["POST"])
def analyze_emotion():
    try:
        data = request.json
        img_data = data["image"]

        # Decode Base64 to image
        img_bytes = base64.b64decode(img_data.split(",")[1])
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            raise ValueError("Failed to decode image")

        # Enhance image quality for better detection
        img = cv2.resize(img, (640, 480))  # Standardize size
        img = cv2.convertScaleAbs(img, alpha=1.2, beta=10)  # Enhance contrast and brightness

        # Use DeepFace emotion analysis with multiple models for better accuracy
        result = DeepFace.analyze(
            img,
            actions=["emotion", "age", "gender"],
            enforce_detection=False,
            detector_backend="opencv",  # Faster detection
            silent=True
        )

        # Extract emotion data
        emotion_data = result[0]
        emotion_scores = emotion_data["emotion"]
        dominant_emotion = emotion_data["dominant_emotion"]
        
        # Convert to serializable format
        converted_scores = {k: float(v) for k, v in emotion_scores.items()}
        
        # Calculate additional insights
        insights = calculate_emotion_insights({
            "emotion": converted_scores,
            "dominant_emotion": dominant_emotion
        })
        
        # Store in history
        analysis_entry = {
            "timestamp": datetime.now().isoformat(),
            "emotion": dominant_emotion,
            "scores": converted_scores,
            "insights": insights,
            "age": emotion_data.get("age", 0),
            "gender": emotion_data.get("dominant_gender", "unknown")
        }
        
        analysis_history.append(analysis_entry)
        
        # Keep only last 100 analyses
        if len(analysis_history) > 100:
            analysis_history.pop(0)

        response = {
            "emotion": dominant_emotion,
            "details": converted_scores,
            "insights": insights,
            "timestamp": analysis_entry["timestamp"],
            "analysis_id": len(analysis_history),
            "status": "success"
        }

        logger.info(f"Emotion analysis completed: {dominant_emotion} (confidence: {insights.get('confidence_score', 0)}%)")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Emotion analysis error: {e}")
        return jsonify({
            "error": str(e),
            "status": "error",
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route("/emotion-history", methods=["GET"])
def get_emotion_history():
    """Get recent emotion analysis history"""
    try:
        limit = request.args.get("limit", 20, type=int)
        recent_history = analysis_history[-limit:] if analysis_history else []
        
        return jsonify({
            "history": recent_history,
            "total_analyses": len(analysis_history),
            "status": "success"
        })
    except Exception as e:
        logger.error(f"Error fetching history: {e}")
        return jsonify({"error": str(e), "status": "error"}), 500

@app.route("/emotion-stats", methods=["GET"])
def get_emotion_stats():
    """Get emotion analysis statistics"""
    try:
        if not analysis_history:
            return jsonify({
                "stats": {},
                "message": "No analysis data available",
                "status": "success"
            })
        
        # Calculate statistics
        emotions = [entry["emotion"] for entry in analysis_history]
        emotion_counts = {}
        for emotion in emotions:
            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
        
        # Calculate averages
        avg_confidence = np.mean([
            entry["insights"].get("confidence_score", 0) 
            for entry in analysis_history
            if entry["insights"].get("confidence_score")
        ])
        
        avg_readiness = np.mean([
            entry["insights"].get("interview_readiness", 0) 
            for entry in analysis_history
            if entry["insights"].get("interview_readiness")
        ])
        
        stats = {
            "total_analyses": len(analysis_history),
            "emotion_distribution": emotion_counts,
            "most_common_emotion": max(emotion_counts, key=emotion_counts.get) if emotion_counts else None,
            "average_confidence": round(avg_confidence, 2),
            "average_interview_readiness": round(avg_readiness, 2),
            "analysis_period": {
                "start": analysis_history[0]["timestamp"] if analysis_history else None,
                "end": analysis_history[-1]["timestamp"] if analysis_history else None
            }
        }
        
        return jsonify({
            "stats": stats,
            "status": "success"
        })
        
    except Exception as e:
        logger.error(f"Error calculating stats: {e}")
        return jsonify({"error": str(e), "status": "error"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0",
        "features": ["emotion_analysis", "real_time_detection", "interview_insights"]
    })

if __name__ == "__main__":
    logger.info("Starting Enhanced Emotion Detection API...")
    logger.info("Features: Real-time analysis, Interview insights, Emotion history")
    app.run(host="0.0.0.0", port=5001, debug=False)
