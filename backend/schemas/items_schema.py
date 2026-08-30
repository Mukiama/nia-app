# schemas/items_schema.py
from marshmallow import Schema, fields, validate

class ItemSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    cost = fields.Float(required=True, validate=validate.Range(min=0))
    place_id = fields.Int(required=True)
    category_id = fields.Int(required=True)