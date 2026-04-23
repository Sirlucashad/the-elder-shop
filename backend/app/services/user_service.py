import logging
import traceback
from datetime import datetime
from fastapi import HTTPException, status

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

# Configuración del logger para ver los mensajes en la terminal de Uvicorn
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UserService:

    def __init__(self, repository):
        self.repository = repository

    def _check_availability(self, email: str, username: str):
        """Método interno para evitar duplicados."""
        logger.info(f"🔍 Verificando disponibilidad: {email}, {username}")
        if self.repository.get_by_email(email):
            logger.warning(f"⚠️ Registro fallido: El email {email} ya existe.")
            raise HTTPException(status_code=400, detail="El email ya está registrado")
        if self.repository.get_by_username(username):
            logger.warning(f"⚠️ Registro fallido: El usuario {username} ya existe.")
            raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")

    def register_user(self, data, rol: UserRole = UserRole.USER):
        try:
            logger.info(f"🚀 Iniciando proceso de registro para: {data.email}")

            # 1. Validar que no existan duplicados
            self._check_availability(data.email, data.username)

            token = generate_token()

            # 2. Crear diccionario del modelo
            user_dict = {
                "email": data.email,
                "username": data.username,
                "password_hash": hash_password(data.password),
                "nombre": data.nombre,
                "apellido": data.apellido,
                "rol": rol,
                "is_active": False,
                "email_verification_token": token,
                "token_expiration": token_expiration_time()
            }

            # 3. Campos opcionales
            optional_fields = ["telefono", "provincia", "ciudad", "direccion"]
            for field in optional_fields:
                if hasattr(data, field):
                    user_dict[field] = getattr(data, field)
            
            logger.info("💾 Intentando guardar usuario en la base de datos...")
            user = Usuario(**user_dict)
            user = self.repository.create(user)
            logger.info(f"✅ Usuario creado exitosamente con ID: {user.id}")

            # 4. Enviar email de confirmación
            try:
                logger.info(f"📧 Intentando enviar email de confirmación a {user.email}")
                link = f"{FRONTEND_URL}/confirm-email?token={token}"
                send_email(
                    user.email,
                    "Bienvenido a The Elder Shop - Confirma tu cuenta",
                    f"<h3>¡Hola {user.nombre}!</h3><p>Haz click para confirmar:</p><a href='{link}'>Confirmar cuenta</a>"
                )
                logger.info("📨 Email enviado correctamente.")
            except Exception as e:
                # El usuario se creó pero el email falló
                logger.error(f"❌ Error al enviar el email: {str(e)}")
                # Opcional: podrías lanzar un error aquí o dejar que continúe indicando al usuario
                # que hubo un problema con el envío pero su cuenta existe.

            return {"message": "Registro exitoso. Revisa tu email para activar tu cuenta."}

        except HTTPException as he:
            # Re-lanzamos errores que ya controlamos (como el 400 de disponibilidad)
            raise he
        except Exception as e:
            # CAPTURA DE ERROR 500 (Cualquier cosa no prevista)
            logger.critical("🔥 ERROR CRÍTICO EN register_user:")
            logger.error(traceback.format_exc()) # Esto imprime toda la ruta del error en consola
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error interno en el servidor: {str(e)}"
            )

    def login(self, data):
        try:
            logger.info(f"🔑 Intento de login para: {data.email}")
            user = self.repository.get_by_email(data.email)

            if not user or not verify_password(data.password, user.password_hash):
                logger.warning(f"❌ Credenciales inválidas para: {data.email}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, 
                    detail="Email o contraseña incorrectos"
                )

            if not user.is_active:
                logger.warning(f"⚠️ Intento de login en cuenta inactiva: {data.email}")
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, 
                    detail="Debes confirmar tu email antes de ingresar"
                )

            token = create_access_token({"sub": str(user.id), "rol": user.rol.value})
            logger.info(f"✅ Login exitoso: {user.username}")

            return {
                "access_token": token,
                "token_type": "bearer",
                "user": {
                    "username": user.username,
                    "rol": user.rol.value
                }
            }
        except HTTPException as he:
            raise he
        except Exception as e:
            logger.error(f"🔥 Error en login: {traceback.format_exc()}")
            raise HTTPException(500, detail="Error al procesar el ingreso")

    def confirm_email(self, token):
        try:
            logger.info("📡 Procesando confirmación de email por token...")
            user = self.repository.get_by_token(token)

            if not user:
                logger.error("❌ Token no encontrado en la DB.")
                raise HTTPException(400, "Token de activación inválido")

            if user.token_expiration < datetime.utcnow():
                logger.warning(f"⏰ Token expirado para usuario: {user.email}")
                raise HTTPException(400, "El token ha expirado. Solicita uno nuevo.")

            user.is_active = True
            user.email_verification_token = None
            user.token_expiration = None

            self.repository.save(user)
            logger.info(f"✨ Cuenta activada con éxito: {user.email}")
            return {"message": "¡Cuenta activada con éxito!"}
            
        except HTTPException as he:
            raise he
        except Exception as e:
            logger.error(f"🔥 Error en confirm_email: {traceback.format_exc()}")
            raise HTTPException(500, detail="Error al activar la cuenta")