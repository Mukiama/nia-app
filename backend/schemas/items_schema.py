from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.items import Item

class ItemSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    cost = fields.Float(required=True, validate=validate.Range(min=0))
    place_id = fields.Int(required=True)
    category_id = fields.Int(required=True)

class ItemSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True
        include_fk = True
