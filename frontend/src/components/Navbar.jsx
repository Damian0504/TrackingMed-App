import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-teal-900 text-white flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold"> TrackingMed</span>
        <span className="text-sm">Sistema de Emergencias Médicas</span>
      </div>
      <div className="flex gap-2">
        <Link to="/dashboard" className="bg-white text-teal-900 px-4 py-2 rounded">
          Panel Administrativo
        </Link>
        <Link to="/tracking" className="bg-teal-600 px-4 py-2 rounded">
          Solicitar Ambulancia
        </Link>
      </div>
    </nav>
  );
}
