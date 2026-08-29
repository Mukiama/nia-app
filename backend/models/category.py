from . import db

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    items = db.relationship(
        "Item",
        back_populates="category"
    )