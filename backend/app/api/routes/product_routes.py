from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.product_repository import ProductRepository
from app.services.product_service import ProductService
from app.schemas.product import ProductoOut
from app.schemas.product_create import ProductoCreate

router = APIRouter(prefix="/productos", tags=["Productos"])


@router.get("/", response_model=list[ProductoOut])
def get_productos(db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.list_products()


@router.get("/{producto_id}", response_model=ProductoOut)
def get_producto(producto_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return repo.get_by_id(producto_id)


@router.post("/", response_model=ProductoOut)
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