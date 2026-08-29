from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)


# from models.user import db, User
# from models.profile import Profile
# from models.place import Place