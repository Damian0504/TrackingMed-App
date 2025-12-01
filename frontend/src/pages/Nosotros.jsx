import React from "react";
import { Link } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";

export default function Nosotros() {
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
          <Link to="/login" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">Iniciar sesión</Link>
          <Link to="/register" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">Registrarse</Link>
        </div>
      </header>

      {/* SUB NAV */}
      <nav className="bg-white shadow border-b relative">
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

      {/* IMAGEN PRINCIPAL */}
      <div className="w-full h-[380px] overflow-hidden">
        <img
          src="/assets/nosotros/nosotros.jpg"
          alt="Nosotros"
          className="w-full h-full object-cover brightness-[0.85]"
        />
      </div>

      {/* SLOGAN */}
      <section className="py-14 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          “TrackingMed cuenta con la mejor tecnología para cuidarte en cada paso.”
        </h2>

        <p className="text-xl text-gray-900">
          “Conectamos emergencias con soluciones rápidas y seguras.”
        </p>
      </section>

      {/* VALORES */}
      <section className="py-10 bg-white shadow-inner">
        <h2 className="text-4xl font-bold text-center text-teal-800 mb-10">Nuestros Valores</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6 text-center">

          {["Confiabilidad", "Responsabilidad", "Compromiso", "Rapidez", "Seguridad"].map((valor) => (
            <div key={valor} className="p-5 bg-teal-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-teal-700">{valor}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 mt-10 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaAmbulance className="text-teal-400 text-3xl" />
              <h1 className="text-2xl font-bold text-white">TrackingMed</h1>
            </div>
            <p className="text-gray-400">Sistema integral de gestión de ambulancias y monitoreo.</p>
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
