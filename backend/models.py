from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Place(db.Model):
    __tablename__ = "places"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    physical_address = db.Column(db.String)
    website = db.Column(db.String)
    Picture = db.Column(db.String)
    likes = db.Column(db.Integer, default=0)
    category = db.Column(db.String)
    operating_hours = db.Column(db.String)
    gps = db.Column(db.String)

    items = db.relationship("Item", back_populates="place")
    user_places = db.relationship("UserPlace", back_populates="place")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String,
        nullable=False
    )

    description = db.Column(db.String)

    cost = db.Column(db.Float)

    place_id = db.Column(
        db.Integer,
        db.ForeignKey("places.id"),
        nullable=False
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    place = db.relationship(
        "Place",
        back_populates="items"
    )

    category = db.relationship(
        "Category",
        back_populates="items"
    )


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    items = db.relationship(
        "Item",
        back_populates="category"
    )


class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    interests = db.Column(db.String, nullable=False)
    budget = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


class UserPlace(db.Model):
    __tablename__ = "user_places"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    visited_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    place_id = db.Column(
        db.Integer,
        db.ForeignKey("places.id"),
        nullable=False
    )
    review = db.Column(db.Text, nullable=True)

    place = db.relationship(
        "Place",
        back_populates="user_places"
    )