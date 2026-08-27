from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
<<<<<<< HEAD
from routes.place_routes import place_bp
=======
from flask_bcrypt import Bcrypt
>>>>>>> dfd37d6 (Set password hash)

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

@app.route("/")
def index():
    return {"message":"backend running"}

if __name__ == "__main__":
  app.run(debug=True)