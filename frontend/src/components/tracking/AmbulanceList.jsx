// src/components/tracking/AmbulanceList.jsx
import React from "react";

// función para color por estado
const stateColor = (estado) => {
  switch (estado) {
    case "disponible":
      return "text-green-600 bg-green-50 border-green-400";
    case "en_servicio":
      return "text-orange-600 bg-orange-50 border-orange-400";
    default:
      return "text-red-600 bg-red-50 border-red-400";
  }
};

export default function AmbulanceList({ ambulances = {}, onSelect, selectedId }) {
  const arr = Object.values(ambulances).sort(
    (a, b) => (a.ambulancia_id || 0) - (b.ambulancia_id || 0)
  );

  return (
    <div>
      <h4 className="font-semibold mb-2">
        Ambulancias <span className="text-gray-500 text-sm">({arr.length})</span>
      </h4>

      <div className="space-y-3">
        {arr.map((a) => (
          <div
            key={a.ambulancia_id}
            className={`p-3 rounded-lg shadow-sm border transition cursor-pointer 
              ${
                selectedId === a.ambulancia_id
                  ? "border-blue-500 bg-white"
                  : "bg-white"
              }`}
            onClick={() => onSelect && onSelect(a.ambulancia_id)}
          >
            {/* FILA SUPERIOR */}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900">
                  Amb #{a.ambulancia_id}
                  {a.patente ? (
                    <span className="font-medium text-gray-600 ml-1">
                      • {a.patente}
                    </span>
                  ) : null}
                </div>

                {a.lat && a.lng && (
                  <div className="text-xs text-gray-500 mt-1">
                    Lat: {a.lat.toFixed(5)} • Lng: {a.lng.toFixed(5)}
                  </div>
                )}
              </div>

              {/* ESTADO */}
              <span
                className={`px-2 py-1 text-xs rounded border font-medium ${stateColor(
                  a.estado
                )}`}
              >
                {a.estado === "disponible"
                  ? "Disponible"
                  : a.estado === "en_servicio"
                  ? "En servicio"
                  : "Mantenimiento"}
              </span>
            </div>

            {/* BOTÓN VER EN MAPA */}
            <button
              className="mt-3 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(a.ambulancia_id);
              }}
            >
              Ver en mapa
            </button>
          </div>
        ))}

        {arr.length === 0 && (
          <div className="text-sm text-gray-500">
            No hay ambulancias cargadas
          </div>
        )}
      </div>
    </div>
  );
}
