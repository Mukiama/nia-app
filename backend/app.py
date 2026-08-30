from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from extensions import bcrypt, api, jwt
import os
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required


from routes.place_routes import place_bp
from routes.profile_routes import profile_bp
from routes.category_routes import category_bp
from routes.items_routes import item_bp
from routes.user_routes import Signup, Login, Logout, Verification




load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')


db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.register_blueprint(place_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(category_bp)
app.register_blueprint(item_bp)
bcrypt.init_app(app)
api.init_app(app)
jwt.init_app(app)



@app.route("/")
def index():
    return {"message":"backend running"}

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Verification, '/verification', endpoint='verification')
api.add_resource(Logout, '/logout', endpoint='logout')
from flask import request
from flask_jwt_extended import verify_jwt_in_request

@app.before_request
def check_if_logged_in():
    open_access = ['signup', 'login', 'verification', 'index', 'places.get_places', 'places.get_place']
    if request.endpoint not in open_access and not verify_jwt_in_request():
        return {'error': '401 Unauthorized'}, 401

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
      session['user_id'] = user.id
      return UserSchema().dump(user)

    else :
      return {'error' : '401 Unauthorized'}, 401


class CheckSeesion(Resource) :
  def check_session(self) :
    user = User.query.filter(User.id == session['user_id']).first()
    return UserSchema().dump(user), 200


class Logout(Resource) :
  def post(self) :
    session['user_id'] = None
    return {}, 204


if __name__ == "__main__":
  app.run(debug=True)