from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from datetime import datetime


# ======================
# ENUMS
# ======================

class MetodoPagoEnum(str, Enum):
    tarjeta = "tarjeta"
    mercadopago = "mercadopago"


class EstadoOrdenEnum(str, Enum):
    pendiente = "pendiente"
    pagado = "pagado"
    cancelado = "cancelado"


# ======================
# ITEMS
# ======================

class OrdenItemOut(BaseModel):
    producto_variante_id: int
    cantidad: int
    precio_unitario: float

    
    subtotal: Optional[float] = None

    class Config:
        from_attributes = True

    # 🔥 cálculo automático
    def model_post_init(self, __context):
        if self.subtotal is None:
            self.subtotal = self.cantidad * self.precio_unitario


# ======================
# RESPUESTA BASE
# ======================

class OrdenBaseOut(BaseModel):
    id: int
    total: float
    metodo_pago: MetodoPagoEnum
    estado: EstadoOrdenEnum

    class Config:
        from_attributes = True


# ======================
# DETALLE COMPLETO
# ======================

class OrdenOut(OrdenBaseOut):
    usuario_id: Optional[int] = None
    created_at: Optional[datetime] = None
    items: List[OrdenItemOut]


# ======================
# LISTADO (más liviano)
# ======================

class OrdenListOut(OrdenBaseOut):
    created_at: Optional[datetime] = None


# ======================
# REQUEST
# ======================

class CheckoutRequest(BaseModel):
    metodo_pago: MetodoPagoEnum