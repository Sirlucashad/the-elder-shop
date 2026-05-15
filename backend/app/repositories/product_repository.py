import logging
from sqlalchemy.orm import joinedload
from sqlalchemy import and_
from fastapi import HTTPException

from app.models.producto import Producto
from app.models.producto_variante import ProductoVariante
from app.models.videojuego import Videojuego
from app.models.genero import Genero

# Configuración del logger para este repositorio
logger = logging.getLogger(__name__)

class ProductRepository:

    def __init__(self, db):
        self.db = db

    # ======================
    # CREATE
    # ======================
    def create(self, data):
        try:
            logger.info(f"Iniciando creación de producto: {data.nombre}")
            
            producto = Producto(
                nombre=data.nombre,
                descripcion=data.descripcion,
                tipo_id=data.tipo_id,
                image_url=data.image_url,              
                image_public_id=data.image_public_id   
            )

            self.db.add(producto)
            self.db.flush()
            logger.debug(f"Producto base insertado con ID: {producto.id}")

            # ======================
            # Variantes
            # ======================
            for v in data.variantes:
                variante = ProductoVariante(
                    producto_id=producto.id,
                    plataforma_id=v.plataforma_id,
                    formato_id=v.formato_id,
                    stock=v.stock,
                    precio=v.precio
                )
                self.db.add(variante)
            logger.debug(f"Se agregaron {len(data.variantes)} variantes")

            # ======================
            # Videojuego
            # ======================
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

                if len(generos) != len(data.videojuego.generos_ids):
                    logger.warning("Algunos IDs de género proporcionados no existen en la base de datos.")

                videojuego.generos = generos
                logger.debug("Información de videojuego y géneros vinculada")

            self.db.commit()
            self.db.refresh(producto)
            logger.info(f"Producto '{producto.nombre}' creado exitosamente con ID: {producto.id}")

            return producto

        except Exception as e:
            self.db.rollback()
            logger.error(f"Error crítico al crear producto: {str(e)}", exc_info=True)
            raise HTTPException(status_code=500, detail="Error interno al crear el producto")

    # ======================
    # GET ALL
    # ======================
 # app/repositories/product_repository.py

    def get_all(self):
        try:
            # Cargamos variantes Y sus relaciones (plataforma/formato) para tener los nombres reales
            return self.db.query(Producto).options(
                joinedload(Producto.variantes).joinedload(ProductoVariante.plataforma),
                joinedload(Producto.variantes).joinedload(ProductoVariante.formato),
                joinedload(Producto.videojuego)
            ).all()
        except Exception as e:
            logger.error(f"Error al obtener productos: {str(e)}")
            raise HTTPException(status_code=500, detail="Error al obtener la lista")

    def delete(self, producto_id: int):
        try:
            producto = self.db.query(Producto).filter(Producto.id == producto_id).first()
            if not producto:
                raise HTTPException(status_code=404, detail="Producto no encontrado")

            # Eliminamos manualmente las variantes primero para evitar el conflicto 
            # con la tabla 'variantes_digitales' que no existe
            self.db.query(ProductoVariante).filter(ProductoVariante.producto_id == producto_id).delete()
            
            # Si tienes la tabla videojuegos, también deberías borrar su entrada vinculada
            self.db.query(Videojuego).filter(Videojuego.producto_id == producto_id).delete()

            self.db.delete(producto)
            self.db.commit()
            return {"message": "Producto eliminado con éxito"}
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error al eliminar: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

    # ======================
    # GET BY ID
    # ======================
    def get_by_id(self, producto_id: int):
        producto = self.db.query(Producto).options(
            joinedload(Producto.variantes),
            joinedload(Producto.videojuego)
        ).filter(Producto.id == producto_id).first()

        if not producto:
            logger.warning(f"Intento fallido de obtener producto inexistente: ID {producto_id}")
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        return producto

    # ======================
    # DELETE
    # ======================
    def delete(self, producto_id: int):
        try:
            producto = self.db.query(Producto).filter(Producto.id == producto_id).first()

            if not producto:
                logger.warning(f"Intento de eliminar producto inexistente: ID {producto_id}")
                raise HTTPException(status_code=404, detail="Producto no encontrado")

            self.db.delete(producto)
            self.db.commit()
            logger.info(f"Producto ID {producto_id} eliminado correctamente.")

            return {"message": "Producto eliminado"}
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error al eliminar producto {producto_id}: {str(e)}")
            raise HTTPException(status_code=500, detail="No se pudo eliminar el producto")

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
        try:
            query = self.db.query(Producto).options(
                joinedload(Producto.variantes),
                joinedload(Producto.videojuego).joinedload(Videojuego.generos)
            )

            if nombre:
                query = query.filter(Producto.nombre.ilike(f"%{nombre}%"))

            if genero_id:
                query = query.join(Producto.videojuego).join(Videojuego.generos).filter(
                    Genero.id == genero_id
                )

            if precio_min is not None or precio_max is not None:
                query = query.join(Producto.variantes)
                condiciones = []
                if precio_min is not None:
                    condiciones.append(ProductoVariante.precio >= precio_min)
                if precio_max is not None:
                    condiciones.append(ProductoVariante.precio <= precio_max)
                query = query.filter(and_(*condiciones))

            return query.offset(offset).limit(limit).all()
        except Exception as e:
            logger.error(f"Error en la búsqueda de productos: {str(e)}")
            raise HTTPException(status_code=500, detail="Error en el motor de búsqueda")