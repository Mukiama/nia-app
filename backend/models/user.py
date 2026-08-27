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
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    user_places = db.relationship('Userplace', back_populates='user')

    __table_args__ = (
        db.CheckConstraint('length(password) >= 6')
    )

    @validates('email')
    def email_validation(self, key, value) :
        try :
            valid = validate_email(value, check_deliverability=False)
            return valid.normalized
        except EmailNotValidError as e :
            raise ValueError(f'Invalid email {e}')

    
    def __repr__(self) :
        return f'<User {self.id} : {self.name}>'