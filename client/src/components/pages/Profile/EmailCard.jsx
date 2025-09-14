import React from "react";
import { FaEnvelope, FaStar, FaShieldAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";

const EmailCard = () => {
  const { user } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  return (
    <div
      className={`w-full ${themeClasses.bg.surface} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${themeClasses.border.primary} border`}
    >
      {/* Compact Header */}
      <div
        className={`${themeClasses.bg.accent} px-4 py-3 rounded-t-xl flex items-center ${themeClasses.border.divider} border-b`}
      >
        <div
          className={`${themeClasses.brand.bg} p-2 rounded-lg mr-3 shadow-md`}
        >
          <FaEnvelope className="text-white text-sm" />
        </div>
        <h2 className={`${themeClasses.text.primary} font-bold text-lg`}>
          Email Addresses
        </h2>
      </div>

      {/* Compact Content */}
      <div className="p-4 space-y-3">
        {/* Primary Email */}
        <div
          className={`${themeClasses.bg.accent} p-3 rounded-lg ${themeClasses.border.primary} border`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${themeClasses.status.info} ${themeClasses.bg.surface} text-xs font-semibold px-2 py-1 rounded-full flex items-center`}
            >
              <FaStar className="mr-1 text-xs" />
              Primary
            </span>
            <FaShieldAlt
              className={`${themeClasses.status.success} text-sm`}
              title="Verified"
            />
          </div>
          <p
            className={`${themeClasses.text.primary} text-sm font-medium break-all`}
          >
            {user?.email}
          </p>
        </div>

        {/* Secondary Email */}
        <div
          className={`${themeClasses.bg.accent} p-3 rounded-lg ${themeClasses.border.primary} border`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${themeClasses.text.muted} ${themeClasses.bg.surface} text-xs font-semibold px-2 py-1 rounded-full`}
            >
              Secondary
            </span>
          </div>
          <p
            className={`${themeClasses.text.secondary} text-sm font-medium break-all`}
          >
            siyambhuiyan@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
