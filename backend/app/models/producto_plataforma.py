from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class ProductoPlataforma(Base):
    __tablename__ = "producto_plataforma"

    id = Column(Integer, primary_key=True, index=True)

    producto_id = Column(Integer, ForeignKey("productos.id"))
    plataforma_id = Column(Integer, ForeignKey("plataformas.id"))

    stock = Column(Integer, default=0)  

    producto = relationship("Producto", backref="producto_plataforma")
    plataforma = relationship("Plataforma")