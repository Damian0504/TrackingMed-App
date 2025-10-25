// src/hooks/useTracking.jsx
import { useEffect, useRef, useState } from "react";
import socket from "../api/socket"; // usa el socket correcto

export default function useTracking({ room = "ambulancias", interval = 5000 } = {}) {
  const [position, setPosition] = useState(null);
  const watchId = useRef(null);
  const isTracking = useRef(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocalización no soportada por este navegador.");
      return;
    }

    // Conectar al socket y unirse a la sala
    if (!isTracking.current) {
      socket.emit("join_room", { room });
      isTracking.current = true;
      console.log(`🛰️ Tracking activado para la sala: ${room}`);
    }

    // Watch position en tiempo real
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const payload = {
          from: socket.id || "unknown",
          lat: latitude,
          lng: longitude,
          ts: new Date().toISOString(),
          room,
        };

        setPosition({ lat: latitude, lng: longitude });

        // Emitir ubicación actual al backend
        socket.emit("location:update", payload);
        console.log("Enviada ubicación:", payload);
      },
      (err) => {
        console.error("Error al obtener la ubicación:", err.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    // Cleanup al desmontar
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
      socket.emit("leave_room", { room });
      console.log(`Tracking detenido para la sala: ${room}`);
      isTracking.current = false;
    };
  }, [room, interval]);

  return position; // devuelve la última posición conocida
}
