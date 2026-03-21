from fastapi import FastAPI
from app.db.database import engine, Base

# IMPORTAR MODELOS
from app.models import Producto, TipoProducto, Plataforma, ProductoPlataforma

# IMPORTAR ROUTES
from app.api.routes.product_routes import router as product_router

app = FastAPI()

# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)

# Registrar rutas
app.include_router(product_router)

@app.get("/")
def root():
    return {"message": "The Elder Shop API funcionando"}