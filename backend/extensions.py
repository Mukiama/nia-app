from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
bcrypt = Bcrypt()
api = Api()
jwt = JWTManager()
