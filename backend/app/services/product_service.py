class ProductService:

    def __init__(self, repository):
        self.repository = repository

    def list_products(self):
        return self.repository.get_all()

    def get_product(self, producto_id: int):
        return self.repository.get_by_id(producto_id)

    def create_product(self, nombre, precio, stock, tipo_id, plataformas_ids):
        return self.repository.create(
            nombre,
            precio,
            stock,
            tipo_id,
            plataformas_ids
        )