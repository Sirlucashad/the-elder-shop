from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.db.database import get_db
from app.schemas.usuario import UsuarioCreate
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService
from fastapi import Query

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.get("/confirm-email")
def confirm_email(token: str, db: Session = Depends(get_db)):
    service = UserService(UserRepository(db))
    return service.confirm_email(token)


@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    service = UserService(UserRepository(db))
    return service.request_password_reset(email)


@router.post("/reset-password")
def reset_password(token: str, new_password: str, db: Session = Depends(get_db)):
    service = UserService(UserRepository(db))
    return service.reset_password(token, new_password)




@router.post("/register")
def register(data: UsuarioCreate, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    return service.register(data)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    repo = UserRepository(db)
    service = UserService(repo)

    return service.login({
        "email": form_data.username,
        "password": form_data.password
    })