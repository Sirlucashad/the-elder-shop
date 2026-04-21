class ProductService:

    def __init__(self, repository):
        self.repository = repository

    # ======================
    # CREATE
    # ======================
    def create_product(self, data):
        return self.repository.create(data)

    # ======================
    # GET ALL
    # ======================
    def list_products(self):
        return self.repository.get_all()

    # ======================
    # GET BY ID
    # ======================
    def get_product(self, producto_id: int):
        return self.repository.get_by_id(producto_id)

    # ======================
    # DELETE
    # ======================
    def delete_product(self, producto_id: int):
        return self.repository.delete(producto_id)

    # ======================
    # SEARCH
    # ======================
    def search_products(
        self,
        nombre=None,
        genero_id=None,
        precio_min=None,
        precio_max=None,
        limit=10,
        offset=0
    ):
        return self.repository.search(
            nombre=nombre,
            genero_id=genero_id,
            precio_min=precio_min,
            precio_max=precio_max,
            limit=limit,
            offset=offset
        )