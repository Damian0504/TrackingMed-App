import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel Administrativo</h1>

      {user ? (
        <p className="mb-6">
          Bienvenido, <strong>{user.name}</strong>. Aquí podrás gestionar pedidos, ambulancias y usuarios.
        </p>
      ) : (
        <p className="text-red-600">No tienes acceso a este panel.</p>
      )}

      {/* 🔹 Secciones iniciales del panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow bg-white">
          <h2 className="font-semibold mb-2">📋 Pedidos</h2>
          <p className="text-sm text-gray-600">Revisa y asigna solicitudes de ambulancia.</p>
          <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
            Ver Pedidos
          </button>
        </div>

        <div className="p-4 border rounded shadow bg-white">
          <h2 className="font-semibold mb-2">🚑 Ambulancias</h2>
          <p className="text-sm text-gray-600">Controla la flota y estados en tiempo real.</p>
          <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
            Ver Ambulancias
          </button>
        </div>

        <div className="p-4 border rounded shadow bg-white">
          <h2 className="font-semibold mb-2">👤 Usuarios</h2>
          <p className="text-sm text-gray-600">Gestiona usuarios, roles y permisos.</p>
          <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded">
            Ver Usuarios
          </button>
        </div>
      </div>
    </div>
  );
}
