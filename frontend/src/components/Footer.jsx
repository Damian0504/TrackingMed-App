export default function Footer() {
  return (
    <footer className="bg-teal-100 text-gray-800 p-6">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">TrackingMed</h3>
          <p>Conectando vidas con atención médica de emergencia rápida y confiable.</p>
        </div>
        <div>
          <h4 className="font-semibold">Servicios</h4>
          <ul>
            <li>Ambulancias de Emergencia</li>
            <li>Traslados Médicos</li>
            <li>Atención Domiciliaria</li>
            <li>Servicios Corporativos</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contacto</h4>
          <p>Emergencias: 911</p>
          <p>Administración: (555) 123-4567</p>
          <p>Email: info@trackingmed.com</p>
          <p>Soporte 24/7 disponible</p>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">
        © 2024 TrackingMed. Todos los derechos reservados.
      </div>
    </footer>
  );
}
