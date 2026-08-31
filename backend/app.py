from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_restful import Api
from dotenv import load_dotenv
import os

from config import Config
from models import db
from extensions import bcrypt, jwt

from routes.place_routes import place_bp
from routes.profile_routes import profile_bp
from routes.category_routes import category_bp
from routes.items_routes import item_bp
from routes.user_routes import Signup, Login, Logout, Verification
from routes.user_place import user_place_bp

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# Initialize Databases & Migrations
db.init_app(app)
migrate = Migrate(app, db)

# Initialize Security extensions
bcrypt.init_app(app)
jwt.init_app(app)

# Global CORS Configuration 
CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]}},
    supports_credentials=True,
)

# Initialize Flask-RESTful with native CORS decorators to handle OPTIONS preflight globally
api = Api(app, decorators=[cross_origin(supports_credentials=True)])

# Register Blueprints
app.register_blueprint(place_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(category_bp)
app.register_blueprint(item_bp)
app.register_blueprint(user_place_bp)

# Register RESTful API Resources
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Verification, "/verification", endpoint="verification")
api.add_resource(Logout, "/logout", endpoint="logout")


@app.route("/")
def index():
    return {"message": "backend running"}


if __name__ == "__main__":
    # Bound to 0.0.0.0 so your Windows browser can cleanly communicate with WSL Linux
    app.run(host="0.0.0.0", port=5000, debug=True)
