from flask import Blueprint, request, jsonify

from models import db, UserPlace
from schemas.user_place import UserPlaceSchema


user_place_bp = Blueprint(
    "user_places",
    __name__,
    url_prefix="/user-places"
)

user_place_schema = UserPlaceSchema()
user_places_schema = UserPlaceSchema(many=True)


# GET all UserPlace records
@user_place_bp.route("", methods=["GET"])
def get_user_places():
    user_places = UserPlace.query.all()

    return jsonify(
        user_places_schema.dump(user_places)
    ), 200


# GET one UserPlace
@user_place_bp.route("/<int:user_place_id>", methods=["GET"])
def get_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    return jsonify(
        user_place_schema.dump(user_place)
    ), 200


# CREATE UserPlace
@user_place_bp.route("", methods=["POST"])
def create_user_place():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    try:
        user_place = user_place_schema.load(data)

        db.session.add(user_place)
        db.session.commit()

        return jsonify(
            user_place_schema.dump(user_place)
        ), 201

    except Exception as error:
        db.session.rollback()

        return jsonify({
            "error": str(error)
        }), 400


# UPDATE UserPlace
@user_place_bp.route("/<int:user_place_id>", methods=["PATCH"])
def update_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    try:
        if "visited_at" in data:
            user_place.visited_at = data["visited_at"]

        if "review" in data:
            user_place.review = data["review"]

        if "user_id" in data:
            user_place.user_id = data["user_id"]

        if "place_id" in data:
            user_place.place_id = data["place_id"]

        db.session.commit()

        return jsonify(
            user_place_schema.dump(user_place)
        ), 200

    except Exception as error:
        db.session.rollback()

        return jsonify({
            "error": str(error)
        }), 400


# DELETE UserPlace
@user_place_bp.route("/<int:user_place_id>", methods=["DELETE"])
def delete_user_place(user_place_id):
    user_place = UserPlace.query.get(user_place_id)

    if not user_place:
        return jsonify({
            "error": "UserPlace not found"
        }), 404

    db.session.delete(user_place)
    db.session.commit()

    return jsonify({
        "message": "UserPlace deleted successfully"
    }), 200
