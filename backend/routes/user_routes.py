from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app import app, db, api, jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request

from schemas import user_schema
from models import user

User = user.User
UserSchema = user_schema.UserSchema


@app.before_request
def check_if_logged_in() :
  open_access = ['signup', 'login', 'check_session']

  if (request.endpoint) not in open_access and (not session.get('user_id')) :
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
      session['user_id'] = user.id
      return UserSchema().dump(user), 200
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


class CheckSession(Resource) :
  def check_session(self) :
    user_id = get_jwt_identity()

    user = User.query.filter(User.id == user_id).first()
    return UserSchema().dump(user), 200


class Logout(Resource) :
  def post(self) :
    session['user_id'] = None
    return {}, 204


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')