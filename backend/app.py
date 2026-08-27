from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
<<<<<<< HEAD
from routes.place_routes import place_bp
=======
from flask_bcrypt import Bcrypt
<<<<<<< HEAD
>>>>>>> dfd37d6 (Set password hash)
=======
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
>>>>>>> 93eaba1 (Added endpoints access control)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
<<<<<<< HEAD
app.register_blueprint(place_bp)
=======
bcrypt = Bcrypt(app)
>>>>>>> dfd37d6 (Set password hash)

from schemas import user_schema
from models import user

# @app.route("/")
# def index():
#     return {"message":"backend running"}

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

    user = User.query.filter(User.name == name).first()

    password = request.get_json()['password']

    if user and user.authenticate(password) :
      session['user_id'] = user.id
      return UserSchema().dump(user)

    else :
      return {'error' : '401 Unauthorized'}, 401


class CheckSeesion(Resource) :
  def check_session(self) :
    user = User.query.filter(User.id == session['user_id']).first()
    return UserSchema().dump(user), 200

if __name__ == "__main__":
  app.run(debug=True)