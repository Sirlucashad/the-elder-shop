from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.product_repository import ProductRepository
from app.services.product_service import ProductService
from app.schemas.product import ProductoCreate, ProductoOut

from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

router = APIRouter(prefix="/productos", tags=["Productos"])


# ======================
# CREATE
# ======================
@router.post("/", response_model=ProductoOut)
def create_producto(
    data: ProductoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.create_product(data)


# ======================
# GET ALL
# ======================
@router.get("/", response_model=list[ProductoOut])
def get_productos(db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.list_products()


# ======================
# GET BY ID
# ======================
@router.get("/{producto_id}", response_model=ProductoOut)
def get_producto(producto_id: int, db: Session = Depends(get_db)):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.get_product(producto_id)


# ======================
# DELETE
# ======================
@router.delete("/{producto_id}")
def delete_producto(
    producto_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    repo = ProductRepository(db)
    service = ProductService(repo)
    return service.delete_product(producto_id)


# ======================
# SEARCH / FILTER 🔥
# ======================
@router.get("/search/")
def search_productos(
    nombre: str = Query(None, description="Buscar por nombre"),
    genero_id: int = Query(None, description="Filtrar por género"),
    precio_min: float = Query(None),
    precio_max: float = Query(None),
    limit: int = Query(10, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db)
):
    repo = ProductRepository(db)
    service = ProductService(repo)

    return service.search_products(
        nombre=nombre,
        genero_id=genero_id,
        precio_min=precio_min,
        precio_max=precio_max,
        limit=limit,
        offset=offset
    )