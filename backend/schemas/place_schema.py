from marshmallow import fields, validate, validates_schema, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.place import Place


class PlaceSchema(SQLAlchemyAutoSchema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, allow_none=False, validate=validate.Length(min=1))
    description = fields.String(allow_none=True)
    physical_address = fields.String(allow_none=True)
    website = fields.String(allow_none=True)
    picture = fields.String(allow_none=True)
    likes = fields.Integer(allow_none=True)
    category = fields.String(allow_none=True)
    operating_hours = fields.String(allow_none=True)
    gps = fields.String(allow_none=True)

    @validates_schema
    def validate_name(self, data, **kwargs):
        if not data["name"].strip():
            raise ValidationError({"name": ["Must not be blank."]})

    class Meta:
        model = Place
        load_instance = True