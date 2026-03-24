from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Videojuego(Base):
    __tablename__ = "videojuegos"

    id = Column(Integer, primary_key=True, index=True)
    producto_id = Column(Integer, ForeignKey("productos.id"))

    anio_lanzamiento = Column(Integer)
    jugadores_max = Column(Integer)
    es_cooperativo = Column(Boolean)

    producto = relationship("Producto", back_populates="videojuego")
    generos = relationship("Genero", secondary="videojuego_genero")