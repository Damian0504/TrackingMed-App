// src/components/AmbulanceMap.jsx
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "80vh", borderRadius: "12px" };
const defaultCenter = { lat: -34.6037, lng: -58.3816 };

export default function AmbulanceMap({ locations }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13}>
          {locations.map((loc, i) => (
            <Marker
              key={i}
              position={{ lat: loc.lat, lng: loc.lng }}
              label={`🚑 ${loc.from.slice(0, 4)}`}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
