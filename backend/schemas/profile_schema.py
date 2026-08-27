from marshmallow import fields, validate, validates_schema, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from backend.models.profile import Profile


class ProfileSchema(SQLAlchemyAutoSchema):
    id = fields.Integer(dump_only=True)
    interests = fields.String(required=True, allow_none=False, validate=validate.Length(min=1))
    budget = fields.String(required=True, allow_none=False, validate=validate.Length(min=1))
    company = fields.String(required=True, allow_none=False, validate=validate.Length(min=1))
    user_id = fields.Integer(required=True, allow_none=False, validate=validate.Range(min=1))

    @validates_schema
    def validate_text_fields(self, data, **kwargs):
        for field_name in ("interests", "budget", "company"):
            if not data[field_name].strip():
                raise ValidationError({field_name: ["Must not be blank."]})

    class Meta:
        model = Profile
        load_instance = True