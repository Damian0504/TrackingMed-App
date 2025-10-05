from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.EmpresaOut)
def create_empresa(empresa: schemas.EmpresaCreate, db: Session = Depends(get_db)):
    new_empresa = models.Empresa(**empresa.dict())
    db.add(new_empresa)
    db.commit()
    db.refresh(new_empresa)
    return new_empresa

@router.get("/", response_model=list[schemas.EmpresaOut])
def list_empresas(db: Session = Depends(get_db)):
    return db.query(models.Empresa).all()
