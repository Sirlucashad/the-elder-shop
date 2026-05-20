from pydantic import BaseModel
from typing import List, Optional


# =================================================================
# AUXILIARY SCHEMAS
# =================================================================

class PlataformaOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True


class FormatoOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True


class GeneroOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True


# =================================================================
# DIGITAL SCHEMAS
# =================================================================

class VarianteDigitalCreate(BaseModel):
    url_descarga: str
    peso_gb: Optional[float] = None
    instrucciones_canje: Optional[str] = None


class VarianteDigitalOut(BaseModel):
    id: int
    url_descarga: str
    peso_gb: Optional[float]
    instrucciones_canje: Optional[str]

    class Config:
        from_attributes = True


# =================================================================
# CREATE SCHEMAS
# =================================================================

class VarianteCreate(BaseModel):
    plataforma_id: Optional[int]
    formato_id: Optional[int]

    stock: int
    precio: Optional[float]

    detalle_digital: Optional[VarianteDigitalCreate] = None


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

    image_url: Optional[str] = None
    image_public_id: Optional[str] = None


# =================================================================
# OUTPUT SCHEMAS
# =================================================================

class VarianteOut(BaseModel):
    id: int

    plataforma_id: Optional[int]
    formato_id: Optional[int]

    stock: int
    precio: Optional[float]

    plataforma: Optional[PlataformaOut]
    formato: Optional[FormatoOut]

    detalle_digital: Optional[VarianteDigitalOut] = None

    class Config:
        from_attributes = True


class VideojuegoOut(BaseModel):
    anio_lanzamiento: int
    jugadores_max: int
    es_cooperativo: bool

    generos: List[GeneroOut] = []

    class Config:
        from_attributes = True


class ProductoOut(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str]

    image_url: Optional[str]

    variantes: List[VarianteOut]

    videojuego: Optional[VideojuegoOut]

    class Config:
        from_attributes = True