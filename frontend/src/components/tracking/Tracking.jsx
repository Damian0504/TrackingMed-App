// src/components/tracking/Tracking.jsx
import React, { useState, useEffect } from "react";
import AmbulanceMap from "./AmbulanceMap";
import AmbulanceList from "./AmbulanceList";

export default function Tracking() {
  const [ambulances, setAmbulances] = useState({});
  const [selectedAmb, setSelectedAmb] = useState(null);
  const [room, setRoom] = useState("main");

  // -------------------------------
  // 1. Cargar ambulancias desde API
  // -------------------------------
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

        const res = await fetch(`${API_URL}/ambulancias`);
        if (!res.ok) {
          console.warn("No se pudo cargar ambulancias desde la API");
          return;
        }

        const data = await res.json();
        setAmbulances((prev) => {
          const merged = { ...prev };
          data.forEach((a) => {
            merged[a.id] = {
              ...(merged[a.id] || {}),
              ambulancia_id: a.id,
              patente: a.patente,
              estado: a.estado,
              lat: a.ubicacion_lat,
              lng: a.ubicacion_lng,
            };
          });
          return merged;
        });
      } catch (err) {
        console.error("Error al cargar ambulancias:", err);
      }
    };

    fetchAmbulances();
  }, []);

  // ------------------------------------------------------
  // 2. Actualización de posiciones que vienen desde WebSocket
  // ------------------------------------------------------
  const handleIncomingPosition = (payload) => {
    const id = payload.ambulancia_id ?? payload.id;
    if (!id) return;

    setAmbulances((prev) => {
      const updated = { ...prev };
      updated[id] = {
        ...(updated[id] || {}),
        ambulancia_id: id,
        lat: Number(payload.lat),
        lng: Number(payload.lng),
        ts: payload.ts ?? Date.now(),
      };
      return updated;
    });
  };

  return (
    <div className="h-screen flex">
      {/* MAPA IZQUIERDA */}
      <div className="w-3/4 h-full">
        <AmbulanceMap
          ambulances={ambulances}
          onIncomingPosition={handleIncomingPosition}
          onSelectAmb={(id) => setSelectedAmb(id)}
          selectedAmb={selectedAmb}
          room={room}
        />
      </div>

      {/* PANEL DERECHO */}
      <div className="w-1/4 h-full bg-gray-50 border-l p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Panel de Despacho</h2>

        {/* Selector de Room */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Room / Empresa</label>
          <input
            className="mt-1 w-full border rounded p-2"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="main"
          />
          <p className="text-xs text-gray-500 mt-1">
            Usá rooms para separar flotas por empresa o zona.
          </p>
        </div>

        {/* Lista de ambulancias */}
        <AmbulanceList
          ambulances={ambulances}
          selectedId={selectedAmb}
          onSelect={(id) => setSelectedAmb(id)}
        />

        {/* Acciones */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Acciones</h3>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded mb-2"
            onClick={() => alert("Integrar /pedidos/asignar")}
          >
            Asignar Ambulancia
          </button>

          <button
            className="w-full bg-red-600 text-white py-2 rounded"
            onClick={() => alert("Integrar /pedidos/cancelar")}
          >
            Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
