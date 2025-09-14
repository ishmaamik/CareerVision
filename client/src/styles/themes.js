// Light Theme Configuration (Modern Blue & White Professional Theme)
export const lightTheme = {
  colors: {
    // Backgrounds
    primary: "#FFFFFF", // Pure white
    secondary: "#F8FAFC", // Light gray-blue
    accent: "#F1F5F9", // Soft blue-gray
    surface: "#FFFFFF", // Pure white for cards

    // Text Colors
    text: {
      primary: "#1E293B", // Dark slate
      secondary: "#475569", // Medium slate
      muted: "#64748B", // Light slate
      accent: "#3B82F6", // Blue accent
    },

    // Brand Colors
    brand: {
      primary: "#3B82F6", // Professional blue
      secondary: "#6366F1", // Indigo
      accent: "#8B5CF6", // Purple
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
    },

    // Status Colors
    success: "#10B981", // Emerald green
    warning: "#F59E0B", // Amber
    error: "#EF4444", // Red
    info: "#06B6D4", // Cyan

    // Borders & Dividers
    border: "#E2E8F0", // Light blue-gray
    divider: "#F1F5F9", // Very light blue-gray
  },
};

// Dark Theme Configuration (Soft Dark Professional Theme)
export const darkTheme = {
  colors: {
    // Backgrounds
    primary: "#0F172A", // Dark slate
    secondary: "#1E293B", // Medium dark slate
    accent: "#334155", // Light dark slate
    surface: "#1E293B", // Medium dark for cards

    // Text Colors
    text: {
      primary: "#F8FAFC", // Light gray-blue
      secondary: "#E2E8F0", // Medium light
      muted: "#94A3B8", // Muted light
      accent: "#60A5FA", // Light blue
    },

    // Brand Colors
    brand: {
      primary: "#60A5FA", // Light blue
      secondary: "#818CF8", // Light indigo
      accent: "#A78BFA", // Light purple
      gradient: "from-blue-400 via-indigo-400 to-purple-400",
    },

    // Status Colors
    success: "#34D399", // Light emerald
    warning: "#FBBF24", // Light amber
    error: "#F87171", // Light red
    info: "#22D3EE", // Light cyan

    // Borders & Dividers
    border: "#334155", // Medium dark slate
    divider: "#475569", // Dark slate
  },
};

// Enhanced theme utility functions
export const getTheme = (isDarkMode) => (isDarkMode ? darkTheme : lightTheme);

export const getThemeClasses = (isDarkMode) => ({
  // Background classes
  bg: {
    primary: isDarkMode ? "bg-slate-900" : "bg-white",
    secondary: isDarkMode ? "bg-slate-800" : "bg-slate-50",
    accent: isDarkMode ? "bg-slate-700" : "bg-slate-100",
    surface: isDarkMode ? "bg-slate-800" : "bg-white",
  },

  // Text classes
  text: {
    primary: isDarkMode ? "text-slate-50" : "text-slate-800",
    secondary: isDarkMode ? "text-slate-200" : "text-slate-600",
    muted: isDarkMode ? "text-slate-400" : "text-slate-500",
    accent: isDarkMode ? "text-blue-400" : "text-blue-600",
  },

  // Brand classes
  brand: {
    primary: isDarkMode ? "text-blue-400" : "text-blue-600",
    bg: isDarkMode ? "bg-blue-400" : "bg-blue-600",
    gradient: isDarkMode
      ? "from-blue-400 via-indigo-400 to-purple-400"
      : "from-blue-500 via-indigo-500 to-purple-500",
    hover: isDarkMode ? "hover:bg-blue-500" : "hover:bg-blue-700",
  },

  // Status classes
  status: {
    success: isDarkMode ? "text-emerald-400" : "text-emerald-600",
    warning: isDarkMode ? "text-amber-400" : "text-amber-600",
    error: isDarkMode ? "text-red-400" : "text-red-600",
    info: isDarkMode ? "text-cyan-400" : "text-cyan-600",
  },

  // Border classes
  border: {
    primary: isDarkMode ? "border-slate-700" : "border-slate-200",
    divider: isDarkMode ? "border-slate-600" : "border-slate-100",
  },

  // Gradient classes
  gradient: {
    primary: isDarkMode
      ? "from-slate-800 to-slate-900"
      : "from-slate-50 to-white",
    secondary: isDarkMode
      ? "from-slate-700 to-slate-800"
      : "from-white to-slate-50",
    hero: isDarkMode
      ? "from-slate-900 via-blue-900 to-indigo-900"
      : "from-blue-50 via-indigo-50 to-purple-50",
    accent: isDarkMode
      ? "from-blue-400 via-indigo-400 to-purple-400"
      : "from-blue-500 via-indigo-500 to-purple-500",
  },

  // Interactive states
  interactive: {
    hover: isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-50",
    active: isDarkMode ? "active:bg-slate-600" : "active:bg-slate-100",
    focus: isDarkMode
      ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      : "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    disabled: isDarkMode
      ? "disabled:bg-slate-800 disabled:text-slate-500"
      : "disabled:bg-slate-100 disabled:text-slate-400",
  },
});

export const getComponentStyles = (isDarkMode) => ({
  // Card styles
  card: isDarkMode
    ? "bg-slate-800 border-slate-700 border rounded-xl shadow-xl shadow-slate-900/50"
    : "bg-white border-slate-200 border rounded-xl shadow-lg shadow-slate-900/10",

  // Button styles
  button: {
    primary: isDarkMode
      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: isDarkMode
      ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border-2 border-slate-600 hover:border-blue-500 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-200 hover:border-blue-500 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
    ghost: isDarkMode
      ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      : "hover:bg-slate-100 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
  },

  // Input styles
  input: isDarkMode
    ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400 border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
    : "bg-white border-slate-300 text-slate-800 placeholder-slate-500 border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300",

  // Navigation styles
  nav: {
    item: isDarkMode
      ? "text-slate-400 hover:text-slate-100 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-300"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-300",
    active: isDarkMode
      ? "text-slate-100 bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 rounded-lg shadow-lg"
      : "text-white bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 rounded-lg shadow-lg",
  },
});
