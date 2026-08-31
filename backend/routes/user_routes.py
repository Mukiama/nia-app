from flask import request, make_response, jsonify
from flask_restful import Resource
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity

from models import db, User
from schemas import user_schema


UserSchema = user_schema.UserSchema


class Signup(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {
                "error": "Request body is required"
            }, 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return {
                "error": "Name, email and password are required"
            }, 400

        user = User(
            name=name,
            email=email
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(
                identity=int(user.id)
            )

            return make_response(
                jsonify(
                    token=access_token,
                    user=UserSchema().dump(user)
                ),
                201
            )

        except IntegrityError:
            db.session.rollback()

            return {
                "error": "Email already exists"
            }, 422


class Login(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {
                "error": "Request body is required"
            }, 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return {
                "error": "Name, email and password are required"
            }, 400

        user = User.query.filter(
            User.name == name,
            User.email == email
        ).first()

        if user and user.authenticate(password):
            access_token = create_access_token(
                identity=int(user.id)
            )

            return make_response(
                jsonify(
                    token=access_token,
                    user=UserSchema().dump(user)
                ),
                200
            )

        return {
            "error": "Invalid credentials"
        }, 401


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
