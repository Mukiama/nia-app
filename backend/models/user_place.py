from datetime import datetime, timezone

from models.user import db


class UserPlace(db.Model):
    __tablename__ = "user_places"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    place_id = db.Column(
        db.Integer,
        db.ForeignKey("places.id"),
        nullable=False
    )

    visited = db.Column(
        db.Boolean,
        nullable=False,
        default=False
    )

    visited_at = db.Column(
        db.DateTime(timezone=True),
        nullable=True
    )

    rating = db.Column(
        db.Integer,
        nullable=True
    )

    review = db.Column(
        db.Text,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    user = db.relationship(
        "User",
        back_populates="user_places"
    )

    place = db.relationship(
        "Place",
        back_populates="user_places"
    )

    def __repr__(self):
        return (
            f"<UserPlace user_id={self.user_id} "
            f"place_id={self.place_id}>"
        )


