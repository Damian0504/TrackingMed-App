import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel Administrativo</h1>

      {user ? (
        <p className="mb-6">
          Bienvenido, <strong>{user.name}</strong>. Administra el sistema desde aquí.
        </p>
      ) : (
        <p className="text-red-600">No tienes acceso a este panel.</p>
      )}

      {/* 🔹 Menú de navegación interno */}
      <nav className="flex gap-4 border-b pb-2 mb-4">
        <NavLink
          to="pedidos"
          className={({ isActive }) =>
            isActive ? "font-bold text-teal-700" : "text-gray-600"
          }
        >
          📋 Pedidos
        </NavLink>
        <NavLink
          to="ambulancias"
          className={({ isActive }) =>
            isActive ? "font-bold text-teal-700" : "text-gray-600"
          }
        >
          🚑 Ambulancias
        </NavLink>
        <NavLink
          to="usuarios"
          className={({ isActive }) =>
            isActive ? "font-bold text-teal-700" : "text-gray-600"
          }
        >
          👤 Usuarios
        </NavLink>
      </nav>

      {/* 🔹 Aquí se renderizan las subpáginas */}
      <Outlet />
    </div>
  );
}
