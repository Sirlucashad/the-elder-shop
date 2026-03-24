from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class ProductoVariante(Base):
    __tablename__ = "producto_variantes"

    id = Column(Integer, primary_key=True)

    producto_id = Column(Integer, ForeignKey("productos.id"))
    plataforma_id = Column(Integer, ForeignKey("plataformas.id"), nullable=True)
    formato_id = Column(Integer, ForeignKey("formatos.id"), nullable=True)

    stock = Column(Integer, default=0)
    precio = Column(Float, nullable=True)

    producto = relationship("Producto", back_populates="variantes")
    plataforma = relationship("Plataforma")
    formato = relationship("Formato")