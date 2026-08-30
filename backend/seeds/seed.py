import json
from pathlib import Path

from app import app
from models import db, Profile, Item, Place, Category


PROFILE_FILE = Path(__file__).resolve().parent / "profiles.json"
ITEM_FILE = Path(__file__).resolve().parent / "items.json"


with app.app_context():

    with open(PROFILE_FILE, "r", encoding="utf-8") as f:
        profiles = json.load(f)

    with open(ITEM_FILE, "r", encoding="utf-8") as f:
        items = json.load(f)

    for profile_data in profiles:

        profile = Profile(
            interests=profile_data["interests"],
            budget=profile_data["budget"],
            company=profile_data["company"]
        )

        db.session.add(profile)

        for item_data in items:
            place = Place.query.filter_by(name=item_data["place"]).first()
            category = Category.query.filter_by(name=item_data["category"]).first()

    db.session.commit()

    print(f"Successfully seeded {len(profiles)} profiles.")