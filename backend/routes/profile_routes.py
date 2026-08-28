from flask import Blueprint, jsonify, request
from models import Profile, db

profile_bp = Blueprint("profile",  __name__, url_prefix="/profiles")


# GET all profiles
@profile_bp.route("/", methods=["GET"])
def get_profiles():
    profiles = db.session.query(Profile).all()

    return jsonify([
        {
        "id": profile.id,
        "interests": profile.interests,
        "budget": profile.budget,
        "company": profile.company
        }
        for profile in profiles
]), 200


# GET one profile by ID
@profile_bp.route("/<int:id>", methods=["GET"])
def get_profile(id):
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({
            "error": "Profile not found"}), 404

    return jsonify({
    "id": profile.id,
    "interests": profile.interests,
    "budget": profile.budget,
    "company": profile.company
}), 200

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

    return jsonify({
        "id": new_profile.id,
        "interests": new_profile.interests,
        "budget": new_profile.budget,
        "company": new_profile.company
    }), 201

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

    return jsonify({
        "id": profile.id,
        "interests": profile.interests,
        "budget": profile.budget,
        "company": profile.company
    }), 200

@profile_bp.route("/<int:id>", methods=["DELETE"])
def delete_profile(id):
    profile = db.session.get(Profile, id)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted successfully"}), 200