from pydantic import BaseModel
from typing import List, Optional


# =================================================================
# AUXILIARY SCHEMAS (Para nombres de tablas maestras)
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
# CREATE SCHEMAS (Para recibir datos del Frontend)
# =================================================================

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
    image_url: Optional[str] = None
    image_public_id: Optional[str] = None


# =================================================================
# OUTPUT SCHEMAS (Para enviar datos al Frontend)
# =================================================================

class VarianteOut(BaseModel):
    id: int
    plataforma_id: Optional[int]
    formato_id: Optional[int]
    stock: int
    precio: Optional[float]
    
    # Relaciones anidadas para obtener nombres (PC, PS5, Digital, etc.)
    plataforma: Optional[PlataformaOut]
    formato: Optional[FormatoOut]

    class Config:
        from_attributes = True


class VideojuegoOut(BaseModel):
    anio_lanzamiento: int
    jugadores_max: int
    es_cooperativo: bool
    # Incluimos la lista de géneros con sus nombres
    generos: List[GeneroOut] = []

    class Config:
        from_attributes = True


class ProductoOut(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str]
    image_url: Optional[str]
    
    # Estos campos ahora contienen los objetos anidados definidos arriba
    variantes: List[VarianteOut]
    videojuego: Optional[VideojuegoOut]

    class Config:
        from_attributes = True