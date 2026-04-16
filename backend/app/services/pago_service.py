from app.integrations.mercadopago_client import MercadoPagoClient
from app.models.orden import EstadoOrdenEnum


class PagoService:

    def __init__(self, pago_repo, orden_repo):
        self.pago_repo = pago_repo
        self.orden_repo = orden_repo
        self.mp_client = MercadoPagoClient()

    def crear_pago(self, orden_id: int):
        orden = self.orden_repo.get_by_id(orden_id)

        monto_total = orden.total

        pago = self.pago_repo.create(
            orden_id=orden_id,
            monto=monto_total,
            metodo="mercadopago"
        )

        preferencia = self.mp_client.crear_preferencia(
            monto_total,
            f"Orden #{orden_id}"
        )

        # 🔥 guardar external_id (id de preferencia)
        self.pago_repo.update_status(
            pago.id,
            "pendiente",
            preferencia["id"]
        )

        return {
            "pago_id": pago.id,
            "url_pago": preferencia["init_point"]
        }

    def procesar_webhook(self, payment_id: str):

        payment = self.mp_client.obtener_pago(payment_id)

        estado = payment.get("status")
        external_id = str(payment.get("id"))

        pago = self.pago_repo.get_by_external_id(external_id)

        if not pago:
            return {"message": "Pago no encontrado"}

        self.pago_repo.update_status(pago.id, estado, external_id)

        # 🔥 actualizar orden
        if estado == "approved":
            orden = self.orden_repo.get_by_id(pago.orden_id)
            self.orden_repo.update_estado(orden, EstadoOrdenEnum.pagado)
            self.orden_repo.commit()

        return {"status": estado}