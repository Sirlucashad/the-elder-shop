from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.pago_repository import PagoRepository
from app.repositories.orden_repository import OrdenRepository
from app.services.pago_service import PagoService

router = APIRouter(prefix="/pagos", tags=["Pagos"])


@router.post("/{orden_id}")
def crear_pago(orden_id: int, db: Session = Depends(get_db)):
    pago_repo = PagoRepository(db)
    orden_repo = OrdenRepository(db)

    service = PagoService(pago_repo, orden_repo)

    return service.crear_pago(orden_id)


@router.post("/webhook")
async def webhook(request: Request, db: Session = Depends(get_db)):
    data = await request.json()

    payment_id = data.get("data", {}).get("id")

    pago_repo = PagoRepository(db)
    orden_repo = OrdenRepository(db)

    service = PagoService(pago_repo, orden_repo)

    return service.procesar_webhook(payment_id)