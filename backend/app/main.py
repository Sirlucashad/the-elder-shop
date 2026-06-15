from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import app.integrations.cloudinary

# 1. IMPORTANTE: Importamos el engine y la Base de tu archivo database.py
from app.db.database import engine, Base

from app.models import (
    Producto, Plataforma, TipoProducto,
    ProductoVariante, Videojuego, Genero,
    VideojuegoGenero, Formato, Usuario, Carrito, CarritoItem,
    Orden, DetalleOrden, Pago, VarianteDigital
)

from app.api.routes.product_routes import router as product_router
from app.api.routes.auth_routes import router as auth_router
from app.api.routes.carrito_routes import router as carrito_router
from app.api.routes.orden_routes import router as orden_router
from app.api.routes.pago_routes import router as pago_router
from app.api.routes.image_routes import router as image_router
from app.api.routes.genero_routes import router as genero_router

# Forzamos a Python a mapear los modelos en memoria
print("Modelos cargados para SQLAlchemy:", [Producto.__name__, Usuario.__name__])

Base.metadata.create_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",    
    "http://127.0.0.1:5173",    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(product_router)
app.include_router(auth_router)
app.include_router(carrito_router)
app.include_router(orden_router)
app.include_router(pago_router)
app.include_router(image_router)
app.include_router(genero_router)

@app.get("/")
def root():
    return {"message": "The Elder Shop API funcionando"}