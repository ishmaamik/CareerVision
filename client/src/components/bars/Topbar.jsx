import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Business,
  QuestionAnswer,
  PeopleAlt as People,
  Work as Work,
  Map as Map,
  Event as EventIcon,
  Login as Login,
  Logout as Logout,
  Person as Person,
  AppRegistration as Signup,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

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
    <header className="z-1000 fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-white shadow-md ">
      {/* Left Side: Logo/Brand */}
      <div
        className="text-2xl font-bold tracking-tight"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        CareerVision
      </div>

      {/* Right Side: Navigation */}
      <div className="hidden md:flex space-x-12 items-center">
        <Button
          disableRipple
          startIcon={<People />}
          variant="text"
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/community")}
        >
          Community
        </Button>

        <Button
          disableRipple
          startIcon={<Map />}
          variant="text"
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("roadmap")}
        >
          Career Roadmap
        </Button>
        <Button
          disableRipple
          variant="text"
          startIcon={<Work />}
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/jobs")}
        >
          Jobs
        </Button>
        <Button
          disableRipple
          variant="text"
          startIcon={<Business />}
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/companies")}
        >
          Companies
        </Button>
        <Button
          disableRipple
          variant="text"
          startIcon={<QuestionAnswer />}
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/interview-questions")}
        >
          Interview Questions
        </Button>
        <Button
          disableRipple
          variant="text"
          startIcon={<EventIcon />}
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/events")}
        >
          Events
        </Button>
        {localStorage.getItem("name") ? (
          <>
            <Button
              disableRipple
              variant="text"
              startIcon={<Logout />}
              sx={{
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
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
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
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
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
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
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/signup")}
            >
              SIGNUP
            </Button>
            {/* <Button>
              disableRipple
              variant="text"
              sx={{
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/jobs")}
              JOBS
            </Button> */}
          </>
        )}
      </div>
      {user ? (
        <div className="w-12 lg:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10">
          {" "}
          <img
            onClick={() => navigate("/profile")}
            src={user.profilePictureUrl}
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />
        </div>
      ) : (
        <div className="hidden lg:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"></div>
      )}
    </header>
  );
};

export default Topbar;
