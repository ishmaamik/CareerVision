import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position, isUserLocation }) => {
  return position ? (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: isUserLocation
          ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
          : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })}
    >
      <Popup>
        {isUserLocation ? 'Your Location' : 'Selected Location'} <br />
        {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position]);
  return null;
};

const SimplifiedMap = ({
  onLocationSelect,
  height = '400px',
  width = '500px',
  initialViewport = { latitude: 23.8103, longitude: 90.4125, zoom: 12 },
  isProfile = false,
}) => {
  const [position, setPosition] = useState(null);
  const [isUserLocation, setIsUserLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');

  const handleMapClick = async (latlng) => {
    if (isProfile) return;
    const newPos = [latlng.lat, latlng.lng];
    setPosition(newPos);
    setIsUserLocation(false);
    await reverseGeocode(newPos[0], newPos[1]);
  };

  const detectUserLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        setIsUserLocation(true);
        await reverseGeocode(coords[0], coords[1]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const locationData = {
        latitude: lat,
        longitude: lng,
        placeName: data.display_name || `${lat}, ${lng}`,
        isUserLocation,
        rawData: data,
      };
      setAddress(data.display_name);
      onLocationSelect(locationData);
    } catch (err) {
      console.error('Reverse geocoding failed', err);
    }
  };

  const handleSearch = async (e) => {
    e?.preventDefault(); // Optional prevention for direct calls
    if (!searchQuery.trim()) {
      alert('Please enter a location to search');
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
        setIsUserLocation(false);
        await reverseGeocode(lat, lon);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Search error', err);
      alert('Failed to search. Please try again.');
    }
  };

  return (
    <div className="space-y-4" style={{ width }}>
      {/* Search Input and Button */}
      {!isProfile && (
        <div className="flex items-center gap-2 mb-4">
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </div>
          <button
            type="button" // Important: use type="button" to prevent form submission
            onClick={handleSearch}
            style={{backgroundColor:'black'}}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      )}

      {/* Map */}
      <div style={{ height }} className="rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[initialViewport.latitude, initialViewport.longitude]}
          zoom={initialViewport.zoom}
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

      {/* Location Info */}
      <div className="bg-white p-4 rounded shadow-sm border">
        <div className="flex items-start">
          <FaMapMarkerAlt className={`mt-1 mr-2 ${isUserLocation ? 'text-blue-500' : 'text-gray-500'}`} />
          <div>
            <h3 className="font-medium text-gray-800">
              {isUserLocation ? 'Your Current Location' : position ? 'Selected Location' : 'No location selected'}
            </h3>
            {position ? (
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

      {/* User Location Button */}
      {isProfile && (
        <button
          onClick={detectUserLocation}
          style={{backgroundColor:'black'}}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
        >
          <FaCrosshairs /> Detect My Location
        </button>
      )}
    </div>
  );
};

export default SimplifiedMap;
