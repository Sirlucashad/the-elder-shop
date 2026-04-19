from sqlalchemy.orm import Session
from app.models.usuario import Usuario


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: int):
        """Busca un usuario por su ID primario."""
        return self.db.query(Usuario).filter(Usuario.id == user_id).first()

    def get_by_email(self, email: str):
        """Busca un usuario por su correo electrónico."""
        return self.db.query(Usuario).filter(Usuario.email == email).first()

    def get_by_username(self, username: str):
        """NUEVO: Busca un usuario por su nombre de usuario."""
        return self.db.query(Usuario).filter(Usuario.username == username).first()

    def get_by_token(self, token: str):
        """Busca por token de verificación de email."""
        return self.db.query(Usuario).filter(
            Usuario.email_verification_token == token
        ).first()

    def get_by_reset_token(self, token: str):
        """Busca por token de restablecimiento de contraseña."""
        return self.db.query(Usuario).filter(
            Usuario.reset_password_token == token
        ).first()

    def create(self, user: Usuario):
        """Crea un nuevo usuario (ya sea Admin o Cliente) en la DB."""
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception as e:
            self.db.rollback() # Importante: si falla, vuelve atrás para no ensuciar la sesión
            raise e

    def save(self, user: Usuario):
        """Guarda cambios en un usuario existente (updates)."""
        self.db.commit()
        self.db.refresh(user)
        return user