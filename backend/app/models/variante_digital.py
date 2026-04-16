from sqlalchemy import Column, Integer, ForeignKey, String, Text, Float
from sqlalchemy.orm import relationship
from app.db.database import Base


class VarianteDigital(Base):
  
    __tablename__ = "variantes_digitales"

    id = Column(Integer, primary_key=True)
    
    variante_id = Column(Integer, ForeignKey("producto_variantes.id"), unique=True)

   
    url_descarga = Column(String(500), nullable=False)
    peso_gb = Column(Float, nullable=True)
    instrucciones_canje = Column(Text, nullable=True)

    
    variante = relationship("ProductoVariante", back_populates="detalle_digital")