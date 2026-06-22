from pydantic import BaseModel
from typing import List, Optional



class ProductoResumenOut(BaseModel):
    nombre: str
    image_url: Optional[str] = None

    class Config:
        from_attributes = True


class VarianteResumenOut(BaseModel):
    id: int
    precio: float

    nombre: Optional[str] = None 
    producto: ProductoResumenOut # 👈 Anidamos el producto base

    class Config:
        from_attributes = True

# =====================================================================
# Esquemas Principales del Carrito
# =====================================================================

class CarritoItemCreate(BaseModel):
    producto_variante_id: int
    cantidad: int


class CarritoItemOut(BaseModel):
    id: int
    producto_variante_id: int
    cantidad: int

    variante: Optional[VarianteResumenOut] = None 

    class Config:
        from_attributes = True


class CarritoOut(BaseModel):
    id: int
    items: List[CarritoItemOut]

    class Config:
        from_attributes = True