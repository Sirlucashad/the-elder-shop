from pydantic import BaseModel, EmailStr, field_validator
import re


class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str
    nombre: str
    apellido: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres")
        if len(v) > 128:
            raise ValueError("La contraseña no puede superar los 128 caracteres")

        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Debe contener al menos una letra")

        if not re.search(r"\d", v):
            raise ValueError("Debe contener al menos un número")

        common_passwords = {
            "12345678", "password", "qwerty", "11111111"
        }

        if v.lower() in common_passwords:
            raise ValueError("La contraseña es demasiado común")

        return v


class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str


class UsuarioOut(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str

    class Config:
        from_attributes = True