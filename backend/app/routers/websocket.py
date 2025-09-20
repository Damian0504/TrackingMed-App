from fastapi import APIRouter, WebSocket
from ..utils.notifications import pop_notification

router = APIRouter()

@router.websocket("/notifications")
async def websocket_notifications(ws: WebSocket):
    await ws.accept()
    while True:
        notif = await pop_notification()
        await ws.send_json(notif)
