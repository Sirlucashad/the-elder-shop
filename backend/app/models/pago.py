import enum
from datetime import datetime
from sqlalchemy import Column, Integer, Float, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.database import Base



class MetodoPagoEnum(str, enum.Enum):
    tarjeta = "tarjeta"
    mercadopago = "mercadopago"
    transferencia = "transferencia"

class EstadoPagoEnum(str, enum.Enum):
    pendiente = "pendiente"
    aprobado = "aprobado"
    rechazado = "rechazado"
    reembolsado = "reembolsado"



class Pago(Base):
    __tablename__ = "pagos"

    id = Column(Integer, primary_key=True, index=True)
    orden_id = Column(Integer, ForeignKey("ordenes.id"))
    
    monto = Column(Float, nullable=False) 

    estado = Column(Enum(EstadoPagoEnum), default=EstadoPagoEnum.pendiente)    
   
    metodo = Column(Enum(MetodoPagoEnum), nullable=False)    
   
    external_id = Column(String(255), nullable=True)
       
    created_at = Column(DateTime, default=datetime.utcnow)

  
    orden = relationship("Orden", back_populates="pagos")