from datetime import datetime, timezone

from app import db
from models.user_place import UserPlace


user_places_data = [
    # USER 1
    {
        "user_id": 1,
        "place_id": 1,
        "visited": True,
        "visited_at": datetime(2026, 7, 12, 10, 30, tzinfo=timezone.utc),
        "rating": 5,
        "review": "An amazing experience. The giraffes were beautiful and the staff were very welcoming.",
    },
    {
        "user_id": 1,
        "place_id": 4,
        "visited": True,
        "visited_at": datetime(2026, 7, 20, 8, 15, tzinfo=timezone.utc),
        "rating": 5,
        "review": "Karura is perfect for a peaceful morning walk. The forest trails are beautiful.",
    },
    {
        "user_id": 1,
        "place_id": 6,
        "visited": True,
        "visited_at": datetime(2026, 8, 2, 11, 0, tzinfo=timezone.utc),
        "rating": 4,
        "review": "Really enjoyed the exhibitions and learning more about Kenyan history.",
    },
    {
        "user_id": 1,
        "place_id": 8,
        "visited": False,
        "visited_at": None,
        "rating": None,
        "review": None,
    },

    # USER 2
    {
        "user_id": 2,
        "place_id": 2,
        "visited": True,
        "visited_at": datetime(2026, 6, 15, 9, 30, tzinfo=timezone.utc),
        "rating": 5,
        "review": "One of my favourite wildlife experiences in Nairobi. Seeing the rescued elephants was incredible.",
    },
    {
        "user_id": 2,
        "place_id": 5,
        "visited": True,
        "visited_at": datetime(2026, 7, 5, 13, 0, tzinfo=timezone.utc),
        "rating": 4,
        "review": "Beautiful museum and a fascinating look into Karen Blixen's life in Kenya.",
    },
    {
        "user_id": 2,
        "place_id": 7,
        "visited": True,
        "visited_at": datetime(2026, 8, 8, 14, 0, tzinfo=timezone.utc),
        "rating": 4,
        "review": "A great cultural experience. The traditional performances were memorable.",
    },
    {
        "user_id": 2,
        "place_id": 3,
        "visited": False,
        "visited_at": None,
        "rating": None,
        "review": None,
    },

    # USER 3
    {
        "user_id": 3,
        "place_id": 3,
        "visited": True,
        "visited_at": datetime(2026, 5, 22, 7, 0, tzinfo=timezone.utc),
        "rating": 5,
        "review": "Seeing wildlife so close to the city was incredible. Definitely worth waking up early for.",
    },
    {
        "user_id": 3,
        "place_id": 8,
        "visited": True,
        "visited_at": datetime(2026, 7, 28, 16, 30, tzinfo=timezone.utc),
        "rating": 4,
        "review": "Great place for shopping, food and spending an afternoon with friends.",
    },
    {
        "user_id": 3,
        "place_id": 6,
        "visited": True,
        "visited_at": datetime(2026, 8, 10, 12, 15, tzinfo=timezone.utc),
        "rating": 4,
        "review": "There is so much to explore here. I especially enjoyed the cultural collections.",
    },
    {
        "user_id": 3,
        "place_id": 4,
        "visited": False,
        "visited_at": None,
        "rating": None,
        "review": None,
    },

    # USER 4
    {
        "user_id": 4,
        "place_id": 4,
        "visited": True,
        "visited_at": datetime(2026, 6, 8, 7, 45, tzinfo=timezone.utc),
        "rating": 5,
        "review": "One of the best places in Nairobi to disconnect from the city and enjoy nature.",
    },
    {
        "user_id": 4,
        "place_id": 1,
        "visited": True,
        "visited_at": datetime(2026, 7, 18, 15, 0, tzinfo=timezone.utc),
        "rating": 5,
        "review": "Such a fun experience. The giraffes were friendly and the conservation work is inspiring.",
    },
    {
        "user_id": 4,
        "place_id": 7,
        "visited": True,
        "visited_at": datetime(2026, 8, 3, 13, 30, tzinfo=timezone.utc),
        "rating": 4,
        "review": "Loved learning about different Kenyan cultures through the performances.",
    },
    {
        "user_id": 4,
        "place_id": 5,
        "visited": False,
        "visited_at": None,
        "rating": None,
        "review": None,
    },
]


def seed_user_places():
    for data in user_places_data:
        existing = UserPlace.query.filter_by(
            user_id=data["user_id"],
            place_id=data["place_id"]
        ).first()

        if existing:
            continue

        user_place = UserPlace(
            user_id=data["user_id"],
            place_id=data["place_id"],
            visited=data["visited"],
            visited_at=data["visited_at"],
            rating=data["rating"],
            review=data["review"],
        )

        db.session.add(user_place)

    db.session.commit()

    print(
        f"Added {len(user_places_data)} UserPlace records."
    )


if __name__ == "__main__":
    from app import app

    with app.app_context():
        seed_user_places()