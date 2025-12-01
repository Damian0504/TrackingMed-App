import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      await res.json();
      setOkMsg("Si el email existe, recibirás instrucciones para recuperar tu contraseña.");
    } catch (err) {
      setError("Error al solicitar recuperación.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER (igual que Home, sin botones) */}
      <header
        className="flex items-center justify-between px-10 py-6 shadow-md"
        style={{ backgroundColor: "#0A9D8A" }}
      >
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <FaAmbulance className="text-white text-4xl" />
          <h1 className="text-3xl font-bold text-white tracking-wide">TrackingMed</h1>
        </Link>

        {/* NO login / register aquí */}
        <div></div>
      </header>

      {/* CONTENIDO CENTRAL CON IMAGEN */}
      <div
        className="flex-1 flex items-center justify-center bg-center bg-cover px-4"
        style={{
          backgroundImage: "url('/assets/ambulancia7.jpg')",
        }}
      >
        <div className="bg-white/95 p-10 rounded-2xl shadow-2xl w-[400px] backdrop-blur-sm mt-10 mb-10">

          <div className="flex items-center justify-center mb-6">
            <FaAmbulance className="w-10 h-10 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-blue-700">TrackingMed</h1>
          </div>

          <h2 className="text-lg text-center text-gray-700 font-semibold mb-6">
            Recuperar contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email registrado</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="usuario@correo.com"
              />
            </div>

            {okMsg && (
              <p className="text-green-600 text-center text-sm font-semibold">{okMsg}</p>
            )}

            {error && (
              <p className="text-red-600 text-center text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition"
            >
              {loading ? "Enviando..." : "Enviar instrucciones"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            <Link to="/login" className="text-blue-700 hover:underline">
              ← Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER (igual al Home) */}
      <footer className="bg-gray-900 text-gray-300 mt-10 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaAmbulance className="text-teal-400 text-3xl" />
              <h1 className="text-2xl font-bold text-white">TrackingMed</h1>
            </div>
            <p className="text-gray-400">
              Sistema integral de gestión y monitoreo de ambulancias para respuestas rápidas y confiables.
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
            <ul className="space-y-2">
              <li>Email: trackingmed@emergencias.com</li>
              <li>Tel: +54 11 35899632</li>
              <li>CABA, Buenos Aires</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © {currentYear} TrackingMed — Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
