from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_empresa():
    resp = client.post("/empresas/", json={
        "nombre": "Emergencias SA",
        "direccion": "Av. Salud 123",
        "telefono": "123456789"
    })
    assert resp.status_code == 200
    assert resp.json()["nombre"] == "Emergencias SA"
