# FastAPI app + Socket.IO ASGI
from fastapi import FastAPI
import socketio
from routers import auth
from realtime import sio

app = FastAPI(title='Backend con realtime')

# routers
app.include_router(auth.router, prefix='/api/auth', tags=['auth'])

# Socket.IO ASGI
asgi_app = socketio.ASGIApp(sio, other_asgi_app=app, static_files={})

@app.on_event("startup")
async def startup_event():
    print("Backend iniciado")

# correr con: uvicorn backend.main:asgi_app --reload --port 8000
