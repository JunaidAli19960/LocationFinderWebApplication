// src/MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

import customIconUrl from 'C:\\Users\\paulp\\Desktop\\J Projects\\Location Finder\\my-app\\src\\map-marker-512.png';

const MapUpdater = ({ position }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(position, map.getZoom());  // Update the map view to the new position
  }, [position, map]);

  return null;
};

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]);  // Default position
  const [markers, setMarkers] = useState([]);
  const [query, setQuery] = useState('');  // Query for specific restaurant types (e.g., 'Italian')
  const [error, setError] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);  // List of nearby places
  const [radius, setRadius] = useState(1000);  // Search radius in meters (default: 1km)

  // Function to show user's current location
  const showMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = [latitude, longitude];
          setPosition(userLocation);
          setMarkers([userLocation]);  // Update marker for user's current location
          setError('');  // Clear any previous errors
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError('Unable to fetch your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to search for nearby places (e.g., restaurants) based on user's location
  const searchNearbyPlaces = async () => {
    try {
      // Build the Overpass API query
      const overpassQuery = `
        [out:json];
        node
          ["amenity"="restaurant"]
          (around:${radius},${position[0]},${position[1]})
          ${query ? `["cuisine"~"${query}"]` : ''};  // Filter by restaurant type if specified
        out body;
      `;

      // Make a request to Overpass API
      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: { data: overpassQuery },
      });

      const results = response.data.elements;

      if (results.length > 0) {
        // Update the state with the list of nearby places
        setNearbyPlaces(results);

        // Optionally, add markers for all places on the map
        const placeMarkers = results.map((place) => [place.lat, place.lon]);
        setMarkers(placeMarkers);

        setError('');  // Clear any previous errors
      } else {
        setError('No places found.');
        setNearbyPlaces([]);
        setMarkers([]);
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setError('An error occurred while searching.');
    }
  };

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: customIconUrl,  // Path to your custom icon
    iconSize: [32, 32],      // Size of the icon
    iconAnchor: [16, 32],    // Anchor point of the icon (where the marker will be placed)
    popupAnchor: [0, -32],   // Anchor point for the popup
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a specific type of restaurant (e.g., Italian, Halal)"
      />
      <button onClick={searchNearbyPlaces}>Search Nearby Places</button>
      <button onClick={showMyLocation}>Show My Location</button>
      
      <label>
        Radius (meters):
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </label>
      
      {error && <p>{error}</p>}  {/* Display errors */}

      {/* List of nearby places */}
      <ul>
        {nearbyPlaces.map((place, index) => (
          <li key={index}>
            {place.tags.name || 'Unnamed'} - {place.lat}, {place.lon}
          </li>
        ))}
      </ul>

      <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater position={position} />
        {markers.map((pos, index) => (
          <Marker key={index} position={pos} icon={customIcon}>
            <Popup>
              {index === 0 ? 'Your location' : 'Nearby place'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
