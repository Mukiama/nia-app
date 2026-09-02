import json
from pathlib import Path

from app import app
from models import (
    db,
    Profile,
    Item,
    Place,
    Category,
    User,
    History,
    Favourite,
    UserPlace,
)
from seeds.user_places import seed_user_places

SEEDS_DIR = Path(__file__).resolve().parent

CATEGORIES_FILE = SEEDS_DIR / "categories.json"
PLACES_FILE = SEEDS_DIR / "places.json"
USERS_FILE = SEEDS_DIR / "users.json"
PROFILES_FILE = SEEDS_DIR / "profiles.json"
ITEMS_FILE = SEEDS_DIR / "items.json"


with app.app_context():

    print("Performing complete relational database wipe...")

    UserPlace.query.delete()
    History.query.delete()
    Favourite.query.delete()
    Item.query.delete()
    Profile.query.delete()
    User.query.delete()
    Place.query.delete()
    Category.query.delete()

    db.session.commit()


    print("Parsing categories.json...")

    with open(CATEGORIES_FILE, "r", encoding="utf-8") as f:
        categories_data = json.load(f)

    for cat_data in categories_data:
        db.session.add(
            Category(
                name=cat_data["name"],
                description=cat_data.get("description", "")
            )
        )

    db.session.commit()

    print(
        f"Successfully seeded {len(categories_data)} categories."
    )


    print("Parsing places.json...")

    with open(PLACES_FILE, "r", encoding="utf-8") as f:
        places_data = json.load(f)

    for p_data in places_data:

        name = p_data.get("name") or p_data.get("place")

        if not name:
            continue

        db.session.add(
            Place(
                name=name,
                description=p_data.get("description"),
                physical_address=p_data.get("physical_address"),
                website=p_data.get("website"),
                picture=p_data.get("picture"),
                likes=p_data.get("Likes", 0),
                category=p_data.get("category"),
                operating_hours=p_data.get("operating_hours"),
                gps=p_data.get("gps"),
            )
        )

    db.session.commit()

    print(
        f"Successfully seeded {len(places_data)} places."
    )


    print("Parsing users.json...")

    with open(USERS_FILE, "r", encoding="utf-8") as f:
        users_data = json.load(f)

    for u_data in users_data:

        user = User(
            name=u_data["name"],
            email=u_data["email"]
        )

        user.password_hash = u_data.get(
            "password",
            "password123"
        )

        db.session.add(user)

    db.session.commit()

    print(
        f"Successfully seeded {len(users_data)} users."
    )


    print("Parsing profiles.json...")

    with open(PROFILES_FILE, "r", encoding="utf-8") as f:
        profiles_data = json.load(f)

    for i, prof_data in enumerate(profiles_data):

        target_user = User.query.offset(i).first()

        if not target_user:

            target_user = User(
                name=f"Extra Seed User {i + 1}",
                email=f"autouser{i + 1}@moringalabs.com"
            )

            target_user.password_hash = "password123"

            db.session.add(target_user)
            db.session.flush()

        db.session.add(
            Profile(
                interests=prof_data["interests"],
                budget=prof_data["budget"],
                company=prof_data["company"],
                user_id=target_user.id
            )
        )

    db.session.commit()

    print(
        f"Successfully seeded {len(profiles_data)} profiles."
    )


    print("Parsing items.json...")

    with open(ITEMS_FILE, "r", encoding="utf-8") as f:
        items_data = json.load(f)

    for item_entry in items_data:

        place = Place.query.filter_by(
            name=item_entry["place"]
        ).first()

        category = Category.query.filter_by(
            name=item_entry["category"]
        ).first()

        if not place:
            print(
                f"Skipping item: place not found - "
                f"{item_entry['place']}"
            )
            continue

        if not category:
            print(
                f"Skipping item: category not found - "
                f"{item_entry['category']}"
            )
            continue

        db.session.add(
            Item(
                name=item_entry["name"],
                description=item_entry.get("description", ""),
                cost=item_entry["cost"],
                place_id=place.id,
                category_id=category.id
            )
        )

    db.session.commit()

    print(
        f"Successfully seeded {len(items_data)} items."
    )

    print(
        "Generating seed tracking nodes for "
        "History and Favourites pages..."
    )

    active_places = Place.query.limit(4).all()
    all_users = User.query.all()

    for user in all_users:

        for place in active_places:

            db.session.add(
                History(
                    user_id=user.id,
                    place_id=place.id
                )
            )

            db.session.add(
                Favourite(
                    user_id=user.id,
                    place_id=place.id
                )
            )

    db.session.commit()

    print(
        "Successfully seeded History and Favourite records."
    )


    print("Seeding UserPlace records...")

    seed_user_places()

    print(
        "Successfully seeded UserPlace records."
    )

    print(
        "Database seeding completed successfully!"
    )