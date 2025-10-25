// src/components/AmbulanceTracker.jsx
import React, { useEffect, useState } from "react";
import socket from "../api/socket";
import useTracking from "../hooks/useTracking";
import AmbulanceMap from "./AmbulanceMap";

function AmbulanceTracker() {
  const myPosition = useTracking({ room: "ambulancias" });
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    // Conexión y suscripción
    socket.emit("join_room", { room: "ambulancias" });

    //  Escuchar actualizaciones de ubicación desde el servidor
    socket.on("location:update", (data) => {
      console.log(" Nueva ubicación recibida:", data);
      setAmbulances((prev) => {
        const exists = prev.find((a) => a.from === data.from);
        if (exists) {
          // actualizar ambulancia existente
          return prev.map((a) => (a.from === data.from ? data : a));
        }
        // agregar nueva ambulancia
        return [...prev, data];
      });
    });

    // Cleanup al desmontar
    return () => {
      socket.off("location:update");
      socket.emit("leave_room", { room: "ambulancias" });
    };
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Tracking de Ambulancias en Tiempo Real</h2>
      <AmbulanceMap myPosition={myPosition} ambulances={ambulances} />
    </div>
  );
}

export default AmbulanceTracker;

