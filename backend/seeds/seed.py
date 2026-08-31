import json
from pathlib import Path

from app import app
from models import db, Profile, Item, Place, Category, User

PROFILE_FILE = Path(__file__).resolve().parent / "profiles.json"
ITEM_FILE = Path(__file__).resolve().parent / "items.json"
CATEGORY_FILE = Path(__file__).resolve().parent / "categories.json"

with app.app_context():
    print("Clearing old data...")
    Item.query.delete()
    Profile.query.delete()
    User.query.delete()
    Place.query.delete()
    Category.query.delete()
    db.session.commit()

    # 1. Load data from JSON files
    with open(PROFILE_FILE, "r", encoding="utf-8") as f:
        profiles_data = json.load(f)

    with open(ITEM_FILE, "r", encoding="utf-8") as f:
        items_data = json.load(f)

    with open(CATEGORY_FILE, "r", encoding="utf-8") as f:
        categories_data = json.load(f)

    # 2. Seed Categories First (Items and Profiles need these to exist)
    print("Seeding categories...")
    for cat_data in categories_data:
        if not Category.query.filter_by(name=cat_data["name"]).first():
            category = Category(
                name=cat_data["name"],
                description=cat_data.get("description", "")
            )
            db.session.add(category)
    db.session.commit()

    # 3. Seed Places dynamically from your items file if not already present
    print("Seeding places...")
    distinct_places = {item["place"] for item in items_data if "place" in item}
    for place_name in distinct_places:
        if not Place.query.filter_by(name=place_name).first():
            place = Place(name=place_name)
            db.session.add(place)
    db.session.commit()

    # 4. Seed Users and Profiles safely
    print("Seeding users and profiles...")
    for i, profile_data in enumerate(profiles_data):
        # Create a matching user for the profile to satisfy the NOT NULL constraint
        user = User(
            name=f"Seed User {i+1}",
            email=f"user{i+1}@example.com"
        )
        user.password_hash = "password123"  # Set via your hybrid property setter
        db.session.add(user)
        db.session.flush()  # Generates user.id immediately

        profile = Profile(
            interests=profile_data["interests"],
            budget=profile_data["budget"],
            company=profile_data["company"],
            user_id=user.id  # Links the profile to the valid user ID
        )
        db.session.add(profile)
    db.session.commit()

    # 5. Seed Items with corrected loop scope syntax
    print("Seeding items...")
    for item_entry in items_data:
        place = Place.query.filter_by(name=item_entry["place"]).first()
        category = Category.query.filter_by(name=item_entry["category"]).first()

        if not place:
            raise ValueError(f"Place not found database check: {item_entry['place']}")
        if not category:
            raise ValueError(f"Category not found database check: {item_entry['category']}")

        item = Item(
            name=item_entry["name"],
            description=item_entry.get("description", ""),
            cost=item_entry["cost"],
            place_id=place.id,
            category_id=category.id
        )
        db.session.add(item)
    
    db.session.commit()
    print("Database seeding completed successfully!")
