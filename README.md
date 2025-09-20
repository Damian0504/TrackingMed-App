Software Requirements Specification
(SRS) Proyecto: Sistema de gestión de ambulancias (empresa única, app móvil +
backoffice)
1. Introducción
• Propósito: Proveer a una empresa de emergencias médicas una app móvil para su flota de
ambulancias y un backoffice web para despachadores.
• Alcance: La app permite registro/login, gestión de ambulancias y pedidos, asignación, mapas
en tiempo real y notificaciones.
• Audiencia: Empresa de emergencias médicas, operadores, despachadores y personal de
ambulancia.
2. Descripción General
• Usuarios principales:
• - Usuario común: crea pedidos.
• - Despachador: asigna ambulancias y coordina pedidos.
• - Conductor / Médico: operan ambulancias, reportan estado y ubicación. •
- Administrador: gestiona usuarios, roles, ambulancias y mantenimiento. •
Entorno:
• - Backend: Python + FastAPI.
• - Frontend móvil: React Native / Expo.
• - Backoffice: React Web.
• - Base de datos: MySQL + phpMyAdmin.
• - Deploy: Docker + cloud services.
3. Requisitos Funcionales
• RF1: Registro y login con roles y permisos finos (admin, despachador, medico, chofer).
• RF2: CRUD de usuarios, ambulancias y pedidos.
• RF3: Asignación de ambulancias a pedidos (solo despachador).
• RF4: Mapa en tiempo real con Google Maps u OSM (Leaflet).
• RF5: Tracking en tiempo real de ambulancias usando WebSockets.
• RF6: Backoffice web para el despachador con mapa interactivo y control de pedidos. •
RF7: Sistema de notificaciones en tiempo real.
• RF8: Auditoría básica (timestamps de cambios).
4. Requisitos No Funcionales
• Seguridad: Autenticación JWT con refresh tokens, roles y contraseñas en hash.
• Escalabilidad: Arquitectura modular y lista para horizontal scaling.
• Disponibilidad: soporte a concurrencia y uptime > 99.5%.
• Rendimiento: tiempos de respuesta < 300 ms (p95).
• Usabilidad: interfaz móvil clara e intuitiva + backoffice amigable.
5. Restricciones
• Base de datos MySQL obligatoria.
• phpMyAdmin como gestor visual de DB.
• Mapa en producción requiere API Key (Google Maps) o servidor propio de tiles (OSM).
• MVP en 4 sprints con equipo de 4 devs.
6. Entregables
• Backend (API REST con FastAPI).
• Frontend móvil (React Native).
• Backoffice web (React).
• Base de datos inicial (scripts SQL).
• Infraestructura para despliegue (Docker).
• Documentación técnica + manual de usuario básico.
