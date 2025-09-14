import React from "react";
import { FaPhone, FaStar, FaShieldAlt, FaMobile } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";

const PhoneCard = () => {
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
          <FaPhone className="text-white text-sm" />
        </div>
        <h2 className={`${themeClasses.text.primary} font-bold text-lg`}>
          Phone Numbers
        </h2>
      </div>

      {/* Compact Content */}
      <div className="p-4 space-y-3">
        {/* Primary Phone */}
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
            <div className="flex items-center space-x-2">
              <FaMobile className={`${themeClasses.text.muted} text-sm`} />
              <FaShieldAlt
                className={`${themeClasses.status.success} text-sm`}
                title="Verified"
              />
            </div>
          </div>
          <p
            className={`${themeClasses.text.primary} text-lg font-bold font-mono tracking-wider`}
          >
            01696969420
          </p>
        </div>

        {/* Secondary Phone */}
        <div
          className={`${themeClasses.bg.accent} p-3 rounded-lg ${themeClasses.border.primary} border`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${themeClasses.text.muted} ${themeClasses.bg.surface} text-xs font-semibold px-2 py-1 rounded-full`}
            >
              Secondary
            </span>
            <div className="flex items-center space-x-2">
              <FaMobile className={`${themeClasses.text.muted} text-sm`} />
            </div>
          </div>
          <p
            className={`${themeClasses.text.secondary} text-lg font-bold font-mono tracking-wider`}
          >
            01717171717
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
