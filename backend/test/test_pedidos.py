from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_list_pedido():
    resp = client.post("/pedidos/", json={
        "usuario_id": 1,
        "descripcion": "Paciente con dolor torácico"
    })
    assert resp.status_code == 200
    pedido = resp.json()
    assert pedido["estado"] == "pendiente"

    resp = client.get("/pedidos/")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
