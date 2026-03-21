from pydantic import BaseModel

class TipoProductoOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True