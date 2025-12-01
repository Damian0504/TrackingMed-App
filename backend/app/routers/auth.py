from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.utils.security import hash_password, verify_password
from app.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


# =======================
# 📌 REGISTRO USUARIO
# =======================
@router.post("/register", response_model=schemas.TokenResponse)
def register_user(payload: schemas.UsuarioCreate, db: Session = Depends(get_db)):

    # Verificar email repetido
    existing = db.query(models.Usuario).filter(
        models.Usuario.email == payload.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email ya registrado"
        )

    hashed = hash_password(payload.password)

    nuevo = models.Usuario(
        nombre=payload.nombre,
        email=payload.email,
        password_hash=hashed,
        rol=payload.rol or "usuario"
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    token = create_access_token({"sub": nuevo.email, "user_id": nuevo.id})

    # ⚠️ Devolver el usuario como Pydantic, no SQLAlchemy
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": schemas.UsuarioOut.from_orm(nuevo)
    }



# =======================
# 📌 LOGIN USUARIO (JSON)
# =======================
@router.post("/login", response_model=schemas.TokenResponse)
def login(data: dict = Body(...), db: Session = Depends(get_db)):

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email y contraseña son requeridos"
        )

    user = db.query(models.Usuario).filter(
        models.Usuario.email == email
    ).first()

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )

    token = create_access_token({"sub": user.email, "user_id": user.id})

    # ⚠️ Envolver el usuario en UsuarioOut para evitar problemas de enum y orm
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": schemas.UsuarioOut.from_orm(user)
    }

