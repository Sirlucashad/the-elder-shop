from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    precio = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

    tipo_id = Column(Integer, ForeignKey("tipos_producto.id"))

    tipo = relationship("TipoProducto")

    plataformas = relationship(
        "Plataforma",
        secondary="producto_plataforma",
        backref="productos"
    )