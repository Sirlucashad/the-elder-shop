from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

from app.db.database import Base

# Definimos el Enum para los roles
class UserRole(enum.Enum):
    USER = "user"
    ADMIN = "admin"

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identidad y Autenticación
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    rol = Column(Enum(UserRole), default=UserRole.USER, nullable=False)
    
    # Información Personal
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    
    # Datos de Ubicación y Contacto (Nullable para Admins)
    telefono = Column(String(20), nullable=True)
    provincia = Column(String(100), nullable=True)
    ciudad = Column(String(100), nullable=True)
    direccion = Column(String(255), nullable=True)

    # Estado de cuenta
    is_active = Column(Boolean, default=False) 
    created_at = Column(DateTime, default=datetime.utcnow)

    # Seguridad y Verificación
    email_verification_token = Column(String(255), nullable=True)
    reset_password_token = Column(String(255), nullable=True)
    token_expiration = Column(DateTime, nullable=True)

    # Relaciones
    carrito = relationship(
        "Carrito",
        back_populates="usuario",
        uselist=False,
        cascade="all, delete-orphan"
    )



    def __repr__(self):
        return f"<Usuario(username={self.username}, email={self.email}, rol={self.rol})>"