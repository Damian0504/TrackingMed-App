from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import usuarios, empresas, ambulancias, pedidos, notifications, websocket
from logging_config import init_logging
import os

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

# Logging
init_logging()

app = FastAPI(title="API de Ambulancias")

# CORS (ajusta orígenes en producción)
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

# Routers (se cargarán luego)
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(empresas.router, prefix="/empresas", tags=["empresas"])
app.include_router(ambulancias.router, prefix="/ambulancias", tags=["ambulancias"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

@app.get("/")
def root():
    return {"message": "API de Ambulancias funcionando 🚑"}
