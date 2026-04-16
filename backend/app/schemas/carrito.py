from pydantic import BaseModel
from typing import List


class CarritoItemCreate(BaseModel):
    producto_variante_id: int
    cantidad: int


class CarritoItemOut(BaseModel):
    id: int
    producto_variante_id: int
    cantidad: int

    class Config:
        from_attributes = True


class CarritoOut(BaseModel):
    id: int
    items: List[CarritoItemOut]

    class Config:
        from_attributes = True