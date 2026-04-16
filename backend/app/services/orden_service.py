from fastapi import HTTPException


class OrdenService:

    def __init__(self, orden_repo, carrito_repo, db):
        self.orden_repo = orden_repo
        self.carrito_repo = carrito_repo
        self.db = db

    def checkout(self, usuario_id: int, metodo_pago):

        carrito = self.carrito_repo.get_by_user(usuario_id)

        if not carrito or not carrito.items:
            raise HTTPException(status_code=400, detail="El carrito está vacío")

        total = 0

        orden = self.orden_repo.create(usuario_id, metodo_pago)

        for item in carrito.items:
            variante = item.producto_variante

            if variante.stock < item.cantidad:
                raise HTTPException(
                    status_code=400,
                    detail=f"Stock insuficiente para variante {variante.id}"
                )

            precio = variante.precio
            subtotal = item.cantidad * precio

            self.orden_repo.add_item(
                orden.id,
                item.producto_variante_id,
                item.cantidad,
                precio
            )

            variante.stock -= item.cantidad

            total += subtotal

        self.orden_repo.update_total(orden, total)

        self.carrito_repo.clear_carrito(carrito.id)

        self.orden_repo.commit()
        self.orden_repo.refresh(orden)

        return orden

  
    def get_user_orders(self, user_id: int):
        return self.orden_repo.get_by_user(user_id)

    def get_order_detail(self, user_id: int, orden_id: int):
        orden = self.orden_repo.get_by_id(orden_id)

        if orden.usuario_id != user_id:
            raise HTTPException(status_code=403, detail="No autorizado")

        return orden