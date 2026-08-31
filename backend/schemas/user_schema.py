from marshmallow import Schema, fields, validates_schema, ValidationError

class UserSchema(Schema) :
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    # TODO: add user_places back once UserPlace model + schema exist

    @validates_schema
    def check_email(self, data, **kwargs) :
        if '@' not in data.get('email') :
            raise ValidationError('Invalid email')