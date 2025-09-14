import React from "react";
import { FaUser } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";

const UserHeader = () => {
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  return (
    <div
      className={`${themeClasses.bg.accent} px-6 py-4 rounded-t-2xl flex justify-between items-center ${themeClasses.border.divider} border-b`}
    >
      <h2
        className={`${themeClasses.text.primary} font-bold text-xl flex items-center`}
      >
        <div
          className={`${themeClasses.brand.bg} p-2 rounded-xl mr-3 shadow-lg`}
        >
          <FaUser className="text-white text-lg" />
        </div>
        Your Profile
      </h2>
      <span
        className={`${themeClasses.text.muted} text-sm font-medium bg-gradient-to-r ${themeClasses.gradient.primary} px-3 py-1 rounded-full`}
      >
        Joined 20/07/25
      </span>
    </div>
  );
};

export default UserHeader;
