from pydantic import BaseModel, EmailStr, field_validator
import re
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

# --- BASE (Identidad compartida) ---
class UsuarioBase(BaseModel):
    email: EmailStr
    username: str # Incluido aquí para que todos deban tener uno
    nombre: str
    apellido: str

    @field_validator("username")
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError("El username debe tener al menos 3 caracteres")
        if not re.match(r"^\w+$", v):
            raise ValueError("El username solo puede contener letras, números y guiones bajos")
        return v

# --- LOGIN ---
class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

# --- REGISTRO BÁSICO / ADMINISTRADOR ---
class UsuarioCreate(UsuarioBase):
    password: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres")
        if not re.search(r"[A-Za-z]", v) or not re.search(r"\d", v):
            raise ValueError("Debe contener al menos una letra y un número")
        return v

# --- REGISTRO DE CLIENTE (Con datos de envío obligatorios) ---
class ClienteCreate(UsuarioCreate):
    telefono: str
    provincia: str
    ciudad: str
    direccion: str

    @field_validator("telefono")
    def validate_telefono(cls, v):
        clean_phone = re.sub(r"[\s\-\(\)]", "", v)
        if not clean_phone.isdigit() or len(clean_phone) < 10:
            raise ValueError("Teléfono inválido. Debe incluir código de área")
        return clean_phone

    @field_validator("provincia", "ciudad", "direccion")
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError("Este campo es obligatorio")
        return v

# --- RESPUESTA DE SALIDA ---
class UsuarioOut(UsuarioBase):
    id: int
    rol: UserRole
    is_active: bool
    # Opcionales en salida porque el Admin no los tiene en DB
    provincia: Optional[str] = None
    ciudad: Optional[str] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None

    class Config:
        from_attributes = True

# --- ACTUALIZACIÓN ---
class UsuarioUpdate(BaseModel):
    username: Optional[str] = None
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    telefono: Optional[str] = None
    provincia: Optional[str] = None
    ciudad: Optional[str] = None
    direccion: Optional[str] = None