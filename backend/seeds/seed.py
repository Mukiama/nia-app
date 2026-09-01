import json
from pathlib import Path
from app import app
from models import db, Profile, Item, Place, Category, User, History, Favourite, UserPlace

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

    # 1. Load Categories
    print("Parsing categories.json...")
    with open(CATEGORIES_FILE, "r", encoding="utf-8") as f:
        categories_data = json.load(f)
    for cat_data in categories_data:
        db.session.add(Category(
            name=cat_data["name"],
            description=cat_data.get("description", "")
        ))
    db.session.commit()

    # 2. Load Places
    print("Parsing places.json...")
    with open(PLACES_FILE, "r", encoding="utf-8") as f:
        places_data = json.load(f)
    for p_data in places_data:
        name = p_data.get("name") or p_data.get("place")
        if name:
            db.session.add(Place(name=name))
    db.session.commit()

    # 3. Load Users from json
    print("Parsing users.json...")
    with open(USERS_FILE, "r", encoding="utf-8") as f:
        users_data = json.load(f)
    for u_data in users_data:
        user = User(name=u_data["name"], email=u_data["email"])
        user.password_hash = u_data.get("password", "password123")
        db.session.add(user)
    db.session.commit()

    # 4. Load Profiles and dynamically generate matching users to avoid One-to-One violations
    print("Parsing profiles.json and auto-generating missing companion user accounts...")
    with open(PROFILES_FILE, "r", encoding="utf-8") as f:
        profiles_data = json.load(f)
        
    for i, prof_data in enumerate(profiles_data):
        target_user = User.query.offset(i).first()
        
        # If we have more profiles than users, create a new unique user for it
        if not target_user:
            target_user = User(
                name=f"Extra Seed User {i+1}", 
                email=f"autouser{i+1}@moringalabs.com"
            )
            target_user.password_hash = "password123"
            db.session.add(target_user)
            db.session.flush() # Populate the ID dynamically

        db.session.add(Profile(
            interests=prof_data["interests"],
            budget=prof_data["budget"],
            company=prof_data["company"],
            user_id=target_user.id
        ))
    db.session.commit()

    # 5. Load Items Catalog
    print("Parsing items.json...")
    with open(ITEMS_FILE, "r", encoding="utf-8") as f:
        items_data = json.load(f)
    for item_entry in items_data:
        place = Place.query.filter_by(name=item_entry["place"]).first()
        category = Category.query.filter_by(name=item_entry["category"]).first()

        if place and category:
            db.session.add(Item(
                name=item_entry["name"],
                description=item_entry.get("description", ""),
                cost=item_entry["cost"],
                place_id=place.id,
                category_id=category.id
            ))
    db.session.commit()

    # 6. Generate explicit History and Favourites links
    print("Generating seed tracking nodes for History and Favourites pages...")
    active_places = Place.query.limit(4).all()
    all_users = User.query.all()
    
    for user in all_users:
        for place in active_places:
            db.session.add(History(user_id=user.id, place_id=place.id))
            db.session.add(Favourite(user_id=user.id, place_id=place.id))
            
    db.session.commit()
    print("Database seeding completed successfully with all histories linked!")