from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime


# ======================
# ENUMS
# ======================

class MetodoPagoEnum(str, Enum):
    tarjeta = "tarjeta"
    mercadopago = "mercadopago"
    transferencia = "transferencia"  # Coincide con TypeScript


class EstadoOrdenEnum(str, Enum):
    pendiente = "pendiente"
    pagada = "pagada"      # Coincide con TypeScript
    cancelada = "cancelada"  # Coincide con TypeScript


# ======================
# ITEMS
# ======================

class OrdenItemOut(BaseModel):
    id: int  # Requerido por DetalleOrdenOut en React
    orden_id: int  # Requerido por DetalleOrdenOut en React
    producto_variante_id: int  # 🔥 CORREGIDO: Mapeo directo sin alias de validación
    cantidad: int
    precio_unitario: float
    subtotal: Optional[float] = None

    class Config:
        from_attributes = True

    # Cálculo automático del subtotal post-inicialización
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
    usuario_id: int
    created_at: datetime
    items: List[OrdenItemOut]


# ======================
# LISTADO (más liviano)
# ======================

class OrdenListOut(OrdenBaseOut):
    created_at: datetime


# ======================
# REQUEST
# ======================

class CheckoutRequest(BaseModel):
    metodo_pago: MetodoPagoEnum