import { useAuth } from "../hooks/useAuth";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* 🔹 Encabezado con saludo y logout */}
      <section className="text-center py-6 bg-gray-100">
        <h1 className="text-2xl font-bold">
          Bienvenido{user ? `, ${user.name}` : ""}
        </h1>
        {user ? (
          <button
            onClick={logout}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Cerrar sesión
          </button>
        ) : (
          <p className="text-gray-600">Iniciá sesión para acceder al panel.</p>
        )}
      </section>

      {/* 🔹 Hero principal */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Respuesta Rápida en Emergencias Médicas
        </h1>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Sistema integral de gestión y rastreo de ambulancias que conecta a
          pacientes con servicios de emergencia de manera eficiente y confiable.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded shadow">
            🚑 Solicitar Ambulancia
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded shadow">
            🔑 Acceso Administrativo
          </button>
        </div>
      </section>

      {/* 🔹 Features */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-center text-2xl font-bold mb-8">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
          <FeatureCard
            icon="📍"
            title="Rastreo en Tiempo Real"
            description="Ubicación precisa de ambulancias y tiempo estimado de llegada."
            items={[
              "GPS de alta precisión",
              "Actualizaciones cada 30 segundos",
              "Notificaciones automáticas",
            ]}
          />
          <FeatureCard
            icon="⏱️"
            title="Respuesta Rápida"
            description="Despacho automático de la ambulancia más cercana."
            items={[
              "Algoritmo de optimización",
              "Tiempo promedio: 8 minutos",
              "Priorización por gravedad",
            ]}
          />
          <FeatureCard
            icon="📊"
            title="Gestión Integral"
            description="Panel administrativo completo para empresas médicas."
            items={[
              "Dashboard en tiempo real",
              "Gestión de flota",
              "Reportes y estadísticas",
            ]}
          />
        </div>
      </section>

      {/* 🔹 Estadísticas */}
      <section className="py-12 text-center bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p>Disponibilidad</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">8min</h3>
            <p>Tiempo Promedio</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">150+</h3>
            <p>Ambulancias</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">99.9%</h3>
            <p>Confiabilidad</p>
          </div>
        </div>
      </section>

      {/* 🔹 Llamado a la acción */}
      <section className="bg-red-100 text-center py-12">
        <h3 className="text-xl font-bold text-red-700 mb-4">
          ¿Emergencia Médica?
        </h3>
        <p className="mb-6">No esperes. Solicitá una ambulancia ahora mismo.</p>
        <button className="bg-red-600 text-white px-6 py-3 rounded shadow">
          📞 Llamar Ambulancia Ahora
        </button>
      </section>
    </div>
  );
}
