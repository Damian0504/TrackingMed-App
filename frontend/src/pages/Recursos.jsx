import React from "react";
import { Link } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";

export default function Recursos() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-md"
        style={{ backgroundColor: "#0A9D8A" }}
      >
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <FaAmbulance className="text-white text-4xl" />
          <h1 className="text-3xl font-bold text-white tracking-wide">TrackingMed</h1>
        </Link>

        <div className="flex space-x-4">
          <Link to="/login" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100">
            Iniciar sesión
          </Link>
          <Link to="/register" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100">
            Registrarse
          </Link>
        </div>
      </header>

      {/* TITULO 1 */}
      <div className="w-full py-10 bg-blue-600 text-center text-white shadow-md">
        <h2 className="text-4xl font-bold tracking-wide">DESPACHO DE OPERACIONES</h2>
      </div>

      {/* SUB NAV */}
      <nav className="bg-white shadow border-b">
        <ul className="flex justify-center space-x-12 font-semibold text-gray-700 py-4 text-lg">
          
          <li><Link to="/nosotros" className="hover:text-teal-700 transition">Nosotros</Link></li>

          <li className="relative group cursor-pointer">
            <span className="hover:text-teal-700 transition">Servicios</span>

            <ul className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg border rounded-lg
                           opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                           transition-all duration-200 w-60 z-50">

              <li><Link to="/solicitar-ambulancia" className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700">🚑 Solicitar ambulancia</Link></li>
              <li><Link to="/programar-traslado" className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700">📅 Programar traslado</Link></li>
              <li><Link to="/tracking" className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700">📍 Tracking en tiempo real</Link></li>
            </ul>
          </li>

          <li><Link to="/recursos" className="hover:text-teal-700 transition">Nuestros Recursos</Link></li>
          <li><Link to="/contacto" className="hover:text-teal-700 transition">Contacto</Link></li>

        </ul>
      </nav>

      {/* SECCIÓN PRINCIPAL */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10 py-16">

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            El Despacho de Operaciones es el motor operativo de la empresa.
            Todo el proceso de solicitud, triage, asignación de recursos y seguimiento,
            se gestiona en tiempo real para brindar respuestas rápidas y seguras.
          </p>

          <p>
            Los operadores están capacitados continuamente para ofrecer contención
            y asistencia previa al arribo de las ambulancias.
          </p>

          <p>Toda la flota se monitorea en tiempo real mediante sistemas digitales avanzados.</p>

          <p className="font-semibold">
            TrackingMed cuenta con certificación ISO 9001:2015 para la
            prestación de servicios prehospitalarios en todo el país.
          </p>
        </div>

        {/* IMAGEN */}
        <div>
          <img src="/assets/recursos/recursos1.jpg" alt="Despacho de operaciones"
               className="rounded-xl shadow-xl object-cover w-full" />
        </div>
      </section>

      {/* TITULO 2 */}
      <div className="w-full py-10 bg-blue-600 text-center text-white shadow-md">
        <h2 className="text-4xl font-bold tracking-wide">UNIDADES MÓVILES</h2>
      </div>

      {/* SECCIÓN 2 */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10 py-16">

        <div className="text-gray-700 text-lg leading-relaxed">
          <h3 className="font-bold text-2xl mb-4">AMBULANCIAS DE URGENCIAS</h3>
          <p>
            Unidades totalmente equipadas, seguras para el paciente y tripuladas por
            personal especializado, preparadas para responder ante cualquier emergencia.
          </p>
        </div>

        <div>
          <img src="/assets/recursos/recursos2.jpg" alt="Unidades móviles"
               className="rounded-xl shadow-xl object-cover w-full" />
        </div>
      </section>

      {/* TIPOS */}
      <section className="max-w-4xl mx-auto text-center py-10 px-6 space-y-3 text-lg text-gray-700">
        <p className="font-bold text-2xl">UNIDADES MÓVILES</p>
        {[
          "DE ALTA COMPLEJIDAD",
          "DE PRIMERA RESPUESTA",
          "PEDIÁTRICAS Y NEONATALES",
          "DE PACIENTE CRÍTICO",
          "DE VISITA MÉDICA",
          "4×4 OFF ROAD",
        ].map((u) => (
          <p key={u}>{u}</p>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 mt-10 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaAmbulance className="text-teal-400 text-3xl" />
              <h1 className="text-2xl font-bold text-white">TrackingMed</h1>
            </div>
            <p className="text-gray-400">
              Tecnología avanzada para emergencias y traslados médicos.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Accesos</h3>
            <ul className="space-y-2">
              <li className="hover:text-teal-400">Nosotros</li>
              <li className="hover:text-teal-400">Servicios</li>
              <li className="hover:text-teal-400">Empresas</li>
              <li className="hover:text-teal-400">Contacto</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>Email: trackingmed@emergencias.com</li>
              <li>Tel: +54 11 35899632</li>
              <li>CABA, Buenos Aires</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} TrackingMed — Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
