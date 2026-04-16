from fastapi import HTTPException


class CarritoService:

    def __init__(self, repository):
        self.repository = repository

    def get_or_create(self, user_id: int):
        carrito = self.repository.get_by_user(user_id)

        if not carrito:
            carrito = self.repository.create(user_id)

        return carrito

    def add_item(self, user_id: int, data):
        carrito = self.get_or_create(user_id)

        if data.cantidad <= 0:
            raise HTTPException(status_code=400, detail="Cantidad inválida")

        return self.repository.add_item(
            carrito,
            data.producto_variante_id,
            data.cantidad
        )

    def remove_item(self, user_id: int, item_id: int):
        carrito = self.get_or_create(user_id)
        return self.repository.remove_item(carrito, item_id)