import logging

from fastapi import HTTPException

from app.models.genero import Genero


logger = logging.getLogger(__name__)


class GeneroRepository:

    def __init__(self, db):
        self.db = db

    # ======================
    # GET ALL
    # ======================
    def get_all(self):

        try:

            return self.db.query(Genero).order_by(
                Genero.nombre.asc()
            ).all()

        except Exception as e:

            logger.error(
                f"Error obteniendo géneros: {str(e)}"
            )

            raise HTTPException(
                status_code=500,
                detail="Error al obtener géneros"
            )