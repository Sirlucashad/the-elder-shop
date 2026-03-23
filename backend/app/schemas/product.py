from pydantic import BaseModel
from typing import List


class ProductoPlataformaCreate(BaseModel):
    plataforma_id: int
    stock: int


class ProductoCreate(BaseModel):
    nombre: str
    precio: float
    tipo_id: int
    plataformas: List[ProductoPlataformaCreate]


class PlataformaStockOut(BaseModel):
    id: int
    nombre: str
    stock: int

    class Config:
        from_attributes = True


class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio: float

    tipo: dict
    plataformas: List[PlataformaStockOut]

    class Config:
        from_attributes = True