import React, { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../styles/themes";

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Marker component with color based on user location or selected
const LocationMarker = ({ position, isUserLocation }) => {
  if (!position) return null;

  const icon = L.icon({
    iconUrl: isUserLocation
      ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
      : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        {isUserLocation ? "Your Location" : "Selected Location"}
        <br />
        {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
};

// Component to handle map clicks and trigger callback
const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: (e) => onClick(e.latlng),
  });
  return null;
};

// Component to update map view when position changes
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position, map]);
  return null;
};

const LocationMap = ({
  onLocationSelect,
  height = "400px",
  width = "500px",
  showSearch = true,
  showLocationButton = true,
  isProfile = false,
}) => {
  const { user } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  // State management
  const [mapCenter, setMapCenter] = useState({
    latitude: 23.750183,
    longitude: 90.38132,
    zoom: 12,
  });
  const [position, setPosition] = useState(null);
  const [isUserLocation, setIsUserLocation] = useState(false);
  const [address, setAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Reverse geocoding function
  const reverseGeocode = useCallback(
    async (lat, lon, isUser = false) => {
      setLoadingAddress(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );

        if (!response.ok) {
          throw new Error("Geocoding failed");
        }

        const data = await response.json();
        const displayName =
          data.display_name || `${lat.toFixed(6)}, ${lon.toFixed(6)}`;

        setAddress(displayName);

        // Call the parent callback
        if (onLocationSelect) {
          onLocationSelect({
            latitude: lat,
            longitude: lon,
            placeName: displayName,
            isUserLocation: isUser,
            rawData: data,
          });
        }
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
        const fallbackAddress = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
        setAddress(fallbackAddress);

        if (onLocationSelect) {
          onLocationSelect({
            latitude: lat,
            longitude: lon,
            placeName: fallbackAddress,
            isUserLocation: isUser,
            rawData: null,
          });
        }
      } finally {
        setLoadingAddress(false);
      }
    },
    [onLocationSelect]
  );

  // Initialize with user location if available (only once)
  useEffect(() => {
    if (user && user.lat && user.lon && !hasInitialized) {
      const userPos = [parseFloat(user.lat), parseFloat(user.lon)];
      setMapCenter({
        latitude: parseFloat(user.lat),
        longitude: parseFloat(user.lon),
        zoom: 12,
      });
      setPosition(userPos);
      setIsUserLocation(true);
      setHasInitialized(true);

      // Call reverseGeocode without triggering re-renders
      const initReverseGeocode = async () => {
        setLoadingAddress(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userPos[0]}&lon=${userPos[1]}&addressdetails=1`
          );

          if (response.ok) {
            const data = await response.json();
            const displayName =
              data.display_name ||
              `${userPos[0].toFixed(6)}, ${userPos[1].toFixed(6)}`;
            setAddress(displayName);

            // Call parent callback only once during initialization
            if (onLocationSelect) {
              onLocationSelect({
                latitude: userPos[0],
                longitude: userPos[1],
                placeName: displayName,
                isUserLocation: true,
                rawData: data,
              });
            }
          }
        } catch (error) {
          console.error("Initial reverse geocoding failed:", error);
        } finally {
          setLoadingAddress(false);
        }
      };

      initReverseGeocode();
    }
  }, [user, hasInitialized, onLocationSelect]);

  // Handle map clicks
  const handleMapClick = async (latlng) => {
    const coords = [latlng.lat, latlng.lng];
    setPosition(coords);
    setIsUserLocation(false);
    await reverseGeocode(coords[0], coords[1], false);
  };

  // Detect user geolocation with enhanced error handling
  const detectUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setMapCenter({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 14,
        });
        setPosition(coords);
        setIsUserLocation(true);
        reverseGeocode(coords[0], coords[1], true);
        setIsDetecting(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let message = "Unable to retrieve your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }

        alert(message);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [reverseGeocode]);

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a location to search.");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) {
        alert("Location not found. Please try a different search term.");
        return;
      }
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPosition([lat, lon]);
      setIsUserLocation(false);
      await reverseGeocode(lat, lon, false);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Failed to search. Please try again.");
    }
  };

  return (
    <div className="space-y-6" style={{ width }}>
      {/* Search input & button */}
      {showSearch && (
        <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className={`${themeClasses.text.muted}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for location..."
              className={`${componentStyles.input} pl-10`}
            />
          </div>
          <button
            type="submit"
            className={`${componentStyles.button.primary} px-6 py-3`}
          >
            Search
          </button>
        </form>
      )}

      {/* Map container */}
      <div
        style={{ height }}
        className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <MapContainer
          center={[mapCenter.latitude, mapCenter.longitude]}
          zoom={mapCenter.zoom}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MapClickHandler onClick={handleMapClick} />
          <MapUpdater position={position} />
          {position && (
            <LocationMarker
              position={position}
              isUserLocation={isUserLocation}
            />
          )}
        </MapContainer>
      </div>

      {/* Detect user location button */}
      {showLocationButton && (
        <button
          onClick={detectUserLocation}
          disabled={isDetecting}
          className={`${componentStyles.button.primary} w-full py-4 text-lg font-bold flex items-center justify-center gap-3 group transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          type="button"
        >
          <FaCrosshairs
            className={`text-xl transition-transform ${
              isDetecting ? "animate-spin" : "group-hover:scale-110"
            }`}
          />
          {isDetecting ? "Detecting Location..." : "Detect My Current Location"}
        </button>
      )}

      {/* Location info display */}
      <div
        className={`${themeClasses.bg.surface} p-4 rounded-xl shadow-lg ${themeClasses.border.primary} border`}
      >
        <div className="flex items-start">
          <FaMapMarkerAlt
            className={`mt-1 mr-3 text-xl ${
              isUserLocation
                ? themeClasses.brand.primary
                : themeClasses.text.muted
            }`}
          />
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${themeClasses.text.primary}`}>
              {isUserLocation
                ? "Your Current Location"
                : position
                ? "Selected Location"
                : "No location selected"}
            </h3>
            {loadingAddress ? (
              <p className={`text-sm ${themeClasses.text.muted} italic`}>
                Loading address...
              </p>
            ) : position ? (
              <>
                <p
                  className={`text-sm ${themeClasses.text.secondary} font-medium`}
                >
                  {address}
                </p>
                <p
                  className={`text-xs ${themeClasses.text.muted} mt-1 font-mono`}
                >
                  Coordinates: {position[0].toFixed(6)},{" "}
                  {position[1].toFixed(6)}
                </p>
              </>
            ) : (
              <p className={`text-sm ${themeClasses.text.muted} italic`}>
                Click on the map or use search to select a location.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Instructions when no location (especially for profile mode) */}
      {!position && isProfile && (
        <div
          className={`${themeClasses.bg.accent} p-4 rounded-xl ${themeClasses.border.primary} border`}
        >
          <div className="text-center">
            <FaMapMarkerAlt
              className={`mx-auto text-3xl mb-2 ${themeClasses.text.muted}`}
            />
            <h3
              className={`${themeClasses.text.primary} text-lg font-bold mb-1`}
            >
              Set Your Location
            </h3>
            <p className={`${themeClasses.text.muted} text-sm`}>
              Click "Detect My Current Location" or click anywhere on the map to
              set your location
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
