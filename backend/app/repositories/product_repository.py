from app.models.producto import Producto
from app.models.plataforma import Plataforma

class ProductRepository:

    def __init__(self, db):
        self.db = db

    def get_all(self):
        return self.db.query(Producto).all()

    def create(self, nombre, precio, stock, tipo_id, plataformas_ids):
        plataformas = self.db.query(Plataforma).filter(
            Plataforma.id.in_(plataformas_ids)
        ).all()

        producto = Producto(
            nombre=nombre,
            precio=precio,
            stock=stock,
            tipo_id=tipo_id,
            plataformas=plataformas
        )

        self.db.add(producto)
        self.db.commit()
        self.db.refresh(producto)
        return producto