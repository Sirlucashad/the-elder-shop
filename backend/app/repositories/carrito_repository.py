from app.models.carrito import Carrito
from app.models.carrito_item import CarritoItem


class CarritoRepository:

    def __init__(self, db):
        self.db = db

    def get_by_user(self, user_id: int):
        return self.db.query(Carrito).filter(Carrito.usuario_id == user_id).first()

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
        self.db.refresh(carrito)

        return carrito

    def remove_item(self, carrito: Carrito, item_id: int):
        item = next((i for i in carrito.items if i.id == item_id), None)

        if item:
            self.db.delete(item)
            self.db.commit()

        return carrito

    # 🔥 NUEVO: vaciar carrito
    def clear_carrito(self, carrito_id: int):
        items = self.db.query(CarritoItem).filter(CarritoItem.carrito_id == carrito_id).all()

        for item in items:
            self.db.delete(item)

        self.db.commit()