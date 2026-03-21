from sqlalchemy import Column, Integer, String
from app.db.database import Base

class TipoProducto(Base):
    __tablename__ = "tipos_producto"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, nullable=False)