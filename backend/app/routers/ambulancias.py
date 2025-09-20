from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.AmbulanciaOut)
def create_ambulancia(ambulancia: schemas.AmbulanciaBase, db: Session = Depends(get_db)):
    new_ambulancia = models.Ambulancia(**ambulancia.dict())
    db.add(new_ambulancia)
    db.commit()
    db.refresh(new_ambulancia)
    return new_ambulancia

@router.get("/", response_model=list[schemas.AmbulanciaOut])
def list_ambulancias(db: Session = Depends(get_db)):
    return db.query(models.Ambulancia).all()
