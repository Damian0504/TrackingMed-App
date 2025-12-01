import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Ambulance } from "lucide-react";
import { FaAmbulance } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          rol: "usuario",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error al registrar usuario.");
        return;
      }

      alert("✔ Registro exitoso. Ya podés iniciar sesión.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError("Error conectando con el servidor.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/ambulancia7.jpg')" }}
    >
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
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white/95 p-10 rounded-2xl shadow-2xl w-[450px] backdrop-blur-sm mt-10 mb-10">
          <div className="flex items-center justify-center mb-6">
            <Ambulance className="w-10 h-10 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-blue-700">TrackingMed</h1>
          </div>

          <h2 className="text-lg text-center text-gray-700 font-semibold mb-6">
            Registro de Usuario
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />

            {error && (
              <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md"
            >
              Registrarse
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md"
            >
              Volver al Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
