from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from models import db, UserPlace
from schemas.user_place import UserPlaceSchema


user_place_bp = Blueprint(
    "user_places",
    __name__,
    url_prefix="/user-places"
)

user_place_schema = UserPlaceSchema()
user_places_schema = UserPlaceSchema(many=True)


# GET all UserPlaces belonging to logged-in user
@user_place_bp.route("", methods=["GET"])
@jwt_required()
def get_user_places():
    user_id = int(get_jwt_identity())

    user_places = UserPlace.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify(
        user_places_schema.dump(user_places)
    ), 200


# GET one UserPlace belonging to logged-in user
@user_place_bp.route("/<int:user_place_id>", methods=["GET"])
@jwt_required()
def get_user_place(user_place_id):
    user_id = int(get_jwt_identity())

    user_place = UserPlace.query.filter_by(
        id=user_place_id,
        user_id=user_id
    ).first()

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    return jsonify(
        user_place_schema.dump(user_place)
    ), 200


# CREATE UserPlace
@user_place_bp.route("", methods=["POST"])
@jwt_required()
def create_user_place():
    user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    # Never allow the client to choose the user_id
    data.pop("user_id", None)

    # Automatically assign logged-in user
    data["user_id"] = user_id

    try:
        user_place = user_place_schema.load(data)

        db.session.add(user_place)
        db.session.commit()

        return jsonify(
            user_place_schema.dump(user_place)
        ), 201

    except ValidationError as error:
        db.session.rollback()

        return jsonify({
            "error": error.messages
        }), 400

    except Exception as error:
        db.session.rollback()

        return jsonify({
            "error": str(error)
        }), 400


# UPDATE UserPlace
@user_place_bp.route("/<int:user_place_id>", methods=["PATCH"])
@jwt_required()
def update_user_place(user_place_id):
    user_id = int(get_jwt_identity())

    user_place = UserPlace.query.filter_by(
        id=user_place_id,
        user_id=user_id
    ).first()

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    # Prevent changing ownership
    data.pop("user_id", None)

    try:
        user_place_schema.load(
            data,
            instance=user_place,
            partial=True
        )

        db.session.commit()

        return jsonify(
            user_place_schema.dump(user_place)
        ), 200

    except ValidationError as error:
        db.session.rollback()

        return jsonify({
            "error": error.messages
        }), 400

    except Exception as error:
        db.session.rollback()

        return jsonify({
            "error": str(error)
        }), 400


# DELETE UserPlace
@user_place_bp.route("/<int:user_place_id>", methods=["DELETE"])
@jwt_required()
def delete_user_place(user_place_id):
    user_id = int(get_jwt_identity())

    user_place = UserPlace.query.filter_by(
        id=user_place_id,
        user_id=user_id
    ).first()

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    db.session.delete(user_place)
    db.session.commit()

    return jsonify({
        "message": "UserPlace deleted successfully"
    }), 200
