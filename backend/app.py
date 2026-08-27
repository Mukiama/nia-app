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

# @app.route("/")
# def index():
#     return {"message":"backend running"}

@app.before_request
def check_if_logged_in() :
  open_access = ['signup', 'login', 'check_session']

  if (request.endpoint) not in open_access and (not session.get('user_id')) :
    return {'error' : '401 Unauthorized'}, 401

if __name__ == "__main__":
  app.run(debug=True)