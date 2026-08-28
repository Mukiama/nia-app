from flask import Blueprint, jsonify, request
from models import Profile, db
from schemas.profile_schema import ProfileSchema

profile_bp = Blueprint("profile",  __name__, url_prefix="/profiles")

profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)

# GET all profiles
@profile_bp.route("/", methods=["GET"])
def get_profiles():
    profiles = db.session.query(Profile).all()

    return jsonify(profiles_schema.dump(profiles)), 200
  


# GET one profile by ID
@profile_bp.route("/<int:id>", methods=["GET"])
def get_profile(id):
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({
            "error": "Profile not found"}), 404

    return jsonify(profile_schema.dump(profile)), 200

@profile_bp.route("/", methods=["POST"])
def create_profile():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Request body must contain valid JSON"}), 400

    new_profile = Profile(
        interests=data.get("interests"),
        budget=data.get("budget"),
        company=data.get("company")
    )

    db.session.add(new_profile)
    db.session.commit()

    return jsonify(profile_schema.dump(new_profile)), 201

@profile_bp.route("/<int:id>", methods=["PATCH"])
def update_profile(id):
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Request body must contain valid JSON"}), 400

    profile.interests = data.get("interests", profile.interests)
    profile.budget = data.get("budget", profile.budget)
    profile.company = data.get("company", profile.company)

    db.session.commit()

    return jsonify(profile_schema.dump(profile)), 200

@profile_bp.route("/<int:id>", methods=["DELETE"])
def delete_profile(id):
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted successfully"}), 200