
from sqlalchemy.orm import Session
from app.repositories.detalle_orden_repository import DetalleOrdenRepository

class DetalleOrdenService:
    def __init__(self, db: Session):
        self.repository = DetalleOrdenRepository(db)

    def crear_detalles_desde_carrito(self, orden_id: int, items_carrito: list):
      
        nuevos_detalles = []
        for item in items_carrito:
          
            detalle = {
                "orden_id": orden_id,
                "variante_id": item.producto_variante_id, 
                "cantidad": item.cantidad,
                "precio_unitario": item.variante.precio  # Obtenemos el precio desde la relación 'variante'
            }
            nuevos_detalles.append(detalle)
        
        return self.repository.bulk_create(nuevos_detalles)