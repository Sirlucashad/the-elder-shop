from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    nombre = Column(String(100), nullable=True)
    apellido = Column(String(100), nullable=True)

    is_active = Column(Boolean, default=False) 

    
    email_verification_token = Column(String(255), nullable=True)
    reset_password_token = Column(String(255), nullable=True)
    token_expiration = Column(DateTime, nullable=True)

    carrito = relationship(
        "Carrito",
        back_populates="usuario",
        uselist=False,
        cascade="all, delete-orphan"
    )