import json
from pathlib import Path

from app import app
from models import db, Profile, Item, Place, Category
from seeds.user_places import seed_user_places


BASE_DIR = Path(__file__).resolve().parent

PROFILE_FILE = BASE_DIR / "profiles.json"
ITEM_FILE = BASE_DIR / "items.json"
CATEGORY_FILE = BASE_DIR / "categories.json"
PLACE_FILE = BASE_DIR / "places.json"


with app.app_context():

    # -------------------------
    # Load JSON files
    # -------------------------

    with open(PROFILE_FILE, "r", encoding="utf-8") as f:
        profiles = json.load(f)

    with open(ITEM_FILE, "r", encoding="utf-8") as f:
        items = json.load(f)

    with open(CATEGORY_FILE, "r", encoding="utf-8") as f:
        categories = json.load(f)

    with open(PLACE_FILE, "r", encoding="utf-8") as f:
        places = json.load(f)

    # -------------------------
    # Seed Categories
    # -------------------------

    for category_data in categories:

        existing_category = Category.query.filter_by(
            name=category_data["name"]
        ).first()

        if existing_category:
            continue

        category = Category(
            name=category_data["name"],
            description=category_data["description"]
        )

        db.session.add(category)

    db.session.commit()

    print(f"Successfully seeded {len(categories)} categories.")

    # -------------------------
    # Seed Places
    # -------------------------

    for place_data in places:

        existing_place = Place.query.filter_by(
            name=place_data["name"]
        ).first()

        if existing_place:
            continue

        place = Place(
            name=place_data["name"],
            description=place_data.get("description"),
            physical_address=place_data.get("physical_address"),
            website=place_data.get("website"),
            picture=place_data.get("picture"),
            likes=place_data.get("Likes", 0),
            category=place_data.get("category"),
            operating_hours=place_data.get("operating_hours"),
            gps=place_data.get("gps")
        )

        db.session.add(place)

    db.session.commit()

    print(f"Successfully seeded {len(places)} places.")

    # -------------------------
    # Seed Items
    # -------------------------

    for item_data in items:

        place = Place.query.filter_by(
            name=item_data["place"]
        ).first()

        category = Category.query.filter_by(
            name=item_data["category"]
        ).first()

        if not place:
            raise ValueError(
                f"Place not found: {item_data['place']}"
            )

        if not category:
            raise ValueError(
                f"Category not found: {item_data['category']}"
            )

        existing_item = Item.query.filter_by(
            name=item_data["name"],
            place_id=place.id
        ).first()

        if existing_item:
            continue

        item = Item(
            name=item_data["name"],
            description=item_data["description"],
            cost=item_data["cost"],
            place_id=place.id,
            category_id=category.id
        )

        db.session.add(item)

    db.session.commit()

    print(f"Successfully seeded {len(items)} items.")

    # -------------------------
    # Seed Profiles
    # -------------------------

    for profile_data in profiles:

        profile = Profile(
            interests=profile_data["interests"],
            budget=profile_data["budget"],
            company=profile_data["company"]
        )

        db.session.add(profile)

    db.session.commit()

    print(f"Successfully seeded {len(profiles)} profiles.")

    # -------------------------
    # Seed UserPlaces
    # -------------------------

    seed_user_places()

    print("Successfully seeded UserPlace records.")