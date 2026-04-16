from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

from app.repositories.orden_repository import OrdenRepository
from app.repositories.carrito_repository import CarritoRepository
from app.services.orden_service import OrdenService

from app.schemas.orden import OrdenOut

router = APIRouter(prefix="/ordenes", tags=["Ordenes"])



@router.post("/checkout", response_model=OrdenOut)
def checkout(
    metodo_pago: str,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    orden_repo = OrdenRepository(db)
    carrito_repo = CarritoRepository(db)

    service = OrdenService(orden_repo, carrito_repo, db)

    return service.checkout(current_user.id, metodo_pago)



@router.get("/", response_model=list[OrdenOut])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    orden_repo = OrdenRepository(db)
    carrito_repo = CarritoRepository(db)

    service = OrdenService(orden_repo, carrito_repo, db)

    return service.get_user_orders(current_user.id)



@router.get("/{orden_id}", response_model=OrdenOut)
def get_order_detail(
    orden_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    orden_repo = OrdenRepository(db)
    carrito_repo = CarritoRepository(db)

    service = OrdenService(orden_repo, carrito_repo, db)

    return service.get_order_detail(current_user.id, orden_id)