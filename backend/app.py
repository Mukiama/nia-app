from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
bcrypt = Bcrypt(app)

@app.route("/")
def index():
    return {"message":"backend running"}

if __name__ == "__main__":
  app.run(debug=True)