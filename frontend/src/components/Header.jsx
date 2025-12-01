import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-between px-10 py-6 shadow-md"
      style={{ backgroundColor: "#0A9D8A" }}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center space-x-3 cursor-pointer">
        <FaAmbulance className="text-white text-4xl" />
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            TrackingMed
          </h1>
          <p className="text-white text-xs opacity-80 -mt-1">
            Sistema de Gestión de Ambulancias
          </p>
        </div>
      </Link>

      {/* BOTONES DERECHA */}
      <div className="flex items-center space-x-4">

        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              Iniciar sesión
            </Link>

            <Link
              to="/register"
              className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              Registrarse
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <span className="text-white text-lg font-semibold">
              Hola, {user?.nombre || user?.email}
            </span>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}
