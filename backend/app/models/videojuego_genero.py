from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base


class VideojuegoGenero(Base):
    __tablename__ = "videojuego_genero"

    id = Column(Integer, primary_key=True)
    videojuego_id = Column(Integer, ForeignKey("videojuegos.id"))
    genero_id = Column(Integer, ForeignKey("generos.id"))