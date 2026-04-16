
from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.db.database import Base

class DetalleOrden(Base):
    __tablename__ = "detalles_orden"

    id = Column(Integer, primary_key=True, index=True)
    orden_id = Column(Integer, ForeignKey("ordenes.id", ondelete="CASCADE"))
    
    
    producto_variante_id = Column(Integer, ForeignKey("producto_variantes.id"))
    
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Float, nullable=False)

    
    orden = relationship("Orden", back_populates="items")
 
    producto_variante = relationship("ProductoVariante")