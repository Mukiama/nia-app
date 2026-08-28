from flask import Flask, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from routes.place_routes import place_bp
from flask_bcrypt import Bcrypt
from flask_restful import Api

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.register_blueprint(place_bp)
bcrypt = Bcrypt(app)
api = Api(app)




@app.route("/")
def index():
    return {"message":"backend running"}


if __name__ == "__main__":
  app.run(debug=True)