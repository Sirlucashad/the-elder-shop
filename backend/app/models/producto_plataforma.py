from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base

class ProductoPlataforma(Base):
    __tablename__ = "producto_plataforma"

    id = Column(Integer, primary_key=True, index=True)
    producto_id = Column(Integer, ForeignKey("productos.id"))
    plataforma_id = Column(Integer, ForeignKey("plataformas.id"))