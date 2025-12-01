import React from "react";
import { Link } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-10 py-6 shadow-md bg-white">

      {/* LOGO - REDIRIGE AL HOME */}
      <Link to="/home" className="flex items-center space-x-3 cursor-pointer">
        <FaAmbulance className="text-blue-600 text-4xl" />
        <h1 className="text-3xl font-bold text-blue-700 tracking-wide">
          TrackingMed
        </h1>
      </Link>

      {/* BOTONES LOGIN / REGISTRO */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </Link>

        <Link
          to="/login"
          className="bg-white border border-blue-600 text-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-50 transition"
        >
          Registrarse
        </Link>
      </div>
    </header>
  );
}
