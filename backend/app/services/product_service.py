class ProductService:

    def __init__(self, repository):
        self.repository = repository

    def create_product(self, data):
        return self.repository.create(data)

    def list_products(self):
        return self.repository.get_all()

    def get_product(self, producto_id: int):
        return self.repository.get_by_id(producto_id)

    def delete_product(self, producto_id: int):
        return self.repository.delete(producto_id)