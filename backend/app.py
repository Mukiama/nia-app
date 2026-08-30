from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from dotenv import load_dotenv
import os

from config import Config
from models import db
from extensions import bcrypt, jwt
from flask_jwt_extended import verify_jwt_in_request

from routes.place_routes import place_bp
from routes.profile_routes import profile_bp
from routes.category_routes import category_bp
from routes.items_routes import item_bp
from routes.user_routes import Signup, Login, Logout, Verification

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

db.init_app(app)
migrate = Migrate(app, db)

bcrypt.init_app(app)
jwt.init_app(app)

CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]}},
    supports_credentials=True,
)

api = Api(app)

app.register_blueprint(place_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(category_bp)
app.register_blueprint(item_bp)

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Verification, "/verification", endpoint="verification")
api.add_resource(Logout, "/logout", endpoint="logout")


@app.route("/")
def index():
    return {"message": "backend running"}

@app.before_request
def check_if_logged_in():
    open_access = ["signup", "login", "index", "static"]

    if request.endpoint not in open_access and not verify_jwt_in_request():
        return {"error": "401 Unauthorized"}, 401


if __name__ == "__main__":
    app.run(debug=True)