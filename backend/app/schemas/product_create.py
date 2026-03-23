from pydantic import BaseModel
from typing import List

class ProductoCreate(BaseModel):
    nombre: str
    precio: float
    stock: int
    tipo_id: int
    plataformas_ids: List[int]