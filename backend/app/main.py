from fastapi import FastAPI

from app.models import (
    Producto, Plataforma, TipoProducto,
    ProductoVariante, Videojuego, Genero,
    VideojuegoGenero, Formato, Usuario, Carrito, CarritoItem,
    Orden, DetalleOrden, Pago
)

from app.api.routes.product_routes import router as product_router
from app.api.routes.auth_routes import router as auth_router
from app.api.routes.carrito_routes import router as carrito_router
from app.api.routes.orden_routes import router as orden_router
from app.api.routes.pago_routes import router as pago_router





app = FastAPI()

app.include_router(product_router)
app.include_router(auth_router)
app.include_router(carrito_router)
app.include_router(orden_router)
app.include_router(pago_router)


@app.get("/")
def root():
    return {"message": "The Elder Shop API funcionando"}