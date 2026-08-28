from marshmallow import Schema, fields, validates_schema, ValidationError

class CategorySchema(Schema):

    id = fields.Integer(dump_only=True)
    name = fields.String(
        required=True
    )
    description = fields.String(
        required=False,
        allow_none=True
    )

    @validates_schema
    def validate_category(self, data, **kwargs):
        name = data.get('name')
        if not name or not name.strip():
            raise ValidationError({
                'name': 'Category name is required'
            })

        if len(name.strip()) > 100:
            raise ValidationError({
                'name': 'Category name must not exceed 100 characters'
            })

