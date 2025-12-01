import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAmbulance, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";  

export default function Home() {
  const images = [
    "/assets/slides/slide1.jpg",
    "/assets/slides/slide2.jpg",
    "/assets/slides/slide3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER DINÁMICO */}
      <Header />

      {/* SUB NAV */}
      <nav className="bg-white shadow border-b relative">
        <ul className="flex justify-center space-x-12 font-semibold text-gray-700 py-4 text-lg">

          <li>
            <Link to="/nosotros" className="hover:text-teal-700 transition">
              Nosotros
            </Link>
          </li>

          <li className="relative group cursor-pointer">
            <span className="hover:text-teal-700 transition">Servicios</span>

            <ul className="
              absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg border rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
              transition-all duration-200 w-60 z-50">
              <li>
                <Link
                  to="/solicitar-ambulancia"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                  🚑 Solicitar ambulancia
                </Link>
              </li>
              <li>
                <Link
                  to="/programar-traslado"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                  📅 Programar traslado
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="block px-4 py-3 hover:bg-gray-100 hover:text-teal-700"
                >
                  📍 Tracking en tiempo real
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

      {/* SLIDER */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src={images[current]}
          alt="slide"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <h2 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-6">
            TrackingMed
          </h2>
          <p className="text-white text-xl md:text-2xl max-w-2xl text-center drop-shadow-md px-4">
            Sistema integral de gestión y rastreo de ambulancias que conecta a pacientes con servicios médicos de emergencia.
          </p>
        </div>

        <button
          onClick={prevSlide}
          className="
            absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
            text-white p-4 rounded-full hidden md:flex"
        >
          <FaChevronLeft size={25} />
        </button>

        <button
          onClick={nextSlide}
          className="
            absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
            text-white p-4 rounded-full hidden md:flex"
        >
          <FaChevronRight size={25} />
        </button>
      </div>

      {/* FOOTER */}
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
          © {new Date().getFullYear()} TrackingMed — Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
