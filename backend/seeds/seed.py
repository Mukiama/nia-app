import json
from pathlib import Path

from app import app
from models import db, Profile


PROFILE_FILE = Path(__file__).resolve().parent / "profiles.json"


with app.app_context():

    with open(PROFILE_FILE, "r", encoding="utf-8") as f:
        profiles = json.load(f)

    for profile_data in profiles:

        profile = Profile(
            interests=profile_data["interests"],
            budget=profile_data["budget"],
            company=profile_data["company"]
        )

        db.session.add(profile)

    db.session.commit()

    print(f"Successfully seeded {len(profiles)} profiles.")