from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class Item(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Strings, nullable=False)
