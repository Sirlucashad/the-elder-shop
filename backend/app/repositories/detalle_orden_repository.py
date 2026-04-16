
from sqlalchemy.orm import Session
from app.models.detalle_orden import DetalleOrden

class DetalleOrdenRepository:
    def __init__(self, db: Session):
        self.db = db

    def bulk_create(self, detalles_data: list[dict]):
      
        db_items = [DetalleOrden(**data) for data in detalles_data]
        self.db.add_all(db_items)
        self.db.commit()
        return db_items

    def get_by_orden(self, orden_id: int):
        return self.db.query(DetalleOrden).filter(DetalleOrden.orden_id == orden_id).all()