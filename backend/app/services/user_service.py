from fastapi import HTTPException
from datetime import datetime

from app.models.usuario import Usuario
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

    def register(self, data):
        existing = self.repository.get_by_email(data.email)

        if existing:
            raise HTTPException(status_code=400, detail="Email ya registrado")

        token = generate_token()

        user = Usuario(
            email=data.email,
            password_hash=hash_password(data.password),
            nombre=data.nombre,
            apellido=data.apellido,
            is_active=False,
            email_verification_token=token,
            token_expiration=token_expiration_time()
        )

        user = self.repository.create(user)

        link = f"{FRONTEND_URL}/confirm-email?token={token}"

        send_email(
            user.email,
            "Confirma tu cuenta",
            f"<h3>Haz click para confirmar:</h3><a href='{link}'>Confirmar cuenta</a>"
        )

        return {"message": "Usuario creado. Revisa tu email."}

    def confirm_email(self, token):
        user = self.repository.get_by_token(token)

        if not user:
            raise HTTPException(400, "Token inválido")

        if user.token_expiration < datetime.utcnow():
            raise HTTPException(400, "Token expirado")

        user.is_active = True
        user.email_verification_token = None
        user.token_expiration = None

        self.repository.save(user)

        return {"message": "Cuenta confirmada"}

    def login(self, data):
        user = self.repository.get_by_email(data["email"])

        if not user or not verify_password(data["password"], user.password_hash):
            raise HTTPException(status_code=401, detail="Credenciales inválidas")

        if not user.is_active:
            raise HTTPException(403, "Debes confirmar tu email")

        token = create_access_token({"sub": str(user.id)})

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    def request_password_reset(self, email):
        user = self.repository.get_by_email(email)

        if not user:
            return {"message": "Si existe el email, se enviará un enlace"}

        token = generate_token()

        user.reset_password_token = token
        user.token_expiration = token_expiration_time()

        self.repository.save(user)

        link = f"{FRONTEND_URL}/reset-password?token={token}"

        send_email(
            user.email,
            "Recuperar contraseña",
            f"<a href='{link}'>Resetear contraseña</a>"
        )

        return {"message": "Email enviado"}

    def reset_password(self, token, new_password):
        user = self.repository.get_by_reset_token(token)

        if not user:
            raise HTTPException(400, "Token inválido")

        if user.token_expiration < datetime.utcnow():
            raise HTTPException(400, "Token expirado")

        user.password_hash = hash_password(new_password)
        user.reset_password_token = None
        user.token_expiration = None

        self.repository.save(user)

        return {"message": "Contraseña actualizada"}