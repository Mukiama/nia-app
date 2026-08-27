from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalychemy.orm import validates
from email_validator import validate_email, EmailNotValidError
from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

from app import bcrypt

class User(db.Model) :
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

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


    @hybrid_property
    def password_hash(self) :
        raise AttributeError('Password hashes are not to be revealed')

    @password_hash.setter
    def password_hash(self, password) :
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    
    def __repr__(self) :
        return f'<User {self.id} : {self.name}>'