from pydantic import BaseModel
from typing import List, Optional


# ======================
# CREATE
# ======================

class VarianteCreate(BaseModel):
    plataforma_id: Optional[int]
    formato_id: Optional[int]
    stock: int
    precio: Optional[float]


class VideojuegoCreate(BaseModel):
    anio_lanzamiento: int
    jugadores_max: int
    es_cooperativo: bool
    generos_ids: List[int]


class ProductoCreate(BaseModel):
    nombre: str
    descripcion: Optional[str]
    tipo_id: int

    variantes: List[VarianteCreate]
    videojuego: Optional[VideojuegoCreate] = None


# ======================
# OUTPUT
# ======================

class VarianteOut(BaseModel):
    id: int
    plataforma_id: Optional[int]
    formato_id: Optional[int]
    stock: int
    precio: Optional[float]

    class Config:
        from_attributes = True


class VideojuegoOut(BaseModel):
    anio_lanzamiento: int
    jugadores_max: int
    es_cooperativo: bool

    class Config:
        from_attributes = True


class ProductoOut(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str]

    variantes: List[VarianteOut]
    videojuego: Optional[VideojuegoOut]

    class Config:
        from_attributes = True