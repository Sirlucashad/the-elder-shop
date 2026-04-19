from fastapi import HTTPException, status
from datetime import datetime

from app.models.usuario import Usuario, UserRole
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    generate_token,
    token_expiration_time
)
from app.services.email_service import send_email
from app.core.config import FRONTEND_URL


class UserService:

    def __init__(self, repository):
        self.repository = repository

    def _check_availability(self, email: str, username: str):
        """Método interno para evitar duplicados."""
        if self.repository.get_by_email(email):
            raise HTTPException(status_code=400, detail="El email ya está registrado")
        if self.repository.get_by_username(username):
            raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")

    def register_user(self, data, rol: UserRole = UserRole.USER):
        """
        Registro versátil. Sirve para Clientes (con datos de envío) 
        o Admins (solo datos básicos).
        """
        # 1. Validar que no existan duplicados
        self._check_availability(data.email, data.username)

        token = generate_token()

        # 2. Crear instancia del modelo (mapeando campos dinámicamente)
        user_dict = {
            "email": data.email,
            "username": data.username,
            "password_hash": hash_password(data.password),
            "nombre": data.nombre,
            "apellido": data.apellido,
            "rol": rol,
            "is_active": False, # Requiere confirmar email
            "email_verification_token": token,
            "token_expiration": token_expiration_time()
        }

        # 3. Si vienen campos de envío (Cliente), los agregamos
        # hasattr verifica si el esquema enviado (data) tiene esos atributos
        optional_fields = ["telefono", "provincia", "ciudad", "direccion"]
        for field in optional_fields:
            if hasattr(data, field):
                user_dict[field] = getattr(data, field)

        user = Usuario(**user_dict)
        user = self.repository.create(user)

        # 4. Enviar email de confirmación
        link = f"{FRONTEND_URL}/confirm-email?token={token}"
        send_email(
            user.email,
            "Bienvenido a The Elder Shop - Confirma tu cuenta",
            f"<h3>¡Hola {user.nombre}!</h3><p>Haz click para confirmar tu cuenta:</p><a href='{link}'>Confirmar cuenta</a>"
        )

        return {"message": "Registro exitoso. Revisa tu email para activar tu cuenta."}

    def login(self, data):
        # Buscamos por email
        user = self.repository.get_by_email(data.email)

        if not user or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Email o contraseña incorrectos"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="Debes confirmar tu email antes de ingresar"
            )

        # Incluimos el ROL en el token para que el Front lo use sin consultar la DB
        token = create_access_token({"sub": str(user.id), "rol": user.rol.value})

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "username": user.username,
                "rol": user.rol.value
            }
        }

    def confirm_email(self, token):
        user = self.repository.get_by_token(token)

        if not user:
            raise HTTPException(400, "Token de activación inválido")

        if user.token_expiration < datetime.utcnow():
            raise HTTPException(400, "El token ha expirado. Solicita uno nuevo.")

        user.is_active = True
        user.email_verification_token = None
        user.token_expiration = None

        self.repository.save(user)
        return {"message": "¡Cuenta activada con éxito!"}

    # ... request_password_reset y reset_password se mantienen similares ...
    # Solo asegúrate de usar self.repository.save(user) como ya lo tenías.