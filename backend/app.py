from flask import Flask, request
from flask_cors import CORS, cross_origin
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
from routes.user_routes import (
    Signup,
    Login,
    Logout,
    Verification,
    HistoryListResource,
    HistoryItemResource,
    FavouritesListResource,
    FavouritesItemResource,
)
from routes.user_place import user_place_bp

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token_cookie"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

db.init_app(app)
migrate = Migrate(app, db)

bcrypt.init_app(app)
jwt.init_app(app)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ]
        }
    },
    supports_credentials=True,
)

api = Api(
    app,
    decorators=[cross_origin(supports_credentials=True)],
)

app.register_blueprint(place_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(category_bp)
app.register_blueprint(item_bp)
app.register_blueprint(user_place_bp)

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Verification, "/verification", endpoint="verification")
api.add_resource(Logout, "/logout", endpoint="logout")

api.init_app(app)

api.add_resource(
    HistoryListResource,
    "/history"
)

api.add_resource(
    HistoryItemResource,
    "/history/<int:id>"
)

api.add_resource(
    FavouritesListResource,
    "/favourites"
)

api.add_resource(
    FavouritesItemResource,
    "/favourites/<int:id>"
)

@app.before_request
def check_if_logged_in():
    open_access = ["signup", "login", "verification", "index"]

    if request.endpoint not in open_access:
        try:
            verify_jwt_in_request()
        except Exception:
            return {"error": "401 Unauthorized"}, 401

@app.route("/")
def index():
    return {"message": "backend running"}

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
