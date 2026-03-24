from fastapi import FastAPI

# IMPORTAR MODELOS (importante para Alembic)
from app.models import Producto, Plataforma, TipoProducto, ProductoVariante, Videojuego, Genero, VideojuegoGenero

# ROUTES
from app.api.routes.product_routes import router as product_router

app = FastAPI()

app.include_router(product_router)


@app.get("/")
def root():
    return {"message": "The Elder Shop API funcionando"}