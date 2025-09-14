import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaCamera } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import {
  setImageLoadError,
  setProfilePictureUrl,
} from "../../../redux/profileSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useProfilePictureUpload } from "../../../api/profilePicture/profilePicture.js";

const ProfilePicture = () => {
  const { handleProfilePictureUpload, handleDeleteProfilePicture } =
    useProfilePictureUpload();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  const { profilePictureUrl, imageLoadError, profilePictureUploading } =
    useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const checkProfilePictureStatus = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/profile-picture/user/${user?.id}`
      );
      dispatch(setImageLoadError(false));
      if (response.data.hasProfilePicture && response.data.profilePictureUrl) {
        dispatch(setProfilePictureUrl(response.data.profilePictureUrl.trim()));
      } else {
        dispatch(setProfilePictureUrl(null));
      }
    } catch (err) {
      console.error("Error checking profile picture status:", err);
      dispatch(setProfilePictureUrl(null));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    checkProfilePictureStatus();
    console.log(user);
  }, [checkProfilePictureStatus, user]);

  return (
    <div className="flex flex-col items-center space-y-6 w-full lg:w-auto">
      {/* Profile Picture */}
      <div className="relative group">
        <div
          className={`p-1 rounded-full bg-gradient-to-br ${themeClasses.brand.gradient} shadow-xl`}
        >
          <img
            className="w-36 h-36 lg:w-40 lg:h-40 object-cover rounded-full ring-4 ring-white shadow-lg transition-transform duration-300 group-hover:scale-105"
            src={
              imageLoadError || !profilePictureUrl
                ? "/default-profile.jpg"
                : profilePictureUrl
            }
            alt="Profile"
            onError={() => dispatch(setImageLoadError(true))}
            crossOrigin="anonymous"
          />
        </div>

        {/* Upload Overlay */}
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <FaCamera className="text-white text-3xl" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <label
          className={`${
            componentStyles.button.secondary
          } cursor-pointer relative overflow-hidden group ${
            profilePictureUploading ? "opacity-50 cursor-not-allowed" : ""
          } text-center`}
        >
          <FaCamera className="mr-2" />
          {profilePictureUploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            onChange={(e) =>
              handleProfilePictureUpload({ e, userId: user?.id })
            }
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={profilePictureUploading}
          />
        </label>

        {profilePictureUrl && !imageLoadError && (
          <button
            onClick={() => handleDeleteProfilePicture({ userId: user?.id })}
            className={`${themeClasses.bg.surface} hover:bg-red-50 ${
              themeClasses.text.secondary
            } hover:text-red-600 ${
              themeClasses.border.primary
            } border px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
              profilePictureUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={profilePictureUploading}
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
