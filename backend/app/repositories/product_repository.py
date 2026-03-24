from sqlalchemy.orm import joinedload
from fastapi import HTTPException

from app.models.producto import Producto
from app.models.producto_variante import ProductoVariante
from app.models.videojuego import Videojuego
from app.models.genero import Genero


class ProductRepository:

    def __init__(self, db):
        self.db = db

    # ======================
    # CREATE
    # ======================
    def create(self, data):
        producto = Producto(
            nombre=data.nombre,
            descripcion=data.descripcion,
            tipo_id=data.tipo_id
        )

        self.db.add(producto)
        self.db.flush()

        # Variantes
        for v in data.variantes:
            variante = ProductoVariante(
                producto_id=producto.id,
                plataforma_id=v.plataforma_id,
                formato_id=v.formato_id,
                stock=v.stock,
                precio=v.precio
            )
            self.db.add(variante)

        # Videojuego
        if data.videojuego:
            videojuego = Videojuego(
                producto_id=producto.id,
                anio_lanzamiento=data.videojuego.anio_lanzamiento,
                jugadores_max=data.videojuego.jugadores_max,
                es_cooperativo=data.videojuego.es_cooperativo
            )
            self.db.add(videojuego)
            self.db.flush()

            generos = self.db.query(Genero).filter(
                Genero.id.in_(data.videojuego.generos_ids)
            ).all()

            videojuego.generos = generos

        self.db.commit()
        self.db.refresh(producto)

        return producto

    # ======================
    # GET ALL
    # ======================
    def get_all(self):
        return self.db.query(Producto).options(
            joinedload(Producto.variantes),
            joinedload(Producto.videojuego)
        ).all()

    # ======================
    # GET BY ID
    # ======================
    def get_by_id(self, producto_id: int):
        producto = self.db.query(Producto).options(
            joinedload(Producto.variantes),
            joinedload(Producto.videojuego)
        ).filter(Producto.id == producto_id).first()

        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        return producto

    # ======================
    # DELETE
    # ======================
    def delete(self, producto_id: int):
        producto = self.db.query(Producto).filter(Producto.id == producto_id).first()

        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        self.db.delete(producto)
        self.db.commit()

        return {"message": "Producto eliminado"}