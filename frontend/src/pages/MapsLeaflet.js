import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const userIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapsLeaflet = () => {
  const [position, setPosition] = useState(null);
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
        setLoading(false);

        // Call Nominatim API for nearby places
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=kabadiwala+scrap+e-waste+center+near+${coords.lat},${coords.lng}&limit=10`
        );
        const data = await response.json();

        const places = data.map((place) => ({
          name: place.display_name.split(',')[0],
          address: place.display_name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        }));

        setNearbyCenters(places);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return loading ? (
    <p style={{ padding: '20px' }}>Fetching your location...</p>
  ) : (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '30%',
          padding: '1rem',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
          borderRight: '1px solid #ddd',
        }}
      >
        <h2>Nearby Kabadiwalas (Dynamic)</h2>
        {nearbyCenters.length === 0 ? (
          <p>No nearby kabadiwalas found.</p>
        ) : (
          nearbyCenters.map((place, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '6px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <h4>{place.name}</h4>
              <p>{place.address}</p>
            </div>
          ))
        )}
      </div>

      {/* Map */}
      <div style={{ width: '70%' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {position && (
            <Marker position={position} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {nearbyCenters.map((place, index) => (
            <Marker key={index} position={{ lat: place.lat, lng: place.lng }}>
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapsLeaflet;
