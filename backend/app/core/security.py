from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt
import secrets
import os


# 🔐 CONFIGURACIÓN SEGURA
SECRET_KEY = os.getenv("SECRET_KEY", "change_this_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# 🔒 HASHING
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# 🔑 JWT
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 📩 TOKENS PARA EMAIL
def generate_token():
    return secrets.token_urlsafe(32)


def token_expiration_time(minutes=30):
    return datetime.utcnow() + timedelta(minutes=minutes)