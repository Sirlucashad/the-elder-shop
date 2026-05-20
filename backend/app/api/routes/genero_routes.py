from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.repositories.genero_repository import GeneroRepository

from app.services.genero_service import GeneroService

from app.schemas.product import GeneroOut


router = APIRouter(
    prefix="/generos",
    tags=["Generos"]
)


# ======================
# GET ALL
# ======================
@router.get("/", response_model=list[GeneroOut])
def get_generos(
    db: Session = Depends(get_db)
):

    repo = GeneroRepository(db)

    service = GeneroService(repo)

    return service.list_generos()