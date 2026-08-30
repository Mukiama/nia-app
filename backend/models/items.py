from . import db

class Item(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    cost = db.Column(db.Float, nullable=False)

    place_id = db.Column(
        db.Integer,
        db.ForeignKey("places.id"),
        nullable=False,
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),  
        nullable=False,
    )

    category = db.relationship(
        "Category",
        back_populates="items"
    )