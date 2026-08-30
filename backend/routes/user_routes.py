from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models import db
from extensions import api, jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request

from schemas import user_schema
from models import user

User = user.User
UserSchema = user_schema.UserSchema


@app.before_request
def check_if_logged_in() :
  open_access = ['signup', 'login', 'check_session']

  if (request.endpoint) not in open_access and (not verify_jwt_in_request()) :
    return {'error' : '401 Unauthorized'}, 401


class Signup(Resource) :
  def post(self) :

    name = request.get_json()['name']
    email = request.get_json()['email']
    password = request.get_json()['password']

    user = User(
      name = name,
      email = email
    )
    user.password_hash = password

    try :
      db.session.add(user)
      db.session.commit()
      access_token = create_access_token(identity=int(user.id))
      return make_response(jsonify(token=access_token, user=UserSchema().dump(user)), 200)      
    except IntegrityError :
      return {'error' : '422 Unprocessed Entity'}, 422


class Login(Resource) :
  def post(self) :
    name = request.get_json()['name'] 
    email = request.get_json()['email']

    user = User.query.filter(User.name == name and User.email == email).first()

    password = request.get_json()['password']

    if user and user.authenticate(password) :
      access_token = create_access_token(identity=int(user.id))
      return make_response(jsonify(token=access_token, user=UserSchema().dump(user)), 200)

    else :
      return {'error' : '401 Unauthorized'}, 401


class Verification(Resource) :
  def check_session(self) :
    user_id = get_jwt_identity()

    user = User.query.filter(User.id == user_id).first()
    return UserSchema().dump(user), 200


# The client will be resposible of removing their own JWT tokens
class Logout(Resource) :
  def post(self) :
    return {}, 204


