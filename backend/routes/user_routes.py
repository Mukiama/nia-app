from flask import request, make_response, jsonify
from flask_restful import Resource
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity

from models import db
from models import user
from schemas import user_schema

User = user.User
UserSchema = user_schema.UserSchema


class Signup(Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']

        if not password or len(password) < 6:
            return {'error': 'Password must be at least 6 characters'}, 422

        new_user = User(
            name=name,
            email=email,
        )
        new_user.password_hash = password

        try:
            db.session.add(new_user)
            db.session.commit()
            access_token = create_access_token(identity=int(new_user.id))
            return make_response(
                jsonify(token=access_token, user=UserSchema().dump(new_user)),
                200,
            )
        except IntegrityError:
            db.session.rollback()
            return {'error': '422 Unprocessable Entity'}, 422


class Login(Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']

        found_user = User.query.filter(
            and_(User.name == name, User.email == email)
        ).first()

        if found_user and found_user.authenticate(password):
            access_token = create_access_token(identity=int(found_user.id))
            return make_response(
                jsonify(token=access_token, user=UserSchema().dump(found_user)),
                200,
            )
        else:
            return {'error': '401 Unauthorized'}, 401


class Verification(Resource):
    def get(self):
        user_id = get_jwt_identity()
        found_user = User.query.filter(User.id == user_id).first()

        if not found_user:
            return {'error': 'User not found'}, 404

        return UserSchema().dump(found_user), 200


class Logout(Resource):
    def post(self):
        return {}, 204