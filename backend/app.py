from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
bcrypt = Bcrypt(app)

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

    name = request.get_json()['username']
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

if __name__ == "__main__":
  app.run(debug=True)