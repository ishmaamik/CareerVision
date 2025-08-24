import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Apply theme class to body
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";

    // Inject CSS styles
    const styleId = "theme-styles";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      :root {
        --transition-theme: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Light Theme */
      .light-theme {
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-card: #ffffff;
        --bg-hover: rgba(59, 130, 246, 0.1);
        
        --text-primary: #1e293b;
        --text-secondary: #64748b;
        --text-muted: #94a3b8;
        
        --accent-primary: #3b82f6;
        --accent-secondary: #e0f2fe;
        --accent-hover: #2563eb;
        
        --border-color: #e2e8f0;
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        
        --gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        --gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
      }

      /* Dark Theme */
      .dark-theme {
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        --bg-card: #1e293b;
        --bg-hover: rgba(59, 130, 246, 0.2);
        
        --text-primary: #f1f5f9;
        --text-secondary: #cbd5e1;
        --text-muted: #64748b;
        
        --accent-primary: #60a5fa;
        --accent-secondary: rgba(59, 130, 246, 0.1);
        --accent-hover: #3b82f6;
        
        --border-color: #334155;
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4);
        
        --gradient-primary: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
        --gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #60a5fa 100%);
      }

      /* Utility Classes */
      .themed-card {
        background-color: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
        box-shadow: var(--shadow-md);
        transition: var(--transition-theme);
      }

      .themed-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
      }

      .theme-text-primary {
        color: var(--text-primary);
      }

      .theme-text-secondary {
        color: var(--text-secondary);
      }

      .theme-bg-primary {
        background-color: var(--bg-primary);
      }

      .theme-bg-secondary {
        background-color: var(--bg-secondary);
      }

      .theme-border {
        border-color: var(--border-color);
      }

      .theme-nav {
        background-color: var(--bg-card);
        border-bottom: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        transition: var(--transition-theme);
      }

      /* Smooth transitions for theme switching */
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }

      /* Remove transitions for pseudo-elements to avoid conflicts */
      *::before,
      *::after {
        transition: none;
      }
    `;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
