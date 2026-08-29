from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)


from .user import User
from .profile import Profile
from .place import Place
from .items import Item
from .category import Category
