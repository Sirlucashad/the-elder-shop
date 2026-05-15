import cloudinary.uploader

def upload_image(file, folder="products"):
    """
    Sube una imagen a Cloudinary recibiendo el file-like object de FastAPI
    """
    result = cloudinary.uploader.upload(
        file,
        folder=folder
    )
    return {
        "url": result.get("secure_url"),
        "public_id": result.get("public_id")
    }

def delete_image(public_id):
    if not public_id:
        return
    return cloudinary.uploader.destroy(public_id)