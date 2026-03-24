from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.product_repository import ProductRepository
from app.services.product_service import ProductService
from app.schemas.product import ProductoCreate, ProductoOut

router = APIRouter(prefix="/productos", tags=["Productos"])


# 🔹 CREATE
@router.post("/", response_model=ProductoOut)
def create_producto(data: ProductoCreate, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.create_product(data)


# 🔹 GET ALL
@router.get("/", response_model=list[ProductoOut])
def get_productos(db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.list_products()


# 🔹 GET BY ID
@router.get("/{producto_id}", response_model=ProductoOut)
def get_producto(producto_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.get_product(producto_id)


# 🔹 DELETE
@router.delete("/{producto_id}")
def delete_producto(producto_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.delete_product(producto_id)