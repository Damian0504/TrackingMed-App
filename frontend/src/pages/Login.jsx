import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Ambulance } from "lucide-react";
import { FaAmbulance } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Debe completar email y contraseña.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Credenciales inválidas.");
        return;
      }

      // Guarda token + usuario del backend
      login(data.access_token, data.user);

      // Redirección correcta
      navigate("/servicios", { replace: true });

    } catch (error) {
      console.error("Error en login:", error);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/ambulancia7.jpg')" }}
    >
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
          <button className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow opacity-70 cursor-default">
            Iniciar sesión
          </button>

          <Link
            to="/register"
            className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Registrarse
          </Link>
        </div>
      </header>

      {/* FORMULARIO */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white/95 p-10 rounded-2xl shadow-2xl w-[400px] backdrop-blur-sm mt-10 mb-10">
          <div className="flex items-center justify-center mb-6">
            <Ambulance className="w-10 h-10 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-blue-700">TrackingMed</h1>
          </div>

          <h2 className="text-lg text-center text-gray-700 font-semibold mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="usuario@correo.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="********"
              />

              <div className="flex justify-end mt-1">
                <Link
                  to="/recuperar-password"
                  className="text-sm text-blue-700 hover:text-blue-900 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-center text-sm font-semibold">
                {error}
              </p>
            )}

            {/* BOTONES */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition"
              >
                Entrar
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
