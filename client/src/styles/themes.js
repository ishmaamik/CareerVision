// Light Theme Configuration (Elegant Warm Cream & Gold Theme)
export const lightTheme = {
  colors: {
    // Backgrounds
    primary: "#FEFBF3", // Soft warm ivory
    secondary: "#FDF8EE", // Light warm cream
    accent: "#F8F2E4", // Warm beige
    surface: "#FFFFFF", // Pure white for cards

    // Text Colors
    text: {
      primary: "#2A1810", // Rich dark coffee
      secondary: "#483828", // Warm brown
      muted: "#6B5B47", // Coffee brown
      accent: "#8B5A2B", // Caramel brown
    },

    // Brand Colors
    brand: {
      primary: "#D4A574", // Warm gold
      secondary: "#E6C79C", // Light gold
      accent: "#F4E4BC", // Pale gold
      gradient: "from-amber-400 via-yellow-500 to-orange-500",
    },

    // Status Colors
    success: "#16A085", // Elegant teal
    warning: "#F39C12", // Warm orange
    error: "#E74C3C", // Soft red
    info: "#3498DB", // Clear blue

    // Borders & Dividers
    border: "#E8DDD0", // Light cream border
    divider: "#F0E6D8", // Very light cream
  },
};

// Dark Theme Configuration (Deep Emerald Forest Theme)
export const darkTheme = {
  colors: {
    // Backgrounds
    primary: "#0A1F1A", // Deep emerald forest
    secondary: "#0E2B23", // Rich forest green
    accent: "#14362C", // Medium forest green
    surface: "#1A4136", // Lighter forest for cards

    // Text Colors
    text: {
      primary: "#F0FDF4", // Soft mint white
      secondary: "#D1FAE5", // Light sage
      muted: "#86EFAC", // Bright mint
      accent: "#BBF7D0", // Light green
    },

    // Brand Colors
    brand: {
      primary: "#22C55E", // Vibrant emerald
      secondary: "#16A34A", // Rich green
      accent: "#4ADE80", // Light emerald
      gradient: "from-emerald-400 via-green-500 to-teal-500",
    },

    // Status Colors
    success: "#22C55E", // Success emerald
    warning: "#F59E0B", // Warm amber
    error: "#EF4444", // Soft coral
    info: "#3B82F6", // Soft blue

    // Borders & Dividers
    border: "#1F4A3A", // Medium green border
    divider: "#16362B", // Dark green divider
  },
};

// Enhanced theme utility functions
export const getTheme = (isDarkMode) => (isDarkMode ? darkTheme : lightTheme);

