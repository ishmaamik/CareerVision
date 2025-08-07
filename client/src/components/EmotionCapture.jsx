import React, { useRef, useEffect } from "react";

export default function EmotionCapture() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const captureAndSend = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    const res = await fetch("http://localhost:5001/analyze-emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData }),
    });

    const data = await res.json();
    console.log("Emotion Result:", data);
    alert(`Detected Emotion: ${data.emotion}`);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: "400px" }} />
      <button onClick={captureAndSend}>Analyze Emotion</button>
    </div>
  );
}
