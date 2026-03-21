from pydantic import BaseModel

class PlataformaOut(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True