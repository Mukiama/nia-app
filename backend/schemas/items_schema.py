from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.items import Item


class ItemSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True
        include_fk = True