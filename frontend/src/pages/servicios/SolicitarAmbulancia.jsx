import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SolicitarAmbulancia() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    direccion: "",
    motivo: "",
    email: "",
    tipoAmbulancia: "",
  });

  const [fecha, setFecha] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Manejo de cambios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar solicitud
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const payload = {
      ...form,
      fecha_solicitud: fecha,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      alert(" Solicitud enviada con éxito");
    } catch (error) {
      alert(" Error al enviar solicitud");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/solicitar/fondo.jpg')`,
      }}
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
          <Link
            to="/login"
            className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Registrarse
          </Link>
        </div>
      </header>

      {/* SUBNAV */}
      <nav className="bg-white shadow border-b relative">
        <ul className="flex justify-center space-x-12 font-semibold text-gray-700 py-4 text-lg">
          <li>
            <Link to="/nosotros" className="hover:text-teal-700 transition">
              Nosotros
            </Link>
          </li>

          <li className="relative group cursor-pointer">
            <span className="hover:text-teal-700 transition">Servicios</span>

            <ul className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg border rounded-lg
                           opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                           transition-all duration-200 w-60 z-50">

              <li>
                <Link
                  to="/solicitar-ambulancia"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                   Solicitar ambulancia
                </Link>
              </li>

              <li>
                <Link
                  to="/programar-traslado"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                   Programar traslado
                </Link>
              </li>

              <li>
                <Link
                  to="/tracking"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                   Tracking en tiempo real
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/recursos" className="hover:text-teal-700 transition">
              Nuestros Recursos
            </Link>
          </li>

          <li>
            <Link to="/contacto" className="hover:text-teal-700 transition">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      {/* CONTENIDO */}
      <div className="max-w-3xl mx-auto bg-white/95 shadow-xl rounded-xl p-8 mt-10 mb-14 backdrop-blur-sm">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Solicitar Ambulancia
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          {/* Nombre y apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="p-3 border border-gray-800 rounded-md text-gray-800"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="p-3 border border-gray-800 rounded-md text-gray-800"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          {/* DNI */}
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            value={form.dni}
            onChange={handleChange}
            required
          />

          {/* TELEFONO */}
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* DIRECCIÓN */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección del incidente"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            value={form.direccion}
            onChange={handleChange}
            required
          />

          {/* MOTIVO */}
          <textarea
            name="motivo"
            placeholder="Motivo del pedido"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800 h-28"
            value={form.motivo}
            onChange={handleChange}
            required
          ></textarea>

          {/* AMBULANCIA */}
          <select
            name="tipoAmbulancia"
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            value={form.tipoAmbulancia}
            onChange={handleChange}
            required
          >
            <option value="">Tipo de ambulancia</option>
            <option value="Alta Complejidad">Alta Complejidad</option>
            <option value="Primera Respuesta">Primera Respuesta</option>
            <option value="Pediátrica / Neonatal">Pediátrica / Neonatal</option>
            <option value="Paciente Crítico">Paciente Crítico</option>
            <option value="Visita Médica">Visita Médica</option>
          </select>

          {/* FECHA */}
          <label className="font-semibold text-gray-800">
            Fecha del incidente
          </label>

          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="w-full p-3 border border-gray-800 rounded-md text-gray-800"
            placeholderText="Elegir fecha"
          />

          {/* BOTÓN */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition"
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Solicitar Ambulancia"}
          </button>
        </form>
      </div>
    </div>
  );
}
