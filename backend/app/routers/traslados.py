from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.utils.email_utils import send_email

router = APIRouter()

@router.post("/programar", summary="Programar un traslado")
def programar_traslado(data: schemas.TrasladoProgramadoCreate, db: Session = Depends(get_db)):

    nuevo = models.TrasladoProgramado(
        nombre=data.nombre,
        apellido=data.apellido,
        email=data.email,
        dni=data.dni,
        nacimiento=data.nacimiento,
        telefono=data.telefono,
        cobertura=data.cobertura,
        cobertura_nombre=data.cobertura_nombre,
        nro_afiliado=data.nro_afiliado,
        tipo_ambulancia=data.tipo_ambulancia,
        direccion_salida=data.direccion_salida,
        destino=data.destino,
        fecha_traslado=data.fecha_traslado,
        hora_traslado=data.hora_traslado
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    #  EMAIL AL USUARIO 
    send_email(
        to=data.email,
        subject="✔ Confirmación de traslado programado",
        message=f"""
Hola {data.nombre},

Tu traslado ha sido programado con éxito.

 Fecha: {data.fecha_traslado}
 Hora: {data.hora_traslado}
 Tipo de ambulancia: {data.tipo_ambulancia}

Gracias por usar TrackingMed.
"""
    )

    #  EMAIL AL ADMIN 
    send_email(
        to="tu_admin@gmail.com",  # Cambiar
        subject=" Nuevo traslado programado",
        message=f"""
Nuevo traslado agendado.

Paciente: {data.nombre} {data.apellido}
Fecha: {data.fecha_traslado} {data.hora_traslado}
Destino: {data.destino}
"""
    )

    return {"message": "Traslado programado con éxito", "id": nuevo.id}
