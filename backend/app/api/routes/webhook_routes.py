from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.pago_service import PagoService
from app.repositories.pago_repository import PagoRepository
from app.repositories.orden_repository import OrdenRepository

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])


@router.post("/mercadopago")
async def mercadopago_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    data = await request.json()

    # MercadoPago manda info del pago
    payment_id = data.get("data", {}).get("id")

    if not payment_id:
        return {"message": "No payment id"}

    pago_repo = PagoRepository(db)
    orden_repo = OrdenRepository(db)

    service = PagoService(pago_repo, orden_repo)

    return service.procesar_webhook(payment_id)