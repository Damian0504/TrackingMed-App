from pydantic import BaseModel, EmailStr
from typing import Optional

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
    class Config:
        orm_mode = True

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

