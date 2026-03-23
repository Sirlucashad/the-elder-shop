from pydantic import BaseModel
from typing import List
from app.schemas.platform import PlataformaOut
from app.schemas.product_type import TipoProductoOut

class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio: float
    stock: int

    tipo: TipoProductoOut
    plataformas: List[PlataformaOut]

    class Config:
        from_attributes = True