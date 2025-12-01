import React from "react";
import { Routes, Route } from "react-router-dom";

// Protección
import ProtectedRoute from "../components/ProtectedRoute";

// Páginas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import Recursos from "../pages/Recursos";
import Servicios from "../pages/Servicios";
import RecuperarPassword from "../pages/RecuperarPassword";
import RestablecerPassword from "../pages/RestablecerPassword";

// Servicios (protected)
import SolicitarAmbulancia from "../pages/servicios/SolicitarAmbulancia";
import ProgramarTraslado from "../pages/servicios/ProgramarTraslado";
import TrackingTiempoReal from "../pages/servicios/TrackingTiempoReal";

// Otros
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home pública */}
      <Route path="/" element={<Home />} />

      {/* Páginas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/recursos" element={<Recursos />} />
      <Route path="/recuperar-password" element={<RecuperarPassword />} />
      <Route path="/restablecer-password" element={<RestablecerPassword />} />

      {/* Landing de servicios */}
      <Route path="/servicios" element={<Servicios />} />

      {/* ---------------------- SERVICIOS (con login) ---------------------- */}
      {/* Rutas directas */}
      <Route
        path="/solicitar-ambulancia"
        element={
          <ProtectedRoute>
            <SolicitarAmbulancia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/programar-traslado"
        element={
          <ProtectedRoute>
            <ProgramarTraslado />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tracking"
        element={
          <ProtectedRoute>
            <TrackingTiempoReal />
          </ProtectedRoute>
        }
      />

      {/* Rutas con prefijo /servicios/... (coinciden con los Links en Servicios.jsx) */}
      <Route
        path="/servicios/solicitar-ambulancia"
        element={
          <ProtectedRoute>
            <SolicitarAmbulancia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/servicios/programar-traslado"
        element={
          <ProtectedRoute>
            <ProgramarTraslado />
          </ProtectedRoute>
        }
      />

      <Route
        path="/servicios/tracking"
        element={
          <ProtectedRoute>
            <TrackingTiempoReal />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
