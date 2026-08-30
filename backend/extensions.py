from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager

bcrypt = Bcrypt()
api = Api()
jwt = JWTManager()