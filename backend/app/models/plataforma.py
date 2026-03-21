from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Plataforma(Base):
    __tablename__ = "plataformas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, nullable=False)