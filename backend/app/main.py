from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from realtime import sio
from .database import Base, engine
from .routers import usuarios, empresas, ambulancias, pedidos, notifications, websocket
from .routers import traslados
from app.routers import auth as auth_router
from logging_config import init_logging
from app.routers import auth_reset

# Inicializar DB y logging
Base.metadata.create_all(bind=engine)
init_logging()

# -------------------------
#  FASTAPI APP PRINCIPAL
# -------------------------
app = FastAPI(title="API de Ambulancias con Tracking en Tiempo Real")

# -------------------------
#  CORS (React dev mode)
# -------------------------
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

# -------------------------
#  REGISTRO DE ROUTERS
# -------------------------
app.include_router(auth_router.router)   # /auth
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(empresas.router, prefix="/empresas", tags=["empresas"])
app.include_router(ambulancias.router, prefix="/ambulancias", tags=["ambulancias"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])
app.include_router(traslados.router, prefix="/traslados", tags=["traslados"])
app.include_router(auth_reset.router)

# -------------------------
#  ENDPOINT RAÍZ
# -------------------------
@app.get("/")
def root():
    return {"message": "API de Ambulancias con tracking en tiempo real funcionando"}

# -----------------------------------------------------
#   🔥 Socket.IO envuelve FastAPI (CORS incluido)
# -----------------------------------------------------
# Este ES el objeto ASGI FINAL que Uvicorn debe ejecutar
sio_app = socketio.ASGIApp(sio, other_asgi_app=app)

# -------------------------
#  EVENTO DE INICIO
# -------------------------
@app.on_event("startup")
async def startup_event():
    print("🚀 Backend iniciado con FastAPI + Socket.IO")

# -------------------------
#  PUNTO DE ENTRADA
# -------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:sio_app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
