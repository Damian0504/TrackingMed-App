# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..realtime import sio  # Importa el servidor Socket.IO desde backend/realtime.py
from .database import Base, engine
from .routers import usuarios, empresas, ambulancias, pedidos, notifications, websocket
from logging_config import init_logging
import socketio


# FastAPI + DB + Routers

Base.metadata.create_all(bind=engine)
init_logging()

app = FastAPI(title="API de Ambulancias con Tracking en tiempo real")

# Configurar CORS (habilita React y otros clientes)
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers (API REST)
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(empresas.router, prefix="/empresas", tags=["empresas"])
app.include_router(ambulancias.router, prefix="/ambulancias", tags=["ambulancias"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

@app.get("/")
def root():
    return {"message": " API de Ambulancias con tracking en tiempo real funcionando"}


#  Integrar Socket.IO + FastAPI

asgi_app = socketio.ASGIApp(sio, other_asgi_app=app)


#  Eventos del ciclo de vida

@app.on_event("startup")
async def startup_event():
    print(" Backend iniciado con FastAPI + Socket.IO")


# 
# Punto de entrada

# Ejecutar con: uvicorn app.main:asgi_app --reload --port 8000
