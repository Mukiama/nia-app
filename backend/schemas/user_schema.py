from marshmallow import Schema, fields, validates_schema

# Import UserplaceSchema

class UserSchema(Schema) :
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    user_places = fields.List(fields.Nested(lambda : UserplaceSchema(exclude=('user', ))))
    