README.md
# TrackingMed

Introducción

El propósito de este documento es definir de manera detallada los requerimientos
funcionales y no funcionales de TrackingMed, una aplicación web para la gestión y
monitoreo en tiempo real de ambulancias. El sistema será utilizado por usuarios,
despachadores y administradores, con el fin de mejorar los tiempos de respuesta en
emergencias médicas.

Alcance
TrackingMed permitirá:
● Solicitud de ambulancias por parte de usuarios.
● Asignación de ambulancias por parte de despachadores.
● Visualización en tiempo real de las unidades en servicio mediante integración con
Google Maps.
● Comunicación en tiempo real entre usuarios y despachadores mediante
WebSockets.
● Gestión de usuarios, roles y permisos por parte de administradores.
● Reportes de tiempos de respuesta y eficiencia operativa.

Definiciones
● Usuario: persona que solicita una ambulancia.
● Despachador: operador encargado de asignar ambulancias.
● Administrador: rol con permisos para gestionar usuarios, ambulancias y
estadísticas.
● Tracking: proceso de seguimiento de la ubicación de una ambulancia en tiempo
real.

Descripción General
Perspectiva del producto
El sistema será una aplicación web compuesta por:
● Frontend: React + Vite + Tailwind.
● Backend: FastAPI con autenticación JWT y WebSockets (Socket.IO).
● Base de datos: MySQL (almacenamiento de usuarios, ambulancias, pedidos y
tracking).
● Infraestructura: Docker Compose para despliegue.

Funcionalidades principales
● Autenticación (registro/login).
● Solicitud de ambulancias.
● Asignación de ambulancias por parte de despachadores.
● Visualización de tracking en Google Maps.
● Gestión de usuarios, ambulancias y pedidos.
● Reportes y estadísticas de desempeño.

Usuarios y roles
● Usuario: solicita ambulancias y sigue el estado de su pedido.
● Despachador: recibe solicitudes y asigna ambulancias.
● Administrador: gestiona usuarios, ambulancias, pedidos y reportes.

Requerimientos Específicos
Requerimientos Funcionales
● RF1: El sistema debe permitir registro y login de usuarios con JWT.
● RF2: El sistema debe permitir a los usuarios solicitar ambulancias indicando
ubicación.
● RF3: El sistema debe permitir a los despachadores asignar ambulancias a pedidos.
● RF4: El sistema debe mostrar el tracking en tiempo real de ambulancias en mapa.
● RF5: El sistema debe notificar al usuario sobre cambios de estado de su pedido.
● RF6: El sistema debe registrar y almacenar todas las posiciones GPS en la tabla
tracking.
● RF7: El sistema debe permitir CRUD de usuarios, ambulancias y pedidos.
● RF8: El sistema debe generar reportes de tiempos de respuesta y disponibilidad.
Requerimientos No Funcionales
● RNF1: El sistema debe ser accesible vía web desde desktop y móviles.
● RNF2: La latencia máxima para actualización de tracking debe ser <30s.
● RNF3: Autenticación JWT y encriptación de contraseñas con bcrypt.
● RNF4: Despliegue en contenedores Docker con independencia de servicios.
● RNF5: Escalabilidad horizontal soportando múltiples instancias de backend.
● RNF6: Usabilidad: interfaz intuitiva con flujos simples.
● RNF7: Disponibilidad mínima esperada: 99%.
● RNF8: Compatibilidad con Google Maps API.

Casos de Uso
CU1 – Solicitud de ambulancia
● Actor: Usuario.
● Flujo principal:
1. El usuario inicia sesión.
2. Ingresa a la página principal.
3. Selecciona “Solicitar ambulancia” y envía ubicación.
4. El sistema registra el pedido y notifica al despachador.

CU2 – Asignación de ambulancia
● Actor: Despachador.
● Flujo principal:
1. El despachador ingresa al dashboard.
2. Visualiza lista de pedidos pendientes.
3. Selecciona una ambulancia disponible y la asigna.
4. El sistema actualiza estados y notifica al usuario.

CU3 – Seguimiento en tiempo real
● Actor: Usuario.
● Flujo principal:
1. El usuario accede a la sección “Tracking”.
2. El sistema muestra un mapa con la ubicación actualizada de la ambulancia
asignada.

Restricciones
● Dependencia de Google Maps API para mapas.
● Dependencia de Socket.IO para comunicaciones en tiempo real.
● Acceso a internet requerido.

Diagramas
● Diagrama de Casos de Uso: Usuarios, Despachadores, Administradores.
● Diagrama ER: Tablas principales (usuarios, ambulancias, pedidos, tracking).
● Diagrama de Arquitectura: frontend (React) ↔ backend (FastAPI) ↔ DB (MySQL).

Plan de Desarrollo (Scrum)

Product Backlog

Sprint Backlog (4 sprints de 2 semanas, 4 devs)
● Sprint 1: Setup, auth, base de datos, Docker.
● Sprint 2: CRUD pedidos, ambulancias, dashboard básico.
● Sprint 3: WebSockets + tracking en Google Maps.
● Sprint 4: Roles/permisos, reportes, pruebas, documentación.

