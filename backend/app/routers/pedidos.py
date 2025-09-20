from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.PedidoOut)
def create_pedido(pedido: schemas.PedidoBase, db: Session = Depends(get_db)):
    new_pedido = models.Pedido(**pedido.dict())
    db.add(new_pedido)
    db.commit()
    db.refresh(new_pedido)
    return new_pedido

@router.get("/", response_model=list[schemas.PedidoOut])
def list_pedidos(db: Session = Depends(get_db)):
    return db.query(models.Pedido).all()
