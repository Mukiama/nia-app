from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from backend.models.profile import Profile

class ProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
        load_instance = True