from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.db.database import get_db
# Importamos los esquemas actualizados y el Enum de roles
from app.schemas.usuario import UsuarioCreate, ClienteCreate, UsuarioLogin, UserRole
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService

router = APIRouter(prefix="/auth", tags=["Auth"])

# --- RUTAS DE REGISTRO ---

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_cliente(data: ClienteCreate, db: Session = Depends(get_db)):
    """
    Ruta pública para que los clientes se registren.
    Pide obligatoriamente dirección, teléfono, provincia, etc.
    """
    service = UserService(UserRepository(db))
    # Por defecto register_user usa UserRole.USER
    return service.register_user(data)

@router.post("/register-admin", status_code=status.HTTP_201_CREATED)
def register_admin(
    data: UsuarioCreate, 
    db: Session = Depends(get_db),
    # Aquí podrías agregar una dependencia para que solo un admin actual cree otro
    # current_user: Usuario = Depends(get_current_admin) 
):
    """
    Ruta para crear administradores. 
    Solo pide datos básicos (email, username, pass, nombre, apellido).
    """
    service = UserService(UserRepository(db))
    return service.register_user(data, rol=UserRole.ADMIN)

# --- RUTAS DE ACCESO Y SEGURIDAD ---

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    FastAPI usa 'username' en el form_data por defecto, 
    pero nosotros lo mapeamos a 'email' para el servicio.
    """
    service = UserService(UserRepository(db))
    
    # Creamos un objeto que coincida con lo que espera el servicio
    # En OAuth2PasswordRequestForm, el campo se llama 'username' aunque pongas el email
    login_data = UsuarioLogin(email=form_data.username, password=form_data.password)
    
    return service.login(login_data)

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