import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Marker component with color based on user location or selected
const LocationMarker = ({ position, isUserLocation }) => {
  if (!position) return null;

  const icon = L.icon({
    iconUrl: isUserLocation
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        {isUserLocation ? 'Your Location' : 'Selected Location'}
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

const SimplifiedMap = ({ onLocationSelect, height = '400px', width = '500px', isProfile = false }) => {
  const { user } = useSelector((state) => state.user);

  // Viewport state - initialized with default coordinates, updated if user available
  const [viewport, setViewport] = useState({
    latitude: 23.750183,
    longitude: 90.381320,
    zoom: 12,
  });

  // Selected position and state to distinguish if it's user location or search/selected
  const [position, setPosition] = useState(null);
  const [isUserLocation, setIsUserLocation] = useState(false);

  // Search input and reverse geocoding address
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  // Update viewport when user info becomes available
  useEffect(() => {
    if (user && user.lat && user.lon) {
      setViewport({
        latitude: Number(user.lat),
        longitude: Number(user.lon),
        zoom: 12,
      });
      setPosition([Number(user.lat), Number(user.lon)]);
      setIsUserLocation(true);
      reverseGeocode(Number(user.lat), Number(user.lon));
    }
  }, [user]);

  // Reverse geocoding function
  const reverseGeocode = useCallback(async (lat, lon) => {
    setLoadingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name || `${lat}, ${lon}`);
      onLocationSelect({
        latitude: lat,
        longitude: lon,
        placeName: data.display_name || `${lat}, ${lon}`,
        isUserLocation,
        rawData: data,
      });
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      setAddress('');
    } finally {
      setLoadingAddress(false);
    }
  }, [isUserLocation, onLocationSelect]);

  // Handle map clicks - do nothing if in profile mode
  const handleMapClick = async (latlng) => {
    if (isProfile) return;
    const coords = [latlng.lat, latlng.lng];
    setPosition(coords);
    setIsUserLocation(false);
    await reverseGeocode(coords[0], coords[1]);
  };

  // Detect user geolocation
  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        setIsUserLocation(true);
        await reverseGeocode(coords[0], coords[1]);
      },
      (err) => {
        console.error(err);
        alert('Unable to retrieve your location.');
      },
      { enableHighAccuracy: true }
    );
  };

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Please enter a location to search.');
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) {
        alert('Location not found. Please try a different search term.');
        return;
      }
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPosition([lat, lon]);
      setIsUserLocation(false);
      await reverseGeocode(lat, lon);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to search. Please try again.');
    }
  };

  return (
    <div className="space-y-4" style={{ width }}>
      {/* Search input & button (hide if profile) */}
      {!isProfile && (
        <form className="flex items-center gap-2 mb-4" onSubmit={handleSearchSubmit}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for location..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: 'black' }}
          >
            Search
          </button>
        </form>
      )}

      {/* Map container */}
      <div style={{ height }} className="rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[viewport.latitude, viewport.longitude]}
          zoom={viewport.zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler onClick={handleMapClick} />
          <MapUpdater position={position} />
          <LocationMarker position={position} isUserLocation={isUserLocation} />
        </MapContainer>
      </div>

      {/* Location info display */}
      <div className="bg-white p-4 rounded shadow-sm border">
        <div className="flex items-start">
          <FaMapMarkerAlt className={`mt-1 mr-2 ${isUserLocation ? 'text-blue-500' : 'text-gray-500'}`} />
          <div>
            <h3 className="font-medium text-gray-800">
              {isUserLocation ? 'Your Current Location' : position ? 'Selected Location' : 'No location selected'}
            </h3>
            {loadingAddress ? (
              <p className="text-sm text-gray-600 italic">Loading address...</p>
            ) : position ? (
              <>
                <p className="text-sm text-gray-600">{address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500 italic">Click on the map or use search to select a location.</p>
            )}
          </div>
        </div>
      </div>

      {/* Detect user location button (only in profile mode) */}
      {isProfile && (
        <button
          onClick={detectUserLocation}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
          style={{ backgroundColor: 'black' }}
          type="button"
        >
          <FaCrosshairs />
          Detect My Location
        </button>
      )}
    </div>
  );
};

export default SimplifiedMap;
