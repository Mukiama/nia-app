from flask import Blueprint, jsonify, request
from models import db
from models.place import Place
from schemas.place_schema import PlaceSchema

# A Blueprint groups related routes together so app.py stays clean
place_bp = Blueprint("places", __name__, url_prefix="/places")

place_schema = PlaceSchema()
places_schema = PlaceSchema(many=True)  # for returning a list of places


@place_bp.route("/", methods=["GET"])
def get_places():
    places = Place.query.all()
    return jsonify(places_schema.dump(places)), 200


@place_bp.route("/<int:place_id>", methods=["GET"])
def get_place(place_id):
    place = Place.query.get(place_id)
    if not place:
        return jsonify({"error": "Place not found"}), 404
    return jsonify(place_schema.dump(place)), 200


@place_bp.route("/", methods=["POST"])
def create_place():
    data = request.get_json()
    try:
        new_place = place_schema.load(data, session=db.session)
    except Exception as error:
        return jsonify({"error": str(error)}), 400

    db.session.add(new_place)
    db.session.commit()
    return jsonify(place_schema.dump(new_place)), 201


@place_bp.route("/<int:place_id>", methods=["DELETE"])
def delete_place(place_id):
    place = Place.query.get(place_id)
    if not place:
        return jsonify({"error": "Place not found"}), 404

    db.session.delete(place)
    db.session.commit()
    return jsonify({"message": "Place deleted"}), 200