from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
from models import User, History, Favourite


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("_password_hash",)


class HistorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = History
        load_instance = True
        include_fk = False
        exclude = ("viewed_at",)

    id = fields.Integer()
    placeId = fields.Integer(attribute="place_id")
    viewedAt = fields.DateTime(attribute="viewed_at")

    name = fields.Method("get_place_name")
    image = fields.Method("get_place_image")
    category = fields.Method("get_place_category")
    location = fields.Method("get_place_location")
    county = fields.Method("get_place_county")
    description = fields.Method("get_place_description")

    def get_place_name(self, obj):
        return getattr(obj.place, "name", "") if obj.place else ""

    def get_place_image(self, obj):
        return "https://unsplash.com"

    def get_place_category(self, obj):
        return "Adventure"

    def get_place_location(self, obj):
        return getattr(obj.place, "name", "") if obj.place else ""

    def get_place_county(self, obj):
        return "Nairobi"

    def get_place_description(self, obj):
        return "A wonderful place to visit."


class FavouriteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Favourite
        load_instance = True
        include_fk = False

    id = fields.Integer()
    placeId = fields.Integer(attribute="place_id")

    name = fields.Method("get_place_name")
    image = fields.Method("get_place_image")
    category = fields.Method("get_place_category")
    county = fields.Method("get_place_county")

    def get_place_name(self, obj):
        return getattr(obj.place, "name", "") if obj.place else ""

    def get_place_image(self, obj):
        return "https://unsplash.com"

    def get_place_category(self, obj):
        return "Adventure"

    def get_place_county(self, obj):
        return "Nairobi"