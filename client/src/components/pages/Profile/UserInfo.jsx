import React, { useCallback, useEffect } from "react";
import {
  FaEye,
  FaFilePdf,
  FaDownload,
  FaTrash,
  FaSync,
  FaFileUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import { useFileUpload } from "../../../api/resume/resume.js";
import { setError } from "../../../redux/successSlice.js";
import { setHasResume } from "../../../redux/profileSlice.js";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { handleFileUpload, updateResume, deleteResume } = useFileUpload();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // Get state from Redux store
  const { uploading } = useSelector((state) => state.upload);
  const { success, error } = useSelector((state) => state.success);
  const { hasResume, resumeUrl } = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user.user);

  const checkResumeStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/resume/user/${user?.id}`
      );
      if (response.data.hasResume) {
        dispatch(
          setHasResume({
            hasResume: true,
            resumeUrl: response.data.resumeUrl,
          })
        );
      }
    } catch (err) {
      console.error("Error checking resume status:", err);
      dispatch(setError("Failed to check resume status"));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    checkResumeStatus();
  }, [checkResumeStatus]);

  return (
    <div className="flex-1 min-w-0">
      {/* User Details */}
      <div className="mb-6">
        <h1
          className={`${themeClasses.text.primary} text-2xl lg:text-3xl font-bold mb-2`}
        >
          {user?.name}
        </h1>
        <p className={`${themeClasses.text.muted} text-lg font-medium`}>
          01696969420
        </p>
      </div>

      {/* Resume Section */}
      <div
        className={`${themeClasses.bg.accent} ${themeClasses.border.primary} border rounded-xl p-6 shadow-inner`}
      >
        <div className="flex items-center mb-4">
          <div className={`${themeClasses.brand.bg} p-2 rounded-lg mr-3`}>
            <FaFilePdf className="text-white text-lg" />
          </div>
          <h3 className={`${themeClasses.text.primary} font-semibold text-lg`}>
            Resume Management
          </h3>
        </div>

        {hasResume ? (
          <div className="space-y-4">
            {/* Resume Status */}
            <div
              className={`${themeClasses.status.success} flex items-center text-sm font-medium`}
            >
              <FaFilePdf className="mr-2" />
              Resume Available
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${componentStyles.button.primary} text-center no-underline group`}
              >
                <FaEye className="mr-2 group-hover:scale-110 transition-transform" />
                View Resume
              </a>

              <a
                href={`${resumeUrl}?download=true`}
                className={`${themeClasses.status.success} hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center no-underline flex items-center justify-center group`}
              >
                <FaDownload className="mr-2 group-hover:scale-110 transition-transform" />
                Download
              </a>

              <label
                className={`${
                  themeClasses.status.warning
                } hover:bg-yellow-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer flex items-center justify-center group ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaSync
                  className={`mr-2 group-hover:scale-110 transition-transform ${
                    uploading ? "animate-spin" : ""
                  }`}
                />
                Update
                <input
                  type="file"
                  onChange={async (e) => {
                    try {
                      await updateResume({ e, userId: user?.id });
                      await checkResumeStatus();
                    } catch (error) {
                      dispatch(setError(error.message));
                    }
                  }}
                  accept=".pdf"
                  className="hidden"
                  disabled={uploading}
                />
              </label>

              <button
                onClick={async () => {
                  try {
                    await deleteResume({ userId: user?.id });
                    await checkResumeStatus();
                  } catch (error) {
                    dispatch(setError(error.message));
                  }
                }}
                className={`${
                  themeClasses.status.error
                } hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={uploading}
              >
                <FaTrash className="mr-2 group-hover:scale-110 transition-transform" />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className={`${themeClasses.text.muted} mb-4`}>
              <FaFileUpload className="mx-auto text-4xl mb-3" />
              <p className="text-lg">No resume uploaded yet</p>
              <p className="text-sm">
                Upload your resume to showcase your skills
              </p>
            </div>

            <label
              className={`${
                componentStyles.button.primary
              } cursor-pointer inline-flex items-center ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaFileUpload
                className={`mr-2 ${uploading ? "animate-bounce" : ""}`}
              />
              {uploading ? "Uploading..." : "Upload Resume"}
              <input
                type="file"
                onChange={async (e) => {
                  try {
                    await handleFileUpload({ e, userId: user?.id });
                    await checkResumeStatus();
                  } catch (error) {
                    dispatch(setError(error.message));
                  }
                }}
                accept=".pdf"
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div
            className={`${themeClasses.status.error} ${themeClasses.bg.surface} border border-red-200 px-4 py-3 rounded-xl mt-4 text-sm font-medium`}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className={`${themeClasses.status.success} ${themeClasses.bg.surface} border border-green-200 px-4 py-3 rounded-xl mt-4 text-sm font-medium`}
          >
            {success === true ? "Operation successful!" : success}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
