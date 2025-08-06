from flask import Flask, request, jsonify
from deepface import DeepFace
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route("/analyze-emotion", methods=["POST"])
def analyze_emotion():
    try:
        data = request.json
        img_data = data["image"]

        # Decode Base64 to image
        img_bytes = base64.b64decode(img_data.split(",")[1])
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Analyze emotions
        result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)

        return jsonify({"emotion": result[0]["dominant_emotion"], "details": result[0]["emotion"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
