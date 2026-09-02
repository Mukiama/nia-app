from flask import request, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import (
    create_access_token, 
    get_jwt_identity, 
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    verify_jwt_in_request
    )



from models import db, User, History, Favourite
from schemas import user_schema

UserSchema = user_schema.UserSchema
HistorySchema = user_schema.HistorySchema
FavouriteSchema = user_schema.FavouriteSchema


class Signup(Resource):
    def options(self):
        return "", 200

    def post(self):
        data = request.get_json()
        if not data:
            return {"error": "Request body is required"}, 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return {"error": "Name, email and password are required"}, 400

        user = User(name=name, email=email)
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=str(user.id))
            response = make_response(jsonify(user=UserSchema().dump(user)), 201)
            set_access_cookies(response, access_token)
            return response
        
        except IntegrityError:
            db.session.rollback()
            return {"error": "Email already exists"}, 422


class Login(Resource):
    def options(self):
        return "", 200

    def post(self):
        data = request.get_json()
        if not data:
            return {"error": "Request body is required"}, 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        user = User.query.filter(User.email == email).first()

        if user and user.authenticate(password):
            access_token = create_access_token(identity=str(user.id))
            response = make_response(jsonify(user=UserSchema().dump(user)), 200)
            set_access_cookies(response, access_token)
            return response

        return {"error": "Invalid credentials"}, 401


class Verification(Resource):
    def options(self):
        return "", 200

    def get(self):
        user_id = int(get_jwt_identity())
        found_user = User.query.filter(User.id == user_id).first()

        if not found_user:
            return {"error": "User not found"}, 404

        return UserSchema().dump(found_user), 200


class Logout(Resource):
    def options(self):
        return "", 200

    def post(self):
        response = make_response('Logged out', 204)
        unset_jwt_cookies(response)
        return response


class HistoryListResource(Resource):
    def options(self):
        return "", 200

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        history_items = History.query.filter_by(user_id=user_id).all()
        return HistorySchema(many=True).dump(history_items), 200

    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json()
        place_id = data.get("placeId") if data else None

        if not place_id:
            return {"error": "placeId is required"}, 400

        entry = History(user_id=user_id, place_id=place_id)
        db.session.add(entry)
        db.session.commit()

        return HistorySchema().dump(entry), 201


class HistoryItemResource(Resource):
    def options(self, id):
        return "", 200

    @jwt_required()
    def delete(self, id):
        user_id = int(get_jwt_identity())
        item = History.query.filter_by(id=id, user_id=user_id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
        return "", 204


class FavouritesListResource(Resource):
    def options(self):
        return "", 200

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        fav_items = Favourite.query.filter_by(user_id=user_id).all()
        return FavouriteSchema(many=True).dump(fav_items), 200

    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        data = request.get_json()
        place_id = data.get("placeId") if data else None

        if not place_id:
            return {"error": "placeId is required"}, 400

        entry = Favourite(user_id=user_id, place_id=place_id)
        db.session.add(entry)
        db.session.commit()

        return FavouriteSchema().dump(entry), 201


class FavouritesItemResource(Resource):
    def options(self, id):
        return "", 200

    @jwt_required()
    def delete(self, id):
        user_id = int(get_jwt_identity())
        item = Favourite.query.filter_by(id=id, user_id=user_id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
        return "", 204