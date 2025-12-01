from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.utils.email_sender import send_password_reset_email
from app.utils.security import hash_password
import secrets
import datetime
import os

router = APIRouter(prefix="/auth", tags=["auth"])

RESET_TOKEN_EXPIRE_HOURS = int(os.getenv("RESET_TOKEN_EXPIRE_HOURS", "1"))
FRONTEND_BASE = os.getenv("FRONTEND_BASE", "http://localhost:3000")  # para construir link

@router.post("/recuperar-password")
def recuperar_password(payload: dict, db: Session = Depends(get_db)):
    """
    payload = { "email": "usuario@..." }
    """
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email requerido")

    user = db.query(models.Usuario).filter(models.Usuario.email == email).first()
    if not user:
        # Por seguridad devolvemos 200 aunque no exista
        return {"ok": True, "msg": "Si el email existe, recibirás instrucciones"}

    # Generar token seguro
    token = secrets.token_urlsafe(48)
    expiracion = datetime.datetime.utcnow() + datetime.timedelta(hours=RESET_TOKEN_EXPIRE_HOURS)

    prt = models.PasswordResetToken(
        usuario_id=user.id,
        token=token,
        expiracion=expiracion
    )
    db.add(prt)
    db.commit()

    # Construir link de restablecimiento
    reset_link = f"{FRONTEND_BASE}/restablecer-password?token={token}"

    try:
        send_password_reset_email(user.email, reset_link)
    except Exception as e:
        # opcional: hacer rollback o mark token como usado/invalido
        raise HTTPException(status_code=500, detail=f"Error enviando email: {e}")

    return {"ok": True, "msg": "Si el email existe, recibirás instrucciones"}

@router.post("/restablecer-password")
def restablecer_password(payload: dict, db: Session = Depends(get_db)):
    """
    payload = { "token": "<token>", "new_password": "..." }
    """
    token = payload.get("token")
    new_password = payload.get("new_password")
    if not token or not new_password:
        raise HTTPException(status_code=400, detail="Token y nueva contraseña requeridos")

    prt = db.query(models.PasswordResetToken).filter(models.PasswordResetToken.token == token).first()
    if not prt or prt.usado:
        raise HTTPException(status_code=400, detail="Token inválido o ya usado")

    if prt.expiracion < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expirado")

    user = db.query(models.Usuario).filter(models.Usuario.id == prt.usuario_id).first()
    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Actualizar password
    user.password_hash = hash_password(new_password)
    prt.usado = True
    db.add(user)
    db.add(prt)
    db.commit()

    return {"ok": True, "msg": "Contraseña actualizada correctamente"}
