import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import {
  PeopleAlt as People,
  Work as Work,
  Login as Login,
  Logout as Logout,
  Person as Person,
  AppRegistration as Signup,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useTheme } from "../../hooks/useTheme";
const Topbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem(`user`));

  const LogInOrOut = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  return (
    <header
      className="theme-nav z-1000 fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Left Side: Logo/Brand */}
      <div
        className="text-2xl font-bold tracking-tight theme-text-primary"
        style={{
          cursor: "pointer",
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        onClick={() => navigate("/")}
      >
        CareerVision
      </div>

      {/* Center: Navigation */}
      <div className="flex items-center space-x-8">
        <Button
          disableRipple
          startIcon={<People />}
          variant="text"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            ":hover": {
              backgroundColor: "var(--bg-hover)",
              color: "var(--accent-primary)",
              transform: "translateY(-1px)",
            },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/community")}
        >
          Community
        </Button>

        <Button
          disableRipple
          variant="text"
          startIcon={<Work />}
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            ":hover": {
              backgroundColor: "var(--bg-hover)",
              color: "var(--accent-primary)",
              transform: "translateY(-1px)",
            },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/jobs")}
        >
          Jobs
        </Button>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: "var(--text-secondary)",
            padding: "8px",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            ":hover": {
              backgroundColor: "var(--bg-hover)",
              color: "var(--accent-primary)",
              transform: "rotate(180deg)",
            },
          }}
        >
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>

        {localStorage.getItem("name") ? (
          <>
            <Button
              disableRipple
              variant="text"
              startIcon={<Logout />}
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  backgroundColor: "#ef4444",
                  color: "white",
                  transform: "translateY(-1px)",
                },
                ":focus-visible": { outline: "none" },
              }}
              onClick={LogInOrOut}
            >
              LOGOUT
            </Button>

            <Button
              disableRipple
              startIcon={<Person />}
              variant="text"
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--accent-primary)",
                  transform: "translateY(-1px)",
                },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/profile")}
            >
              PROFILE
            </Button>
          </>
        ) : (
          <>
            <Button
              disableRipple
              variant="text"
              startIcon={<Login />}
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  backgroundColor: "#10b981",
                  color: "white",
                  transform: "translateY(-1px)",
                },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>
            <Button
              disableRipple
              variant="text"
              startIcon={<Signup />}
              sx={{
                color: "white",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  transform: "translateY(-2px)",
                  filter: "brightness(1.1)",
                  boxShadow: "var(--shadow-md)",
                },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/signup")}
            >
              SIGNUP
            </Button>
          </>
        )}
      </div>

      {/* Right Side: Profile Picture */}
      {user ? (
        <div
          className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer transition-all duration-300 hover:scale-110 theme-shadow-md"
          onClick={() => navigate("/profile")}
          style={{
            border: "2px solid var(--accent-primary)",
          }}
        >
          <img
            src={user.profilePictureUrl || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
            style={{ borderRadius: "50%" }}
          />
        </div>
      ) : (
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Person sx={{ color: "white", fontSize: 24 }} />
        </div>
      )}
    </header>
  );
};

export default Topbar;
