from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalychemy.orm import validates
from email_validator import validate_email, EmailNotValidError

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class User(db.Model) :
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    user_places = db.relationship('Userplace', back_populates='user')

    __table_args__ = (
        db.CheckConstraint('length(password) >= 6')
    )

    
    def __repr__(self) :
        return f'<User {self.id} : {self.name}>'