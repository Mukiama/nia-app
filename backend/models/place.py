from models.user import db

class Place(db.Model):
    __tablename__ = "places"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    physical_address = db.Column(db.String)
    website = db.Column(db.String)
    picture = db.Column(db.String)
    likes = db.Column(db.Integer, default=0)
    category = db.Column(db.String)
    operating_hours = db.Column(db.String)
    gps = db.Column(db.String)

    def __repr__(self):
        return f"<Place {self.id}: {self.name}>"