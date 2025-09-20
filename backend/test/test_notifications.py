from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_send_notification():
    resp = client.post("/notifications/", json={
        "usuario_id": 1,
        "mensaje": "Tu ambulancia está en camino"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["mensaje"] == "Tu ambulancia está en camino"
