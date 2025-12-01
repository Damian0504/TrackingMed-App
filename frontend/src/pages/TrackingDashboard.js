// src/pages/TrackingDashboard.js
import React, { useEffect, useState } from "react";
import AmbulanceMap from "../components/AmbulanceMap";
import AmbulanceList from "../components/AmbulanceList";

export default function TrackingDashboard() {
  const [ambulances, setAmbulances] = useState({}); // {id: {ambulancia_id, lat, lng, ts, estado, patente}}
  const [selectedAmb, setSelectedAmb] = useState(null);
  const [room, setRoom] = useState("main");
  const [filterEmpresa, setFilterEmpresa] = useState(null);

  // Helper para update de ambulancias (recibido por socket)
  const handleIncomingPosition = (payload) => {
    // payload: {ambulancia_id, lat, lng, ts}
    setAmbulances(prev => {
      const copy = { ...prev };
      const id = payload.ambulancia_id ?? payload.ambulanciaId ?? payload.id;
      if (!id) return prev;
      copy[id] = {
        ...(copy[id] || {}),
        ambulancia_id: id,
        lat: Number(payload.lat),
        lng: Number(payload.lng),
        ts: payload.ts,
        // estado / patente podrían venir del fetch inicial; si no, quedan undefined
      };
      return copy;
    });
  };

  // Inicial: podés usar fetch para obtener meta (patentes/estado) y mergearlas
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SOCKET_IO_URL}/ambulancias`);
        if (!res.ok) return;
        const data = await res.json();
        setAmbulances(prev => {
          const merged = { ...prev };
          data.forEach(a => {
            merged[a.id] = {
              ...(merged[a.id] || {}),
              ambulancia_id: a.id,
              patente: a.patente,
              estado: a.estado,
              lat: a.ubicacion_lat,
              lng: a.ubicacion_lng
            };
          });
          return merged;
        });
      } catch (e) {
        console.error("No se pudo cargar meta ambulancias", e);
      }
    };
    fetchMeta();
  }, []);

  return (
    <div className="h-screen flex">
      {/* MAPA (70%) */}
      <div className="w-3/4 h-full">
        <AmbulanceMap
          ambulances={ambulances}
          onSelectAmb={(id) => setSelectedAmb(id)}
          onIncomingPosition={handleIncomingPosition}
          room={room}
        />
      </div>

      {/* PANEL LATERAL (30%) */}
      <div className="w-1/4 h-full bg-gray-50 border-l p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Panel de Despacho</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Room / Empresa</label>
          <input
            className="mt-1 w-full border rounded p-2"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="main"
          />
          <p className="text-xs text-gray-500 mt-1">Cambia la room para ver otra flota</p>
        </div>

        <AmbulanceList
          ambulances={ambulances}
          onSelect={(id) => setSelectedAmb(id)}
          selectedId={selectedAmb}
        />

        {/* Panel de acciones rápidas (ejemplo asignar) */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Acciones</h3>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded mb-2"
            onClick={() => alert("Funcionalidad de asignación: implementar endpoint backend")}
          >
            Asignar Ambulancia
          </button>
          <button
            className="w-full bg-red-600 text-white py-2 rounded"
            onClick={() => alert("Cancelar pedido — implementar lógica")}
          >
            Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
