import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = ({ label = "Continue with Google" }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/google-auth/login`,
        credentialResponse.credential,
        { headers: { "Content-Type": "text/plain" } }
      );
      navigate("/");
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <div className="flex justify-center my-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google login failed")}
        text="signin_with"
        shape="rectangular"
        width="300"
      />
    </div>
  );
};

export default GoogleLoginButton;
