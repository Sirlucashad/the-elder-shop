from pydantic import BaseModel
from typing import List
from app.schemas.plataforma import PlataformaOut
from app.schemas.tipo_producto import TipoProductoOut

class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int

    tipo: TipoProductoOut
    plataformas: List[PlataformaOut]

    class Config:
        from_attributes = True