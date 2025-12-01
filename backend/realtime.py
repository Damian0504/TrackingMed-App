# backend/realtime.py
import socketio

# ---- Servidor Socket.IO ----
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    ping_interval=20,
    ping_timeout=10,
    logger=True,
    engineio_logger=False
)

# ============================================================
#                      EVENTOS PRINCIPALES
# ============================================================

@sio.event
async def connect(sid, environ):
    print(f"[SOCKET] Cliente conectado: {sid}")
    await sio.save_session(sid, {"rooms": []})
    await sio.emit("server:hello", {"msg": "welcome"}, to=sid)


@sio.event
async def join_room(sid, data):
    """
    El dashboard o la ambulancia se une a una room.
    Útil si usás multiempresa: "empresa_1", "empresa_2", etc.
    """
    room = data.get("room", "main")
    await sio.enter_room(sid, room)
    print(f"[SOCKET] {sid} se unió a la sala '{room}'")
    await sio.emit("room:joined", {"room": room}, to=sid)


# ============================================================
#                 EVENTO DE TRACKING EN TIEMPO REAL
# ============================================================

@sio.event
async def location_update(sid, data):
    """
    Evento enviado por la APP del chofer:

    {
        "ambulancia_id": 3,
        "lat": -34.6037,
        "lng": -58.3816,
        "ts": 1732055040,
        "room": "main"
    }

    El backend:
    - guarda la ubicación en MySQL
    - transmite a todos los dashboards conectados (menos al emisor)
    """

    from .database import SessionLocal
    from . import models

    room = data.get("room", "main")
    amb_id = data.get("ambulancia_id")

    # Datos que se transmitirán al dashboard
    payload = {
        "ambulancia_id": amb_id,
        "lat": data.get("lat"),
        "lng": data.get("lng"),
        "ts": data.get("ts"),
    }

    # ----- Guardar ubicación en la base de datos -----
    db = SessionLocal()
    try:
        amb = db.query(models.Ambulancia).filter(models.Ambulancia.id == amb_id).first()
        if amb:
            amb.ubicacion_lat = data["lat"]
            amb.ubicacion_lng = data["lng"]
            db.commit()
    except Exception as e:
        print("[ERROR] No se pudo guardar ubicación:", e)
    finally:
        db.close()

    # ----- Enviar actualización a todos los dashboards -----
    await sio.emit("location:update", payload, room=room, skip_sid=sid)

    print(f"[TRACKING] Ubicación actualizada: {payload}")


# ============================================================
#                    MANEJO DE DESCONEXIÓN
# ============================================================

@sio.event
async def disconnect(sid):
    print(f"[SOCKET] Cliente desconectado: {sid}")
