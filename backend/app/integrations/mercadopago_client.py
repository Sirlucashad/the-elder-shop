import mercadopago
import os


class MercadoPagoClient:

    def __init__(self):
        self.sdk = mercadopago.SDK(os.getenv("MP_ACCESS_TOKEN"))

    def crear_preferencia(self, monto: float, descripcion: str):
        preference_data = {
            "items": [
                {
                    "title": descripcion,
                    "quantity": 1,
                    "unit_price": monto
                }
            ]
        }

        response = self.sdk.preference().create(preference_data)

        return response["response"]

    def obtener_pago(self, payment_id: str):
        payment = self.sdk.payment().get(payment_id)
        return payment["response"]