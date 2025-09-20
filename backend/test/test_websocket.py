import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_websocket_notifications():
    with client.websocket_connect("/ws/notifications") as websocket:
        # Simulamos envío de notificación
        client.post("/notifications/", json={
            "usuario_id": 1,
            "mensaje": "Prueba WS"
        })
        data = websocket.receive_json()
        assert data["mensaje"] == "Prueba WS"
