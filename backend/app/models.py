from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Text, TIMESTAMP, Boolean, DECIMAL, func
from sqlalchemy.orm import relationship
from .database import Base
import enum

class RolEnum(str, enum.Enum):
    usuario = "usuario"
    empresa = "empresa"
    admin = "admin"

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    rol = Column(Enum(RolEnum), default=RolEnum.usuario)
    creado_en = Column(TIMESTAMP, server_default=func.now())

    pedidos = relationship("Pedido", backref="usuario", cascade="all, delete-orphan")

class Empresa(Base):
    __tablename__ = "empresas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    direccion = Column(String(255))
    telefono = Column(String(50))
    creado_en = Column(TIMESTAMP, server_default=func.now())

    ambulancias = relationship("Ambulancia", backref="empresa", cascade="all, delete-orphan")

class Ambulancia(Base):
    __tablename__ = "ambulancias"
    id = Column(Integer, primary_key=True, index=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=False)
    patente = Column(String(50), unique=True, nullable=False)
    estado = Column(Enum("disponible", "en_servicio", "mantenimiento", name="estado_enum"), default="disponible")
    ubicacion_lat = Column(DECIMAL(10,7))
    ubicacion_lng = Column(DECIMAL(10,7))

    pedidos = relationship("Pedido", backref="ambulancia")

class Pedido(Base):
    __tablename__ = "pedidos"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    ambulancia_id = Column(Integer, ForeignKey("ambulancias.id"), nullable=True)
    descripcion = Column(Text)
    estado = Column(Enum("pendiente","asignado","completado","cancelado", name="estado_pedido"), default="pendiente")
    creado_en = Column(TIMESTAMP, server_default=func.now())

class Notificacion(Base):
    __tablename__ = "notificaciones"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    mensaje = Column(Text, nullable=False)
    leido = Column(Boolean, default=False)
    creado_en = Column(TIMESTAMP, server_default=func.now())
