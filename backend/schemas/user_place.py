from marshmallow import fields, validate, validates_schema, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from backend.models import UserPlace


class UserPlaceSchema(SQLAlchemyAutoSchema):
    id = fields.Integer(dump_only=True)

    visited_at = fields.DateTime(
        required=True,
        allow_none=False
    )

    user_id = fields.Integer(
        required=True,
        allow_none=False,
        validate=validate.Range(min=1)
    )

    place_id = fields.Integer(
        required=True,
        allow_none=False,
        validate=validate.Range(min=1)
    )

    review = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=1000)
    )

    @validates_schema
    def validate_review(self, data, **kwargs):
        if "review" in data and data["review"] is not None:
            if not data["review"].strip():
                raise ValidationError({
                    "review": ["Must not be blank."]
                })

    class Meta:
        model = UserPlace
        load_instance = True
