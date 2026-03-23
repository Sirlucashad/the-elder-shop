class ProductService:

    def __init__(self, repository):
        self.repository = repository

    def list_products(self):
        return self.repository.get_all()

    def create_product(self, data):
        return self.repository.create(data)