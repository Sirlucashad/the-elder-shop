from fastapi import FastAPI
from app.database import engine, Base

# IMPORTAR MODELOS 
from app.models import Product

app = FastAPI()

# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "The Elder Shop API funcionando"}