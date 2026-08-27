from marshmallow import Schema, fields, validates_schema, ValidationError

# Import UserplaceSchema

class UserSchema(Schema) :
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)
    user_places = fields.List(fields.Nested(lambda : UserplaceSchema(exclude=('user', ))))

    @validates_schema
    def check_email(self, data, **kwargs) :
        if '@' not in data.get('email') :
            raise ValidationError('Invalid email')

        
    