// src/pages/Servicios.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Ambulance,
  ClipboardList,
  MapPinned,
  ChevronRight,
} from "lucide-react";

export default function Servicios() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER VERDE AGUA GLOBAL */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-md"
        style={{ backgroundColor: "#0A9D8A" }}
      >
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <Ambulance className="text-white w-10 h-10" />
          <h1 className="text-3xl font-bold text-white tracking-wide">
            TrackingMed
          </h1>
        </Link>

        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="bg-teal-900 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-950 transition"
          >
            Registrarse
          </Link>
        </div>
      </header>

      {/* HEADER AZUL CLARO */}
      <div className="w-full py-10 bg-blue-600 text-center text-white shadow-md">
        <h2 className="text-4xl font-bold tracking-wide">SERVICIOS</h2>
      </div>

      {/* TARJETAS DE SERVICIOS */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* TARJETA 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition cursor-pointer">
          <Ambulance className="text-blue-600 w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Solicitar Ambulancia</h3>
          <p className="text-gray-600 mb-6">
            Atención inmediata para urgencias y emergencias médicas.
          </p>
          <Link
            to="/solicitar-ambulancia"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition"
          >
            <span>Ingresar</span>
            <ChevronRight size={20} />
          </Link>
        </div>

        {/* TARJETA 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition cursor-pointer">
          <ClipboardList className="text-blue-600 w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Programar Traslado</h3>
          <p className="text-gray-600 mb-6">
            Solicitá traslados programados para estudios o internaciones.
          </p>
          <Link
            to="/programar-traslado"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition"
          >
            <span>Ingresar</span>
            <ChevronRight size={20} />
          </Link>
        </div>

        {/* TARJETA 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition cursor-pointer">
          <MapPinned className="text-blue-600 w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Tracking en Tiempo Real</h3>
          <p className="text-gray-600 mb-6">
            Seguí la ubicación exacta de tu ambulancia en tiempo real.
          </p>
          <Link
            to="/tracking"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition"
          >
            <span>Ingresar</span>
            <ChevronRight size={20} />
          </Link>
        </div>

      </section>

      {/* FOOTER PROFESIONAL */}
      <footer className="bg-gray-900 text-gray-300 mt-10 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Ambulance className="text-teal-400 w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">TrackingMed</h1>
            </div>
            <p className="text-gray-400">
              Sistema integral de gestión y monitoreo de ambulancias para
              brindar respuestas médicas rápidas y confiables.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Accesos</h3>
            <ul className="space-y-2">
              <li className="hover:text-teal-400 cursor-pointer">Nosotros</li>
              <li className="hover:text-teal-400 cursor-pointer">Servicios</li>
              <li className="hover:text-teal-400 cursor-pointer">Empresas</li>
              <li className="hover:text-teal-400 cursor-pointer">Contacto</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Contacto</h3>
            <p>Email: trackingmed@emergencias.com</p>
            <p>Tel: +54 11 35899632</p>
            <p>CABA, Buenos Aires, Argentina</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} TrackingMed — Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
