import json
from pathlib import Path
from app import app
from models import db, Profile, Item, Place, Category, User

PROFILE_FILE = Path(__file__).resolve().parent / "profiles.json"
ITEM_FILE = Path(__file__).resolve().parent / "items.json"
CATEGORY_FILE = Path(__file__).resolve().parent / "categories.json"
USER_FILE = Path(__file__).resolve().parent / "users.json"

with app.app_context():
    with open(PROFILE_FILE, "r", encoding="utf-8") as f:
        profiles = json.load(f)

    with open(ITEM_FILE, "r", encoding="utf-8") as f:
        items = json.load(f)

    with open(CATEGORY_FILE, "r", encoding="utf-8") as f:
        categories = json.load(f)

    with open(USER_FILE, "r", encoding="utf-8") as f:
        users = json.load(f)

    for profile_data in profiles:
        profile = Profile(
            interests=profile_data["interests"],
            budget=profile_data["budget"],
            company=profile_data["company"]
        )
        db.session.add(profile)

    for category_data in categories:
        category = Category(
            name=category_data["name"],
            description=category_data["description"]
        )
        db.session.add(category)

    db.session.flush()  # ensure categories have IDs before items reference them

    for item_data in items:
        place = Place.query.filter_by(name=item_data["place"]).first()
        category = Category.query.filter_by(name=item_data["category"]).first()

        if not place:
            raise ValueError(f"Place not found: {item_data['place']}")
        if not category:
            raise ValueError(f"Category not found: {item_data['category']}")

        item = Item(
            name=item_data["name"],
            description=item_data["description"],
            cost=item_data["cost"],
            place_id=place.id,
            category_id=category.id
        )
        db.session.add(item)

    for user_data in users:
        user = User(
            name=user_data["name"],
            email=user_data["email"]
        )
        user.password_hash = user_data["password"]
        db.session.add(user)

    db.session.commit()

    print(f"Successfully seeded {len(profiles)} profiles, {len(categories)} categories, {len(items)} items, and {len(users)} users.")