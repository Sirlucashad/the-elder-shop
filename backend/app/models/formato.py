from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Formato(Base):
    __tablename__ = "formatos"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), unique=True)