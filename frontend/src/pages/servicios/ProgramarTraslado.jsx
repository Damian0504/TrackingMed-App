import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAmbulance } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProgramarTraslado() {
 
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    nacimiento: "",
    telefono: "",
    cobertura: "no",
    coberturaNombre: "",
    nroAfiliado: "",
    tipoAmbulancia: "",
    direccionSalida: "",
    destino: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  POST AL BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      ...form,
      fecha_traslado: fecha ? fecha.toISOString().split("T")[0] : null,
      hora_traslado: hora ? hora.toTimeString().split(" ")[0] : null,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/traslados/programar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!res.ok) throw new Error("Error al enviar");

      alert("✔ Traslado programado con éxito.\nSe envió un correo de confirmación.");
    } catch (error) {
      alert(" Hubo un problema al enviar el formulario.");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/traslado/fondo.jpg)" }}
    >

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
          <Link to="/login" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow">
            Iniciar sesión
          </Link>
          <Link to="/register" className="bg-white text-teal-800 px-5 py-2 rounded-lg shadow">
            Registrarse
          </Link>
        </div>
      </header>

      {/* SUB NAV */}
      <nav className="bg-white shadow border-b relative">
        <ul className="flex justify-center space-x-12 font-semibold text-gray-700 py-4 text-lg">

          <li><Link to="/nosotros" className="hover:text-teal-700">Nosotros</Link></li>

          <li className="relative group cursor-pointer">
            <span className="hover:text-teal-700">Servicios</span>

            <ul className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg border rounded-lg
                           opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                           transition-all duration-200 w-60 z-50">

              <li><Link to="/solicitar-ambulancia" className="block px-4 py-3 hover:bg-gray-100">🚑 Solicitar ambulancia</Link></li>
              <li><Link to="/programar-traslado" className="block px-4 py-3 hover:bg-gray-100">📅 Programar traslado</Link></li>
              <li><Link to="/tracking" className="block px-4 py-3 hover:bg-gray-100">📍 Tracking en tiempo real</Link></li>
            </ul>
          </li>

          <li><Link to="/recursos" className="hover:text-teal-700">Nuestros Recursos</Link></li>
          <li><Link to="/contacto" className="hover:text-teal-700">Contacto</Link></li>
        </ul>
      </nav>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12">

        {/* CALENDARIO */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Selecciona fecha y hora</h2>

          <p className="text-gray-800 mb-2">Fecha del traslado:</p>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="w-full p-3 border border-gray-800 text-gray-800 rounded-md mb-4"
            placeholderText="Elegir fecha"
          />

          <p className="text-gray-800 mb-2">Horario aproximado:</p>
          <DatePicker
            selected={hora}
            onChange={(time) => setHora(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="HH:mm"
            className="w-full p-3 border border-gray-800 text-gray-800 rounded-md"
            placeholderText="Elegir horario"
          />
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">

          <h2 className="text-2xl font-bold text-teal-800 mb-4">Datos del Paciente</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" className="p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />
            <input name="apellido" placeholder="Apellido" className="p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />
          </div>

          <input name="email" type="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          <input name="dni" placeholder="DNI" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          <input name="nacimiento" type="date" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          <input name="telefono" placeholder="Teléfono" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          {/* COBERTURA */}
          <label className="font-semibold text-gray-800 mt-2">¿Tiene cobertura médica?</label>
          <select name="cobertura" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>

          {form.cobertura === "si" && (
            <>
              <input name="coberturaNombre" placeholder="Nombre de la cobertura" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} />
              <input name="nroAfiliado" placeholder="Número de afiliado" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} />
            </>
          )}

          {/* TIPO DE AMBULANCIA */}
          <label className="font-semibold text-gray-800 mt-2">Tipo de Ambulancia</label>
          <select name="tipoAmbulancia" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="Alta Complejidad">De Alta Complejidad</option>
            <option value="Primera Respuesta">De Primera Respuesta</option>
            <option value="Pediátrica / Neonatal">Pediátricas y Neonatales</option>
            <option value="Paciente Crítico">De Paciente Crítico</option>
            <option value="Visita Médica">De Visita Médica</option>
          </select>

          <input name="direccionSalida" placeholder="Dirección de origen" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          <input name="destino" placeholder="Destino (clínica, hospital, domicilio)" className="w-full p-3 border border-gray-800 text-gray-800 rounded-md" onChange={handleChange} required />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition">
            Programar Traslado
          </button>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaAmbulance className="text-teal-400 text-3xl" />
              <h1 className="text-2xl font-bold text-white">TrackingMed</h1>
            </div>
            <p className="text-gray-400">
              Sistema integral de gestión y monitoreo de ambulancias.
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
              <li>CABA, Buenos Aires, Argentina</li>
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
