from models import db
from sqlalchemy.orm import validates
from email_validator import validate_email, EmailNotValidError
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from extensions import bcrypt   

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    user_places = db.relationship("UserPlace", back_populates="user", cascade="all, delete-orphan")
    
    # New relationships for history and favourites tracking
    history_items = db.relationship("History", back_populates="user", cascade="all, delete-orphan")
    favourite_items = db.relationship("Favourite", back_populates="user", cascade="all, delete-orphan")

    __table_args__ = (
        db.CheckConstraint("length(_password_hash) >= 6", name="ck_users_password_length"),
    )

    @validates("email")
    def email_validation(self, key, value):
        try:
            valid = validate_email(value, check_deliverability=False)
            return valid.normalized
        except EmailNotValidError as e:
            raise ValueError(f"Invalid email {e}")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes are not to be revealed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))


class History(db.Model):
    __tablename__ = "history"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id", ondelete="CASCADE"), nullable=False)
    viewed_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="history_items")
    place = db.relationship("Place")


class Favourite(db.Model):
    __tablename__ = "favourites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id", ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="favourite_items")
    place = db.relationship("Place")
