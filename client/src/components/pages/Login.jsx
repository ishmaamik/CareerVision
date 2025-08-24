import React, { useContext, useState, useEffect } from "react";
import { login } from "../../api/user/user.js";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/UserContext.jsx";
import { setUser } from "../../redux/userSlice.js";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({});
  const { setUserDetails } = useContext(User);
  const navigate = useNavigate();
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  const SignIn = async () => {
    const response = await login(credentials);
    if (response?.user) {
      console.log("Logged in:", response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(setUser(response.user));
      localStorage.setItem("name", response.user.name);
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("userId", response.user.id);
      navigate("/profile"); // or wherever you want to go
    } else {
      alert("Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] transition-all duration-800 ease-in-out ${
        isMounted ? `opacity-100 translate-y-0` : `opacity-0 translate-y-3`
      }`}
    >
      <div className="w-full max-w-md sm:max-w-lg themed-card p-6 sm:p-8 lg:p-10">
        {/* Logo and Heading */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
            Welcome Back
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Sign in to your CareerVision account
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-primary)] mb-2"
            >
              Email address
            </label>
            <input
              onChange={(e) => {
                setCredentials((prev) => ({ ...prev, email: e.target.value }));
              }}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 sm:px-4 py-2 sm:py-3 text-[var(--text-primary)] shadow-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-50 text-sm sm:text-base transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text-primary)] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="block w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 sm:px-4 py-2 sm:py-3 text-[var(--text-primary)] shadow-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-50 text-sm sm:text-base transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[var(--text-secondary)]"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={SignIn}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Footer Text */}
        <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-[var(--text-secondary)]">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
