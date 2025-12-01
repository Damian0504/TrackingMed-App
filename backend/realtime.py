# backend/realtime.py
import socketio

# Servidor Socket.IO para tracking en tiempo real
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    ping_interval=20,
    ping_timeout=10,
    logger=True,
    engineio_logger=False
)

# ---- Eventos ----

@sio.event
async def connect(sid, environ):
    print(f" Cliente conectado: {sid}")
    await sio.save_session(sid, {"rooms": []})
    await sio.emit("server:hello", {"msg": "welcome"}, to=sid)

@sio.event
async def join_room(sid, data):
    room = data.get("room", "main")
    await sio.enter_room(sid, room)
    print(f" {sid} se unió a la sala '{room}'")
    await sio.emit("room:joined", {"room": room}, to=sid)

@sio.event
async def location_update(sid, data):
    # datos esperados: { lat, lng, ts, room }
    room = data.get("room") or "main"
    payload = {
        "lat": data.get("lat"),
        "lng": data.get("lng"),
        "ts": data.get("ts"),
        "from": sid,
    }
    # Enviar a todos menos al emisor
    await sio.emit("location:update", payload, room=room, skip_sid=sid)
    print(f" Ubicación recibida de {sid}: {payload}")

@sio.event
async def disconnect(sid):
    print(f" Cliente desconectado: {sid}")
