from flask import Blueprint, jsonify
from models import Profile

profile_bp = Blueprint("profile",  __name__, url_prefix="/profiles")


# GET all profiles
@profile_bp.route("/", methods=["GET"])
def get_profiles():
    profiles = Profile.query.all()

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
    profile = Profile.query.get(id)

    if profile is None:
        return jsonify({
            "error": "Profile not found"}), 404

    return jsonify({
    "id": profile.id,
    "interests": profile.interests,
    "budget": profile.budget,
    "company": profile.company
}), 200