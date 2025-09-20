from typing import Dict, Any
import asyncio

# Módulo ligero para manejar notificaciones en memoria (MVP).
# En producción usar Redis/Push/FCM/etc.

NOTIFICATION_QUEUE = asyncio.Queue()

async def push_notification(notification: Dict[str, Any]):
    """Coloca notificación en cola para procesamiento."""
    await NOTIFICATION_QUEUE.put(notification)

async def pop_notification():
    """Extrae la siguiente notificación (await)."""
    return await NOTIFICATION_QUEUE.get()
