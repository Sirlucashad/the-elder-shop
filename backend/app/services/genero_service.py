class GeneroService:

    def __init__(self, repository):
        self.repository = repository

    # ======================
    # GET ALL
    # ======================
    def list_generos(self):
        return self.repository.get_all()