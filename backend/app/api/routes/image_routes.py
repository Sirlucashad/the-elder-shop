from fastapi import APIRouter, UploadFile, File, Depends
from app.services.image_service import upload_image
from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

router = APIRouter(prefix="/upload-image", tags=["Images"])


@router.post("/")
async def upload_image_route(
    file: UploadFile = File(...),
    current_user: Usuario = Depends(get_current_user)
):
    contents = await file.read()

    result = upload_image(contents)

    return {
        "url": result["url"],
        "public_id": result["public_id"]
    }