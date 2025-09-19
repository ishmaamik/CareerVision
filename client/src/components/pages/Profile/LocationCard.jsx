import React, { useEffect, useCallback } from "react";
import { FaMapMarkerAlt, FaCrosshairs, FaGlobeAmericas } from "react-icons/fa";
import LocationMap from "../LocationMap";
import { setCurrentLocation } from "../../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLocation } from "../../../api/location/location";
import { updateUserLocation } from "../../../redux/userSlice";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses } from "../../../styles/themes";

const LocationCard = () => {
  const { currentLocation } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);

  // Memoize the location select callback to prevent unnecessary re-renders
  const handleLocationSelect = useCallback(
    (location) => {
      console.log("User location:", location);
      // Save to profile
      dispatch(setCurrentLocation(location));
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentLocation) {
      // Update user location in Redux
      dispatch(
        updateUserLocation({
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
        })
      );

      // Send to API
      userLocation(
        {
          location: currentLocation.placeName,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        user.id
      );
    }
  }, [currentLocation, dispatch, user.id]);

  return (
    <div
      className={`w-full h-full ${themeClasses.bg.surface} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${themeClasses.border.primary} border`}
    >
      {/* Header */}
      <div
        className={`${themeClasses.bg.accent} px-6 py-4 rounded-t-2xl flex items-center ${themeClasses.border.divider} border-b`}
      >
        <div
          className={`${themeClasses.brand.bg} p-3 rounded-xl mr-4 shadow-lg`}
        >
          <FaMapMarkerAlt className="text-white text-xl" />
        </div>
        <h2 className={`${themeClasses.text.primary} font-bold text-2xl`}>
          Current Location
        </h2>
      </div>

      {/* Significantly Expanded Map Container */}
      <div className="p-4">
        <div
          className={`${themeClasses.bg.accent} p-2 rounded-xl ${themeClasses.border.primary} border overflow-hidden`}
        >
          <LocationMap
            height="580px"
            width="800px"
            showSearch={false}
            showLocationButton={true}
            isProfile={true}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>

      {/* Enhanced Location Info */}
      <div
        className={`${themeClasses.bg.accent} px-6 py-4 rounded-b-2xl ${themeClasses.border.divider} border-t`}
      >
        {currentLocation &&
        typeof currentLocation.latitude === "number" &&
        typeof currentLocation.longitude === "number" ? (
          <div className="space-y-4">
            {/* Location Header */}
            <div className="flex items-center justify-between">
              <h3
                className={`${themeClasses.text.primary} font-bold text-lg flex items-center`}
              >
                <FaGlobeAmericas
                  className={`${themeClasses.brand.primary} mr-3 text-xl`}
                />
                Location Details
              </h3>
              <span
                className={`${themeClasses.status.success} ${themeClasses.bg.surface} text-xs font-semibold px-3 py-1 rounded-full flex items-center`}
              >
                <FaCrosshairs className="mr-1" />
                Detected
              </span>
            </div>

            {/* Location Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Place Name */}
              <div
                className={`${themeClasses.bg.surface} p-4 rounded-lg ${themeClasses.border.primary} border`}
              >
                <p
                  className={`${themeClasses.text.muted} text-sm font-medium mb-1`}
                >
                  Current Location
                </p>
                <p className={`${themeClasses.text.primary} font-bold text-lg`}>
                  {currentLocation.placeName}
                </p>
              </div>

              {/* Coordinates */}
              <div
                className={`${themeClasses.bg.surface} p-4 rounded-lg ${themeClasses.border.primary} border`}
              >
                <p
                  className={`${themeClasses.text.muted} text-sm font-medium mb-1`}
                >
                  Coordinates
                </p>
                <p
                  className={`${themeClasses.text.secondary} text-lg font-mono font-bold`}
                >
                  {currentLocation.latitude.toFixed(6)},{" "}
                  {currentLocation.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${themeClasses.text.muted} text-center py-8`}>
            <div
              className={`${themeClasses.bg.surface} p-6 rounded-xl ${themeClasses.border.primary} border`}
            >
              <FaMapMarkerAlt className="mx-auto text-4xl mb-4" />
              <h3
                className={`${themeClasses.text.primary} text-xl font-bold mb-2`}
              >
                Location Detection
              </h3>
              <p className="text-lg mb-4">
                Click the location button in the map to detect your current
                position
              </p>
              <div className="flex items-center justify-center space-x-2">
                <FaCrosshairs className="text-lg" />
                <span className="font-semibold">
                  Look for the target icon in the map controls
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
