from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Genero(Base):
    __tablename__ = "generos"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), unique=True)