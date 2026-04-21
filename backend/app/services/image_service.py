import cloudinary.uploader


def upload_image(file, folder="products"):
    """
    Sube una imagen a Cloudinary

    :param file: archivo en bytes
    :param folder: carpeta en Cloudinary
    :return: dict con url y public_id
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
    """
    Elimina una imagen de Cloudinary

    :param public_id: id de la imagen en Cloudinary
    """
    if not public_id:
        return

    return cloudinary.uploader.destroy(public_id)