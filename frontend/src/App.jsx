import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import ProtectedRouter from "./components/ProtectedRouter";

// Dashboard con subpáginas
import Dashboard from "./pages/dashboard/Dashboard";
import Pedidos from "./pages/dashboard/Pedidos";
import Ambulancias from "./pages/dashboard/Ambulancias";
import Usuarios from "./pages/dashboard/Usuarios";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRouter>
                  <Dashboard />
                </ProtectedRouter>
              }
            >
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="ambulancias" element={<Ambulancias />} />
              <Route path="usuarios" element={<Usuarios />} />
            </Route>

            {/* Ruta por defecto */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
