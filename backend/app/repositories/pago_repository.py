from app.models.pago import Pago


class PagoRepository:

    def __init__(self, db):
        self.db = db

    def create(self, orden_id: int, monto: float, metodo: str):
        pago = Pago(
            orden_id=orden_id,
            monto=monto,
            metodo=metodo,
            estado="pendiente"
        )
        self.db.add(pago)
        self.db.commit()              # 🔥 IMPORTANTE: persistir
        self.db.refresh(pago)
        return pago

    def get_by_id(self, pago_id: int):
        return self.db.query(Pago).filter(Pago.id == pago_id).first()

    def get_by_external_id(self, external_id: str):
        return self.db.query(Pago).filter(Pago.external_id == external_id).first()

    def update_status(self, pago_id: int, estado: str, external_id: str = None):
        pago = self.get_by_id(pago_id)

        pago.estado = estado

        if external_id:
            pago.external_id = external_id

        self.db.commit()
        self.db.refresh(pago)

        return pago