// Map.jsx
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Mapc = ({ nearsetPosition, shouldRenderMarker }) => {
  return (
    <MapContainer center={[32.886023, -3.9208655]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {shouldRenderMarker && nearsetPosition && (
        <Marker position={nearsetPosition}>
          <Popup>Nearest Bin</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Mapc;
