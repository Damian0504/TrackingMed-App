import React from "react";
import { Link } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-md"
        style={{ backgroundColor: "#0A9D8A" }}
      >
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <FaAmbulance className="text-white text-4xl" />
          <h1 className="text-3xl font-bold text-white tracking-wide">
            TrackingMed
          </h1>
        </Link>

        <div className="flex space-x-4">
          <Link to="/login" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Iniciar sesión
          </Link>

          <Link to="/register" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Registrarse
          </Link>
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

      {/* IMAGEN HEADER */}
      <div className="relative w-full h-[320px]">
        <img
          src="/assets/contacto/cabecera.jpg"
          alt="Contacto"
          className="w-full h-full object-cover brightness-[0.45]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-widest">CONTACTO</h1>
          <div className="w-20 h-[3px] bg-white mt-3"></div>
        </div>
      </div>

      {/* FORMULARIO */}
      <section className="max-w-3xl mx-auto bg-white shadow-xl p-10 rounded-xl -mt-20 relative z-10">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">CONTACTANOS</h2>

        <form className="space-y-5">
          <input type="text" placeholder="Nombre y Apellido*" className="w-full p-3 rounded-full border border-gray-300" required />
          <input type="text" placeholder="Teléfono" className="w-full p-3 rounded-full border border-gray-300" />
          <input type="email" placeholder="Correo electrónico*" className="w-full p-3 rounded-full border border-gray-300" required />
          <select className="w-full p-3 rounded-full border border-gray-300 text-gray-600">
            <option>Buenos Aires</option><option>Córdoba</option><option>Santa Fe</option>
            <option>Mendoza</option><option>Entre Ríos</option><option>Neuquén</option><option>Otra</option>
          </select>
          <textarea rows="5" placeholder="Mensaje" className="w-full p-4 rounded-xl border border-gray-300"></textarea>

          <button type="submit" className="px-10 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-bold shadow-lg">
            ENVIAR
          </button>
        </form>
      </section>

      {/* INFO */}
      <section className="max-w-3xl mx-auto text-center mt-14 mb-20 px-6">
        <h3 className="text-2xl font-bold text-teal-800 mb-6">Información de Contacto</h3>
        <p className="text-gray-700 text-lg mb-2">📍 <strong>Dirección:</strong> Av. Libertador 2302, CABA, Argentina</p>
        <p className="text-gray-700 text-lg mb-2">📞 <strong>Teléfono:</strong> +54 11 3589-9632</p>
        <p className="text-gray-700 text-lg mb-2">✉️ <strong>Email:</strong> contacto@trackingmed.com</p>
        <p className="text-gray-700 text-lg">⏰ <strong>Horario:</strong> Lunes a Viernes 08:00–20:00 hs</p>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h1 className="text-2xl font-bold text-white mb-3">TrackingMed</h1>
            <p className="text-gray-400">Sistema integral de gestión y monitoreo de ambulancias.</p>
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

