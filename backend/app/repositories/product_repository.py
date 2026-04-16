from sqlalchemy.orm import joinedload
from sqlalchemy import and_
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

    # ======================
    # SEARCH 
    # ======================
    def search(
        self,
        nombre: str = None,
        genero_id: int = None,
        precio_min: float = None,
        precio_max: float = None,
        limit: int = 10,
        offset: int = 0
    ):
        query = self.db.query(Producto).options(
            joinedload(Producto.variantes),
            joinedload(Producto.videojuego).joinedload(Videojuego.generos)
        )

        # 🔎 nombre
        if nombre:
            query = query.filter(Producto.nombre.ilike(f"%{nombre}%"))

        # 🎮 genero
        if genero_id:
            query = query.join(Producto.videojuego).join(Videojuego.generos).filter(
                Genero.id == genero_id
            )

        # 💰 precio
        if precio_min is not None or precio_max is not None:
            query = query.join(Producto.variantes)

            condiciones = []
            if precio_min is not None:
                condiciones.append(ProductoVariante.precio >= precio_min)
            if precio_max is not None:
                condiciones.append(ProductoVariante.precio <= precio_max)

            query = query.filter(and_(*condiciones))

        return query.offset(offset).limit(limit).all()