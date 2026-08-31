from marshmallow import fields, validate, validates_schema, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models.user_place import UserPlace
from models.user import db

class UserPlaceSchema(SQLAlchemyAutoSchema):

    id = fields.Integer(
        dump_only=True
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

    visited = fields.Boolean(
        required=False,
        load_default=False
    )

    visited_at = fields.DateTime(
        required=False,
        allow_none=True
    )

    rating = fields.Integer(
        required=False,
        allow_none=True,
        validate=validate.Range(min=1, max=5)
    )

    review = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=1000)
    )

    created_at = fields.DateTime(
        dump_only=True
    )

    updated_at = fields.DateTime(
        dump_only=True
    )

    @validates_schema
    def validate_review(self, data, **kwargs):
        if data.get("review") is not None:
            if not data["review"].strip():
                raise ValidationError({
                    "review": ["Must not be blank."]
                })

    class Meta:
      model = UserPlace
      load_instance = True
      sqla_session = db.session