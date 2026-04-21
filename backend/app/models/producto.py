from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    precio_base = Column(Float, nullable=True)

    tipo_id = Column(Integer, ForeignKey("tipos_producto.id"))

    
    image_url = Column(String(255), nullable=True)
    image_public_id = Column(String(255), nullable=True)

    tipo = relationship("TipoProducto")

    variantes = relationship(
        "ProductoVariante",
        back_populates="producto",
        cascade="all, delete"
    )

    videojuego = relationship(
        "Videojuego",
        uselist=False,
        back_populates="producto",
        cascade="all, delete"
    )