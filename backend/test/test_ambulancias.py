from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_list_ambulancia():
    # Crear
    resp = client.post("/ambulancias/", json={
        "empresa_id": 1,
        "patente": "XYZ123",
        "estado": "disponible"
    })
    assert resp.status_code == 200

    # Listar
    resp = client.get("/ambulancias/")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
