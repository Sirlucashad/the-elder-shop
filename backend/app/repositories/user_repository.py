from app.models.usuario import Usuario


class UserRepository:

    def __init__(self, db):
        self.db = db

    def get_by_email(self, email: str):
        return self.db.query(Usuario).filter(Usuario.email == email).first()

    def get_by_token(self, token: str):
        return self.db.query(Usuario).filter(
            Usuario.email_verification_token == token
        ).first()

    def get_by_reset_token(self, token: str):
        return self.db.query(Usuario).filter(
            Usuario.reset_password_token == token
        ).first()

    def create(self, user: Usuario):
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def save(self, user: Usuario):
        self.db.commit()
        self.db.refresh(user)
        return user