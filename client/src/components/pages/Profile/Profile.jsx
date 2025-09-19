import React, { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";
import UserHeader from "./UserHeader.jsx";
import ProfilePicture from "./ProfilePicture.jsx";
import UserInfo from "./UserInfo.jsx";
import EmailCard from "./EmailCard.jsx";
import LocationCard from "./LocationCard.jsx";
import PhoneCard from "./PhoneCard.jsx";
import AddressCard from "./AddressCard.jsx";

const Profile = () => {
  const [isMounted, setMounted] = useState(false);
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${
        themeClasses.bg.primary
      } transition-all duration-500 ease-in-out ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="w-full max-w-full px-6 py-8">
        {/* Enhanced Grid Layout for Map Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Profile Card */}
            <div
              className={`w-full ${themeClasses.bg.surface} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${themeClasses.border.primary} border`}
            >
              <UserHeader />
              <div className="p-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
                  <div className="flex-shrink-0">
                    <ProfilePicture />
                  </div>
                  <div className="flex-1 w-full">
                    <UserInfo />
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Contact Cards */}
            <div className="grid grid-cols-1 gap-4">
              <EmailCard />
              <PhoneCard />
              <AddressCard />
            </div>
          </div>

          {/* Right Column - Expanded Location */}
          <div className="lg:col-span-6">
            <LocationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
