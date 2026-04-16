from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

from app.schemas.carrito import CarritoItemCreate, CarritoOut
from app.repositories.carrito_repository import CarritoRepository
from app.services.carrito_service import CarritoService

router = APIRouter(prefix="/carrito", tags=["Carrito"])


@router.get("/", response_model=CarritoOut)
def get_carrito(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    repo = CarritoRepository(db)
    service = CarritoService(repo)

    return service.get_or_create(current_user.id)


@router.post("/items", response_model=CarritoOut)
def add_item(
    data: CarritoItemCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    repo = CarritoRepository(db)
    service = CarritoService(repo)

    return service.add_item(current_user.id, data)


@router.delete("/items/{item_id}", response_model=CarritoOut)
def remove_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    repo = CarritoRepository(db)
    service = CarritoService(repo)

    return service.remove_item(current_user.id, item_id)