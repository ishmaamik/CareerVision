import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ease-in-out
        ${
          isDarkMode
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg"
            : "bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg"
        }
        hover:scale-105 active:scale-95
      `}
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isDarkMode ? "translate-x-3" : "-translate-x-3"}
        `}
      >
        {/* Icon inside the circle */}
        <span className="flex h-full w-full items-center justify-center text-xs">
          {isDarkMode ? (
            // Moon icon for dark mode
            <svg
              className="h-3 w-3 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              className="h-3 w-3 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </span>
      </span>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <span
          className={`text-xs transition-opacity duration-300 ${
            isDarkMode ? "opacity-30" : "opacity-100"
          }`}
        >
          ☀️
        </span>
        <span
          className={`text-xs transition-opacity duration-300 ${
            isDarkMode ? "opacity-100" : "opacity-30"
          }`}
        >
          🌙
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
