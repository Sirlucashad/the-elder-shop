from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.product_repository import ProductRepository
from app.services.product_service import ProductService
from app.schemas.product import ProductoCreate, ProductoOut

router = APIRouter()

@router.get("/productos", response_model=list[ProductoOut])
def get_productos(db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.list_products()

@router.post("/productos")
def create_producto(data: ProductoCreate, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.create_product(
        data.nombre,
        data.precio,
        data.stock,
        data.tipo_id,
        data.plataformas_ids
    )