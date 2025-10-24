// src/components/AmbulanceTracker.js
import React, { useEffect, useState } from "react";
import socket from "../api/socket";
import AmbulanceMap from "./AmbulanceMap"; //  importá el nuevo mapa

function AmbulanceTracker() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    socket.on("server:hello", (data) => {
      console.log("Servidor:", data.msg);
    });

    socket.on("location:update", (data) => {
      console.log("Nueva ubicación:", data);
      setLocations((prev) => {
        const exists = prev.find((l) => l.from === data.from);
        if (exists) {
          return prev.map((l) => (l.from === data.from ? data : l));
        }
        return [...prev, data];
      });
    });

    socket.emit("join_room", { room: "ambulancias" });

    return () => {
      socket.off("server:hello");
      socket.off("location:update");
    };
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Tracking en Tiempo Real</h2>
      <AmbulanceMap locations={locations} /> {/* pasamos las ubicaciones al mapa */}
    </div>
  );
}

export default AmbulanceTracker;
