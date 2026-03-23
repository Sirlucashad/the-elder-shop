from sqlalchemy.orm import joinedload
from fastapi import HTTPException

from app.models.producto import Producto
from app.models.plataforma import Plataforma


class ProductRepository:

    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Producto).options(
            joinedload(Producto.tipo),
            joinedload(Producto.plataformas)
        ).all()

    def get_by_id(self, producto_id: int):
        producto = self.db.query(Producto).options(
            joinedload(Producto.tipo),
            joinedload(Producto.plataformas)
        ).filter(Producto.id == producto_id).first()

        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        return producto

    def create(self, nombre, precio, stock, tipo_id, plataformas_ids):
        # Buscar plataformas
        plataformas = self.db.query(Plataforma).filter(
            Plataforma.id.in_(plataformas_ids)
        ).all()

        # Validación: evitar IDs inválidos
        if len(plataformas) != len(plataformas_ids):
            raise HTTPException(
                status_code=400,
                detail="Una o más plataformas no existen"
            )

        # Crear producto
        producto = Producto(
            nombre=nombre,
            precio=precio,
            stock=stock,
            tipo_id=tipo_id,
            plataformas=plataformas
        )

        self.db.add(producto)
        self.db.commit()
        self.db.refresh(producto)

        return producto