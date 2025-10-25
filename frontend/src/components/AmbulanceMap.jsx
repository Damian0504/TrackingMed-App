// src/components/AmbulanceMap.jsx
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "12px",
};

const defaultCenter = { lat: -34.6037, lng: -58.3816 }; // Buenos Aires

export default function AmbulanceMap({ myPosition, ambulances = [] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, //  Tu API key
  });

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={myPosition || defaultCenter}
          zoom={13}
        >
          {/* 🧍 Mi posición */}
          {myPosition && (
            <Marker
              position={myPosition}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              title="Mi ubicación actual"
            />
          )}

          {/* Ambulancias recibidas del socket */}
          {ambulances.map((amb, i) => (
            <Marker
              key={i}
              position={{ lat: amb.lat, lng: amb.lng }}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/2966/2966481.png",
                scaledSize: new window.google.maps.Size(42, 42),
              }}
              title={`Ambulancia ${amb.from}`}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