export const getThemeClasses = (isDarkMode) => ({
  // Background classes
  bg: {
    primary: isDarkMode ? "bg-[#0A1F1A]" : "bg-[#FEFBF3]",
    secondary: isDarkMode ? "bg-[#0E2B23]" : "bg-[#FDF8EE]",
    accent: isDarkMode ? "bg-[#14362C]" : "bg-[#F8F2E4]",
    surface: isDarkMode ? "bg-[#1A4136]" : "bg-white",
  },

  // Text classes
  text: {
    primary: isDarkMode ? "text-[#F0FDF4]" : "text-[#2A1810]",
    secondary: isDarkMode ? "text-[#D1FAE5]" : "text-[#483828]",
    muted: isDarkMode ? "text-[#86EFAC]" : "text-[#6B5B47]",
    accent: isDarkMode ? "text-[#BBF7D0]" : "text-[#8B5A2B]",
  },

  // Brand classes
  brand: {
    primary: isDarkMode ? "text-[#22C55E]" : "text-[#D4A574]",
    bg: isDarkMode ? "bg-[#22C55E]" : "bg-[#D4A574]",
    gradient: isDarkMode
      ? "from-emerald-400 via-green-500 to-teal-500"
      : "from-amber-400 via-yellow-500 to-orange-500",
    hover: isDarkMode ? "hover:bg-[#16A34A]" : "hover:bg-[#C17817]",
  },

  // Status classes
  status: {
    success: isDarkMode ? "text-emerald-500" : "text-green-700",
    warning: isDarkMode ? "text-amber-500" : "text-orange-700",
    error: isDarkMode ? "text-red-500" : "text-red-700",
    info: isDarkMode ? "text-blue-500" : "text-blue-700",
  },

  // Border classes
  border: {
    primary: isDarkMode ? "border-[#1F4A3A]" : "border-[#E8DDD0]",
    divider: isDarkMode ? "border-[#16362B]" : "border-[#F0E6D8]",
  },

  // Gradient classes
  gradient: {
    primary: isDarkMode
      ? "from-emerald-900 to-green-900"
      : "from-amber-50 to-orange-50",
    secondary: isDarkMode
      ? "from-green-800 to-emerald-800"
      : "from-orange-50 to-yellow-50",
    hero: isDarkMode
      ? "from-emerald-950 via-green-950 to-teal-900"
      : "from-amber-100 via-orange-50 to-yellow-100",
    accent: isDarkMode
      ? "from-emerald-400 via-green-500 to-teal-500"
      : "from-amber-400 via-yellow-500 to-orange-500",
  },

  // Interactive states
  interactive: {
    hover: isDarkMode ? "hover:bg-[#1F4A3A]" : "hover:bg-[#F0E6D8]",
    active: isDarkMode ? "active:bg-[#2A5B4A]" : "active:bg-[#E8DDD0]",
    focus: isDarkMode
      ? "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0A1F1A]"
      : "focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
    disabled: isDarkMode
      ? "disabled:bg-[#0E2B23] disabled:text-[#86EFAC]"
      : "disabled:bg-[#F8F2E4] disabled:text-[#6B5B47]",
  },
});

// Component-specific styling with enhanced colors
export const getComponentStyles = (isDarkMode) => ({
  // Card styles
  card: isDarkMode
    ? "bg-[#1A4136] border-[#1F4A3A] border rounded-xl shadow-xl shadow-emerald-900/20"
    : "bg-white border-[#E8DDD0] border rounded-xl shadow-lg shadow-amber-900/10",

  // Button styles
  button: {
    primary: isDarkMode
      ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: isDarkMode
      ? "bg-[#14362C] hover:bg-[#1F4A3A] text-[#D1FAE5] border-2 border-[#1F4A3A] hover:border-[#22C55E] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      : "bg-[#F8F2E4] hover:bg-[#E8DDD0] text-[#483828] border-2 border-[#E8DDD0] hover:border-[#D4A574] px-6 py-3 rounded-xl font-semibold transition-all duration-300",
    ghost: isDarkMode
      ? "hover:bg-[#14362C] text-[#86EFAC] hover:text-[#D1FAE5] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      : "hover:bg-[#F8F2E4] text-[#6B5B47] hover:text-[#483828] px-6 py-3 rounded-xl font-semibold transition-all duration-300",
  },

  // Input styles
  input: isDarkMode
    ? "bg-[#0E2B23] border-[#1F4A3A] text-[#F0FDF4] placeholder-[#86EFAC] border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
    : "bg-white border-[#E8DDD0] text-[#2A1810] placeholder-[#6B5B47] border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300",

  // Navigation styles
  nav: {
    item: isDarkMode
      ? "text-[#86EFAC] hover:text-[#F0FDF4] hover:bg-[#14362C] px-4 py-2 rounded-lg transition-all duration-300"
      : "text-[#6B5B47] hover:text-[#2A1810] hover:bg-[#F8F2E4] px-4 py-2 rounded-lg transition-all duration-300",
    active: isDarkMode
      ? "text-[#F0FDF4] bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-2 rounded-lg shadow-lg"
      : "text-[#2A1810] bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-lg",
  },
});
