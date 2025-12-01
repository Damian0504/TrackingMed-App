from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, time


# Usuarios 
class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    password: str
    rol: Optional[str] = "usuario"

class UsuarioOut(UsuarioBase):
    id: int
    rol: str

    model_config = {
        "from_attributes": True
    }


# Token response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UsuarioOut

    model_config = {
        "from_attributes": True
    }



# Empresas 
class EmpresaBase(BaseModel):
    nombre: str
    direccion: Optional[str] = None
    telefono: Optional[str] = None

class EmpresaCreate(EmpresaBase):
    pass

class EmpresaOut(EmpresaBase):
    id: int
    class Config:
        orm_mode = True


# Ambulancias 
class AmbulanciaBase(BaseModel):
    empresa_id: int
    patente: str
    estado: Optional[str] = "disponible"

class AmbulanciaOut(AmbulanciaBase):
    id: int
    class Config:
        orm_mode = True


# Pedidos 
class PedidoBase(BaseModel):
    usuario_id: int
    descripcion: Optional[str] = None

class PedidoOut(PedidoBase):
    id: int
    estado: str
    class Config:
        orm_mode = True


# Notificaciones 
class NotificacionBase(BaseModel):
    usuario_id: int
    mensaje: str

class NotificacionOut(NotificacionBase):
    id: int
    leido: bool
    class Config:
        orm_mode = True


# Traslados programados
class TrasladoProgramadoCreate(BaseModel):
    nombre: str
    apellido: str
    email: str
    dni: str
    nacimiento: date
    telefono: str
    cobertura: str
    cobertura_nombre: Optional[str]
    nro_afiliado: Optional[str]
    tipo_ambulancia: str
    direccion_salida: str
    destino: str
    fecha_traslado: date
    hora_traslado: time

# -----------------------------------------
# RECUPERACIÓN / RESETEO DE CONTRASEÑA
# -----------------------------------------

class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordResetUpdate(BaseModel):
    password: str
