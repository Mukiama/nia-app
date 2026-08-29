from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

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
bcrypt = Bcrypt(app)
api = Api(app)
jwt = JWTManager(app)



@app.route("/")
def index():
    return {"message":"backend running"}


if __name__ == "__main__":
  app.run(debug=True)