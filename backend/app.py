from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from extensions import bcrypt, api, jwt
import os
from dotenv import load_dotenv

from routes.place_routes import place_bp
from routes.profile_routes import profile_bp
from routes.category_routes import category_bp
from routes.items_routes import item_bp
from routes.user_routes import Signup, Login, Logout, Verification
from routes.user_place import user_place_bp


# Load environment variables
load_dotenv()


# Create Flask application
app = Flask(__name__)
app.config.from_object(Config)

# JWT configuration
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")


# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

bcrypt.init_app(app)
jwt.init_app(app)


# Register application blueprints
app.register_blueprint(place_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(category_bp)
app.register_blueprint(item_bp)
app.register_blueprint(user_place_bp)


# Register authentication/API resources
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Verification, "/verification", endpoint="verification")
api.add_resource(Logout, "/logout", endpoint="logout")

api.init_app(app)


# Home route
@app.route("/")
def index():
    return {"message": "backend running"}


# Run development server
if __name__ == "__main__":
    app.run(debug=True)