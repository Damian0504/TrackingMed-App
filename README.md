[README.md](https://github.com/user-attachments/files/22713538/README.md)
# TrackingMed

**TrackingMed** es una plataforma web para la **gestión y seguimiento en tiempo real de ambulancias**.  
Desarrollada con **FastAPI (backend)**, **React + Vite (frontend)** y **MySQL**, permite a usuarios solicitar ambulancias, a despachadores gestionarlas y a todos visualizar el movimiento en tiempo real en Google Maps.

---

## Tabla de Contenidos

1. [Descripción General](#-descripción-general)  
2. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)  
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)  
4. [Estructura de Carpetas](#-estructura-de-carpetas)  
5. [Instalación y Configuración](#-instalación-y-configuración)  
6. [Variables de Entorno](#-variables-de-entorno)  
7. [Base de Datos](#-base-de-datos)  
8. [Ejecución del Proyecto](#-ejecución-del-proyecto)  
9. [Endpoints Principales (API)](#-endpoints-principales-api)  
10. [Funcionalidades Clave](#-funcionalidades-clave)  
11. [Integraciones](#-integraciones)  
12. [Despliegue con Docker](#-despliegue-con-docker)  
13. [Autores](#-autores)

---

## Descripción General

TrackingMed permite coordinar servicios de emergencia médica de manera rápida y eficiente, conectando en tiempo real a:
- **Usuarios:** que solicitan ambulancias.  
- **Despachadores:** que asignan y monitorean ambulancias.  
- **Administradores:** que gestionan usuarios, roles, ambulancias y reportes.

El sistema combina **seguimiento geolocalizado**, **notificaciones en tiempo real** y **una interfaz moderna** construida con React.

---

## Arquitectura del Proyecto

```
Frontend (React + Vite + Tailwind)
        │
        │ HTTP / WebSocket
        ▼
Backend (FastAPI + Socket.IO)
        │
        │ SQLAlchemy ORM
        ▼
Base de Datos (MySQL)
```

Infraestructura manejada con **Docker Compose**:
- `backend` → API y WebSocket server (FastAPI + Socket.IO)  
- `frontend` → aplicación React (Vite + Nginx para prod)  
- `db` → MySQL + scripts de inicialización  
- `phpMyAdmin` → administración de base de datos  

---

## Tecnologías Utilizadas

**Frontend:**
- React 18  
- Vite  
- Tailwind CSS  
- @react-google-maps/api  
- Socket.IO Client  
- Axios  
- React Router DOM  

**Backend:**
- FastAPI  
- SQLAlchemy  
- Socket.IO (python-socketio)  
- PyMySQL / mysql-connector  
- JWT (PyJWT)  
- bcrypt  

**Base de Datos:**
- MySQL  

**Infraestructura:**
- Docker & Docker Compose  
- Nginx (para producción)

---

## Estructura de Carpetas

```
/TrackingMed
│
├── backend/
│   ├── main.py
│   ├── realtime.py
│   ├── routers/
│   ├── models/
│   ├── db/
│   ├── utils/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   └── .env
│
├── db/
│   └── init.sql
│
├── docker-compose.yml
├── README.md
└── requirements.txt
```

---

## Instalación y Configuración

### Clonar el repositorio
```bash
git clone https://github.com/tuusuario/trackingmed.git
cd trackingmed
```

### Instalar dependencias del backend
```bash
cd backend
pip install -r requirements.txt
```

### Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

---

## Variables de Entorno

### backend/.env
```ini
DATABASE_URL=mysql+mysqlconnector://admin:adminpassword@db:3306/ambulancias_db
JWT_SECRET=supersecreto
JWT_ALGORITHM=HS256
```

### frontend/.env
```ini
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
```

---

## Base de Datos

- Base: `ambulancias_db`
- Script inicial: `db/init.sql`
- Tablas principales:
  - `usuarios`
  - `ambulancias`
  - `pedidos`
  - `asignaciones`
  - `tracking`
  - `despachadores`
  - `notificaciones`
  - `eventos_pedido`

Para importar manualmente:
```bash
mysql -u root -p < db/init.sql
```

---

## Ejecución del Proyecto

### Opción 1 – Local (sin Docker)
1. **Backend**
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
    http://localhost:8000/docs

2. **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
    http://localhost:5173

---

## Endpoints Principales (API)

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registro de usuario |
| GET | `/ambulancias/` | Listar ambulancias |
| POST | `/pedidos/` | Crear pedido |
| GET | `/tracking/{id}` | Obtener tracking de ambulancia |
| WS | `/ws/location_update` | Canal WebSocket de tracking |

---

## Funcionalidades Clave

- Registro y autenticación JWT  
- Solicitud y asignación de ambulancias  
- Tracking en tiempo real con Socket.IO  
- Integración con Google Maps  
- Dashboard de gestión para despachadores  
- Notificaciones instantáneas  
- Reportes de eficiencia  

---

## Integraciones

- **Socket.IO** → comunicación en tiempo real.  
- **Google Maps JavaScript API** → mapas dinámicos.  
- **phpMyAdmin** → interfaz de gestión de la base.  

---

## Despliegue con Docker

```bash
docker-compose up --build -d
```

Servicios disponibles:
| Servicio | URL |
|-----------|-----|
| Backend | http://localhost:8000 |
| Frontend | http://localhost:5173 |
| phpMyAdmin | http://localhost:8080 |
| MySQL | localhost:3306 |

---

## Autores

**Equipo TrackingMed (4 devs)**
- Backend: 2 desarrolladores  
- Frontend: 2 desarrolladores  
- QA y documentación: equipo compartido  

Desarrollado con **FastAPI**, **React** y **Docker**.
