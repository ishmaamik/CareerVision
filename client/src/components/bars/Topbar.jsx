import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Topbar = () => {
  const navigate = useNavigate();

  const LogInOrOut = () => {
    if (localStorage.getItem("name")) {
      localStorage.removeItem("name");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-white shadow-md z-50">
      {/* Left Side: Logo/Brand */}
      <div
        className="text-2xl font-bold tracking-tight"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        CareerVision
      </div>

      {/* Right Side: Navigation */}
      <div className="space-x-4">
        <Button
          disableRipple
          variant="text"
          sx={{
            color: "gray",
            ":hover": { backgroundColor: "transparent" },
            ":focus-visible": { outline: "none" },
          }}
          onClick={() => navigate("/blogs")}
        >
          Blogs
        </Button>
        {localStorage.getItem("name") ? (
          <>
            <Button
              disableRipple
              variant="text"
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
              sx={{
                color: "gray",
                ":hover": { backgroundColor: "transparent" },
                ":focus-visible": { outline: "none" },
              }}
              onClick={() => navigate("/signup")}
            >
              SIGNUP
            </Button>
          </>
        )}
      </div>
      <div className="hidden lg:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANolXzfNIr_8GBUJpn3PQMyj63SVxLJuHK6vl7wI93AEZ_gm-0tlyVKqqDHU2D5IsQhtbmVZQPgbIhVGiC4439LIUWuDKjkFkY4cwpmrFPg7j0oD-9InHdUlpMACK5qQUNCg_U8CJ42Z6UKoYkyoImXZet1O28EYlAip31H1RSrw3PqmDs7Tts-Tx0BMP5eHwMYd6WZL-FRqrS_3NLpi1dq3OQ4xK8VX4GmCOKXv9nUpNRiT3nBgYHzyCZlYFmIUkIB0LRyKexKrc")'}}></div>
    </header>
  );
};

export default Topbar;
