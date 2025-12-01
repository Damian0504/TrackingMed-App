# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from realtime import sio  #  Import absoluto correcto
from .database import Base, engine
from .routers import usuarios, empresas, ambulancias, pedidos, notifications, websocket
from logging_config import init_logging
import socketio

# Inicializar base de datos y logging
Base.metadata.create_all(bind=engine)
init_logging()

# Crear instancia principal FastAPI
app = FastAPI(title="API de Ambulancias con Tracking en tiempo real")

# Configurar CORS (para React y otros clientes)
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

# Registrar routers REST
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(empresas.router, prefix="/empresas", tags=["empresas"])
app.include_router(ambulancias.router, prefix="/ambulancias", tags=["ambulancias"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

# Endpoint raíz
@app.get("/")
def root():
    return {"message": " API de Ambulancias con tracking en tiempo real funcionando"}


# --- Integrar Socket.IO con FastAPI ---
# Creamos la app ASGI combinada
asgi_app = socketio.ASGIApp(sio, other_asgi_app=app)


# --- Eventos de ciclo de vida ---
@app.on_event("startup")
async def startup_event():
    print(" Backend iniciado con FastAPI + Socket.IO")


# --- Punto de entrada principal ---
# Esto permite que Uvicorn reconozca la app correcta
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:asgi_app", host="127.0.0.1", port=8000, reload=True)

