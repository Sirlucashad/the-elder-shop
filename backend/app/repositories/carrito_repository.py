from app.models.carrito import Carrito
from app.models.carrito_item import CarritoItem
# 💡 Importamos las clases de los modelos para poder encadenar sus atributos en el joinedload
from app.models.producto_variante import ProductoVariante 
from sqlalchemy.orm import joinedload


class CarritoRepository:

    def __init__(self, db):
        self.db = db

    def get_by_user(self, user_id: int):
        # 🔥 MODIFICADO: Agregamos el joinedload para traer la variante y el producto de cada ítem
        return self.db.query(Carrito)\
            .filter(Carrito.usuario_id == user_id)\
            .options(
                joinedload(Carrito.items)
                .joinedload(CarritoItem.variante)
                .joinedload(ProductoVariante.producto)
            )\
            .first()

    def create(self, user_id: int):
        carrito = Carrito(usuario_id=user_id)
        self.db.add(carrito)
        self.db.commit()
        self.db.refresh(carrito)
        return carrito

    def add_item(self, carrito: Carrito, variante_id: int, cantidad: int):
        existing = next(
            (item for item in carrito.items if item.producto_variante_id == variante_id),
            None
        )

        if existing:
            existing.cantidad += cantidad
        else:
            item = CarritoItem(
                carrito_id=carrito.id,
                producto_variante_id=variante_id,
                cantidad=cantidad
            )
            self.db.add(item)

        self.db.commit()
        # 🔥 TIP EXTRA: Para que el retorno del POST /items también incluya todo masticado, 
        # volvemos a pedir el carrito usando el método con joinedload antes de retornar.
        return self.get_by_user(carrito.usuario_id)

    def remove_item(self, carrito: Carrito, item_id: int):
        item = next((i for i in carrito.items if i.id == item_id), None)

        if item:
            self.db.delete(item)
            self.db.commit()

        # 🔥 TIP EXTRA: Lo mismo para el DELETE, retornamos con la data fresca e hidratada.
        return self.get_by_user(carrito.usuario_id)

    # Vaciar carrito
    def clear_carrito(self, carrito: Carrito):
        """
        Vacía el carrito limpiando la lista de items. 
        Gracias a cascade="all, delete-orphan", SQLAlchemy se encarga 
        de borrar automáticamente los registros en la tabla 'carrito_items'.
        """
        carrito.items.clear()  # <-- Limpia la relación en memoria
        self.db.commit()       # <-- Sincroniza y borra los huérfanos en la BD