from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    interests = db.Column(db.String, nullable=False)
    budget = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )
    @validates("interests", "budget", "company")
    def validate_text_fields(self, key, value):
       
       if not isinstance(value, str) or not value.strip():
            raise ValueError(f"{key} must be a non-empty string.")
       return value.strip()

    @validates("user_id")
    def validate_user_id(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("user_id must be a positive integer.")
        return value