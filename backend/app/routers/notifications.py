from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..utils.notifications import push_notification

router = APIRouter()

@router.post("/", response_model=schemas.NotificacionOut)
async def send_notification(notificacion: schemas.NotificacionBase, db: Session = Depends(get_db)):
    new_notif = models.Notificacion(**notificacion.dict())
    db.add(new_notif)
    db.commit()
    db.refresh(new_notif)
    await push_notification({"usuario_id": notificacion.usuario_id, "mensaje": notificacion.mensaje})
    return new_notif
