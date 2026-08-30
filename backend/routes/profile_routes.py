from flask import Blueprint, jsonify, request
from models import db
from models.profile import Profile
from schemas.profile_schema import ProfileSchema
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp = Blueprint("profile",  __name__, url_prefix="/profiles")

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)

# GET all profiles
@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profiles():
    user_id = get_jwt_identity()
    profiles = db.session.query(Profile).all()

    return jsonify(profiles_schema.dump(profiles)), 200
  


# GET one profile by ID
@profile_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_profile(id):
    user_id = get_jwt_identity()
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({
            "error": "Profile not found"}), 404

    return jsonify(profile_schema.dump(profile)), 200

@profile_bp.route("/", methods=["POST"])
@jwt_required()
def create_profile():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Request body must contain valid JSON"}), 400
    try:
        profile_data = profile_schema.load(data)
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    new_profile = Profile(**profile_data)


    db.session.add(new_profile)
    db.session.commit()

    return jsonify(profile_schema.dump(new_profile)), 201

@profile_bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_profile(id):
    user_id = get_jwt_identity()
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Request body must contain valid JSON"}), 400

    try:
        profile_data = profile_schema.load(data, partial=True)
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    for key, value in profile_data.items():
        setattr(profile, key, value)

    db.session.commit()

    return jsonify(profile_schema.dump(profile)), 200

@profile_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_profile(id):
    user_id = get_jwt_identity()
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted successfully"}), 200