from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_and_login():
    # Registro
    response = client.post("/usuarios/register", json={
        "nombre": "Test User",
        "email": "test@example.com",
        "password": "123456",
        "rol": "usuario"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"

    # Login
    login = client.post("/usuarios/login", data={
        "username": "test@example.com",
        "password": "123456"
    })
    assert login.status_code == 200
    assert "access_token" in login.json()
