from app.models.orden import Orden, EstadoOrdenEnum
from app.models.detalle_orden import DetalleOrden
from fastapi import HTTPException
from sqlalchemy.orm import joinedload


class OrdenRepository:

    def __init__(self, db):
        self.db = db

    def create(self, user_id: int, metodo_pago=None):
        orden = Orden(
            usuario_id=user_id,
            metodo_pago=metodo_pago,
            estado=EstadoOrdenEnum.pendiente,
            total=0
        )
        self.db.add(orden)
        self.db.flush()
        return orden

    def add_item(self, orden_id: int, variante_id: int, cantidad: int, precio: float):
        item = DetalleOrden(
            orden_id=orden_id,
            producto_variante_id=variante_id, 
            cantidad=cantidad,
            precio_unitario=precio
        )
        self.db.add(item)
        return item

    def update_total(self, orden: Orden, total: float):
        orden.total = total

    def update_estado(self, orden: Orden, estado: EstadoOrdenEnum):
        orden.estado = estado

    def get_by_id(self, orden_id: int):
        orden = self.db.query(Orden).options(
            joinedload(Orden.items).joinedload("producto_variante")
        ).filter(Orden.id == orden_id).first()

        if not orden:
            raise HTTPException(status_code=404, detail="Orden no encontrada")

        return orden


    def get_by_user(self, user_id: int):
        return self.db.query(Orden).options(
            joinedload(Orden.items)
        ).filter(Orden.usuario_id == user_id).all()

    def commit(self):
        self.db.commit()

    def refresh(self, orden: Orden):
        self.db.refresh(orden)