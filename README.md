README.md
# TrackingMed

TrackingMed es una aplicación fullstack para **gestionar y rastrear ambulancias en tiempo real**.  
Incluye un backend en **FastAPI**, un frontend en **React (Vite + Tailwind)** y una base de datos en **MySQL**, todo preparado para correr en **Docker Compose**.

---

# Estructura del proyecto



.
├── backend/ # API en FastAPI (autenticación, WebSockets, tracking)
├── frontend/ # App React (Landing, Map, Tracking, Dashboard)
├── db/ # Scripts SQL iniciales (init.sql con tablas y datos demo)
├── nginx/ # Configuración de Nginx para servir frontend y backend
├── docker-compose.yml
├── Dockerfile(s)
└── README.md


---

# Requerimientos

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)  
- (opcional) Python 3.10+ y Node.js 18+ local sin Docker  

---

# 🚀 Instalación con Docker

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/trackingmed.git
   cd trackingmed


Configurar las variables de entorno:

backend/.env

DATABASE_URL=mysql+pymysql://root:rootpassword@db:3306/ambulancias_db
JWT_SECRET=supersecreto
JWT_ALGORITHM=HS256


frontend/.env

VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI


Levantar los contenedores:

docker-compose up --build -d


Servicios disponibles:

Frontend → http://localhost

Backend API (FastAPI docs) → http://localhost:8000/docs

phpMyAdmin → http://localhost:8080
 (user: root, pass: rootpassword)

🛠️ Instalación manual (sin Docker)
Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # en Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Frontend
cd frontend
npm install
npm run dev

Base de datos

Importar db/init.sql en MySQL (via phpMyAdmin o consola):

mysql -u root -p < db/init.sql

🔑 Funcionalidades principales

Autenticación JWT con roles (usuario, despachador, admin)

Dashboard protegido con ProtectedRouter (React Router)

WebSockets con Socket.IO para tracking en tiempo real

Mapa interactivo con Google Maps (@react-google-maps/api)

Gestión de ambulancias, pedidos y usuarios desde el panel

Notificaciones en tiempo real

Capturas (ejemplo)

(agregá screenshots de tu frontend aquí)

Scripts útiles

Ver logs:

docker-compose logs -f


Reconstruir servicios:

docker-compose up --build


Bajar servicios:

docker-compose down

👨‍💻 Equipo de desarrollo

Damian Marchesoni – Fullstack Dev / Owner

(Agregá más nombres si tenés equipo)

📜 Licencia

Este proyecto está bajo licencia MIT.
Podés usarlo libremente para fines académicos y de desarrollo.