from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class CarritoItem(Base):
    __tablename__ = "carrito_items"

    id = Column(Integer, primary_key=True)

    carrito_id = Column(Integer, ForeignKey("carritos.id"))
    producto_variante_id = Column(Integer, ForeignKey("producto_variantes.id"))

    cantidad = Column(Integer, nullable=False)

    carrito = relationship("Carrito", back_populates="items")
    variante = relationship("ProductoVariante")