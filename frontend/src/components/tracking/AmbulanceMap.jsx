// src/components/tracking/AmbulanceMap.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// --- Fix: Importar estilos de Leaflet ---
import "leaflet/dist/leaflet.css";

// --- URL WebSocket desde .env ---
const WS_URL = import.meta.env.VITE_WS_URL || "ws://127.0.0.1:8000/ws";

// ----------------------------------------------------
// 1. ICONOS PERSONALIZADOS SEGÚN ESTADO DE AMBULANCIA
// ----------------------------------------------------
const iconAmbulancia = (color) =>
  L.divIcon({
    className: "",
    html: `
      <svg width="36" height="36" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      </svg>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

// colores por estado
const getColorByState = (estado) => {
  switch (estado) {
    case "disponible":
      return "#16a34a"; // verde
    case "en_servicio":
      return "#f59e0b"; // amarillo
    default:
      return "#ef4444"; // rojo
  }
};

// ------------------------------------------------------
// 2. COMPONENTE PARA MOVER EL MAPA AL AMBULANCIA SELECCIONADA
// ------------------------------------------------------
function FlyToSelected({ selected, ambulances }) {
  const map = useMap();

  useEffect(() => {
    if (!selected || !ambulances[selected]) return;

    const amb = ambulances[selected];
    if (!amb.lat || !amb.lng) return;

    map.flyTo([amb.lat, amb.lng], 15, { duration: 1.2 });
  }, [selected, ambulances, map]);

  return null;
}

// ------------------------------------------------------
// 3. COMPONENTE PRINCIPAL: MAPA + WEBSOCKET + MARCADORES
// ------------------------------------------------------
export default function AmbulanceMap({
  ambulances,
  onIncomingPosition,
  onSelectAmb,
  selectedAmb,
  room,
}) {
  const wsRef = useRef(null);

  // --------------------------------------
  // WebSocket: conectar y escuchar eventos
  // --------------------------------------
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?room=${room}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WS] conectado a room:", room);
    };

    ws.onerror = (err) => {
      console.error("[WS] error:", err);
    };

    ws.onclose = () => {
      console.warn("[WS] desconectado, reintentando en 2s…");
      setTimeout(() => {
        wsRef.current = new WebSocket(`${WS_URL}?room=${room}`);
      }, 2000);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "location") {
          onIncomingPosition(payload.data);
        }
      } catch (err) {
        console.error("[WS] mensaje inválido:", event.data);
      }
    };

    return () => ws.close();
  }, [room, onIncomingPosition]);

  // --------------------------------------
  // Coordenadas iniciales (CABA)
  // --------------------------------------
  const defaultCenter = [-34.6037, -58.3816];

  const ambArray = Object.values(ambulances || {});

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
    >
      {/* Capa base de OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Mover mapa si se selecciona ambulancia */}
      <FlyToSelected selected={selectedAmb} ambulances={ambulances} />

      {/* Marcadores de ambulancias */}
      {ambArray.map((a) =>
        a.lat && a.lng ? (
          <Marker
            key={a.ambulancia_id}
            position={[a.lat, a.lng]}
            icon={iconAmbulancia(getColorByState(a.estado))}
            eventHandlers={{
              click: () => onSelectAmb && onSelectAmb(a.ambulancia_id),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>Amb #{a.ambulancia_id}</strong><br />
                Estado: {a.estado} <br />
                {a.patente && <>Patente: {a.patente}<br /></>}
                {a.lat && a.lng && (
                  <>
                    Lat: {a.lat.toFixed(5)} <br />
                    Lng: {a.lng.toFixed(5)}
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
