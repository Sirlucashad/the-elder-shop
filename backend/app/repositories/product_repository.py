from sqlalchemy.orm import joinedload
from fastapi import HTTPException

from app.models.producto import Producto
from app.models.plataforma import Plataforma
from app.models.producto_plataforma import ProductoPlataforma


class ProductRepository:

    def __init__(self, db):
        self.db = db

    def get_all(self):
        productos = self.db.query(Producto).options(
            joinedload(Producto.tipo),
            joinedload(Producto.producto_plataforma).joinedload(ProductoPlataforma.plataforma)
        ).all()

        result = []

        for p in productos:
            plataformas = [
                {
                    "id": rel.plataforma.id,
                    "nombre": rel.plataforma.nombre,
                    "stock": rel.stock
                }
                for rel in p.producto_plataforma
            ]

            result.append({
                "id": p.id,
                "nombre": p.nombre,
                "precio": p.precio,
                "tipo": {
                    "id": p.tipo.id,
                    "nombre": p.tipo.nombre
                },
                "plataformas": plataformas
            })

        return result

    def create(self, data):
        producto = Producto(
            nombre=data.nombre,
            precio=data.precio,
            tipo_id=data.tipo_id
        )

        self.db.add(producto)
        self.db.commit()
        self.db.refresh(producto)

        for p in data.plataformas:
            plataforma = self.db.query(Plataforma).filter(
                Plataforma.id == p.plataforma_id
            ).first()

            if not plataforma:
                raise HTTPException(status_code=400, detail="Plataforma no existe")

            rel = ProductoPlataforma(
                producto_id=producto.id,
                plataforma_id=plataforma.id,
                stock=p.stock
            )

            self.db.add(rel)

        self.db.commit()

        return producto