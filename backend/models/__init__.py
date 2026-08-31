from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",    # Fixed to use column name
    "ck": "ck_%(table_name)s_%(column_0_name)s",    # Fixed to use column name
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)


from .user import User
from .profile import Profile
from .place import Place
from .items import Item
from .category import Category
from models.user_place import UserPlace
