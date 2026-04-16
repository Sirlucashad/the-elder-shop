from sqlalchemy import Column, Integer, ForeignKey, Float, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.db.database import Base


class MetodoPagoEnum(str, enum.Enum):
    tarjeta = "tarjeta"
    mercadopago = "mercadopago"


class EstadoOrdenEnum(str, enum.Enum):
    pendiente = "pendiente"
    pagada = "pagada"
    cancelada = "cancelada"

class Orden(Base):
    __tablename__ = "ordenes"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    total = Column(Float, nullable=False)

    metodo_pago = Column(Enum(MetodoPagoEnum), nullable=True)
    estado = Column(Enum(EstadoOrdenEnum), default=EstadoOrdenEnum.pendiente)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

   
    items = relationship("DetalleOrden", back_populates="orden", cascade="all, delete-orphan")
    pagos = relationship("Pago", back_populates="orden")