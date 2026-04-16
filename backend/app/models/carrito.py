from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Carrito(Base):
    __tablename__ = "carritos"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), unique=True)

  
    usuario = relationship("Usuario", back_populates="carrito")

    items = relationship("CarritoItem", back_populates="carrito", cascade="all, delete-orphan" )