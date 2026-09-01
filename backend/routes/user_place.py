from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required

from models import db, UserPlace
from schemas.user_place import UserPlaceSchema

user_place_bp = Blueprint("user_places", __name__, url_prefix="/user-places")

user_place_schema = UserPlaceSchema()
user_places_schema = UserPlaceSchema(many=True)


@user_place_bp.route("", methods=["GET"])
@jwt_required()
def get_user_places():
    user_places = UserPlace.query.all()
    return jsonify(user_places_schema.dump(user_places)), 200


@user_place_bp.route("/<int:user_place_id>", methods=["GET"])
@jwt_required()
def get_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)
    if not user_place:
        return jsonify({"error": "UserPlace not found"}), 404
    return jsonify(user_place_schema.dump(user_place)), 200


@user_place_bp.route("", methods=["POST"])
@jwt_required()
def create_user_place():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    try:
        user_place = user_place_schema.load(data)
        db.session.add(user_place)
        db.session.commit()
        return jsonify(user_place_schema.dump(user_place)), 201
    except ValidationError as error:
        db.session.rollback()
        return jsonify({"error": error.messages}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 400


@user_place_bp.route("/<int:user_place_id>", methods=["PATCH"])
@jwt_required()
def update_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)
    if not user_place:
        return jsonify({"error": "UserPlace not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    try:
        user_place = user_place_schema.load(data, instance=user_place, partial=True)
        db.session.commit()
        return jsonify(user_place_schema.dump(user_place)), 200
    except ValidationError as error:
        db.session.rollback()
        return jsonify({"error": error.messages}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 400


@user_place_bp.route("/<int:user_place_id>", methods=["DELETE"])
@jwt_required()
def delete_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)
    if not user_place:
        return jsonify({"error": "UserPlace not found"}), 404

    db.session.delete(user_place)
    db.session.commit()
    return jsonify({"message": "UserPlace deleted successfully"}), 200