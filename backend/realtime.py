# Socket.IO server: maneja conexiones y eventos de localización
import socketio

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    ping_interval=20,
    ping_timeout=10
)

@sio.event
async def connect(sid, environ):
    print('connect', sid)
    await sio.save_session(sid, {'rooms': []})
    await sio.emit('server:hello', {'msg': 'welcome'}, to=sid)

@sio.event
async def join_room(sid, data):
    room = data.get('room', 'main')
    await sio.enter_room(sid, room)
    print(f'{sid} joined {room}')
    await sio.emit('room:joined', {'room': room}, to=sid)

@sio.event
async def location_update(sid, data):
    # datos esperados: { lat, lng, ts, room }
    room = data.get('room') or 'main'
    payload = {
        'lat': data.get('lat'),
        'lng': data.get('lng'),
        'ts': data.get('ts'),
        'from': sid
    }
    # enviar a todos menos al emisor
    await sio.emit('location:update', payload, room=room, skip_sid=sid)

@sio.event
async def disconnect(sid):
    print('disconnect', sid)
