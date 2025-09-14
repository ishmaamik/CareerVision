import React from "react";
import { FaMapMarkerAlt, FaStar, FaHome, FaUniversity } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";

const AddressCard = () => {
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
          <FaMapMarkerAlt className="text-white text-sm" />
        </div>
        <h2 className={`${themeClasses.text.primary} font-bold text-lg`}>
          Addresses
        </h2>
      </div>

      {/* Compact Content */}
      <div className="p-4 space-y-3">
        {/* Primary Address */}
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
            <FaHome className={`${themeClasses.brand.primary} text-lg`} />
          </div>
          <p
            className={`${themeClasses.text.primary} text-sm font-medium leading-relaxed mb-1`}
          >
            House 14, Road 6, Dhanmondi, Dhaka-1205
          </p>
          <span
            className={`${themeClasses.text.muted} text-xs font-medium bg-gradient-to-r ${themeClasses.gradient.primary} px-2 py-1 rounded-full`}
          >
            Home • Dhaka, Bangladesh
          </span>
        </div>

        {/* Secondary Address */}
        <div
          className={`${themeClasses.bg.accent} p-3 rounded-lg ${themeClasses.border.primary} border`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${themeClasses.text.muted} ${themeClasses.bg.surface} text-xs font-semibold px-2 py-1 rounded-full`}
            >
              Secondary
            </span>
            <FaUniversity className={`${themeClasses.text.muted} text-lg`} />
          </div>
          <p
            className={`${themeClasses.text.secondary} text-sm font-medium leading-relaxed mb-1`}
          >
            IUT Male Residence, Board Bazar, Gazipur
          </p>
          <span
            className={`${themeClasses.text.muted} text-xs font-medium bg-gradient-to-r ${themeClasses.gradient.primary} px-2 py-1 rounded-full`}
          >
            University • Gazipur, Bangladesh
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
