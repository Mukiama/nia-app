from datetime import datetime

from .profile import db


class UserPlace(db.Model):
    __tablename__ = "user_places"

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    visited = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )

    review = db.Column(
        db.Text,
        nullable=True,
    )

    rating = db.Column(
        db.Integer,
        nullable=True,
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

    place_id = db.Column(
        db.Integer,
        db.ForeignKey("places.id"),
        nullable=False,
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )