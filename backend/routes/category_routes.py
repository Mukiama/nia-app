from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from models import db
from models.category import Category
from schemas.category_schema import CategorySchema
from flask_jwt_extended import jwt_required, get_jwt_identity


# Blueprint for category routes
category_bp = Blueprint(
    "categories",
    __name__,
    url_prefix="/categories"
)

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


# GET ALL CATEGORIES
@category_bp.route("/", methods=["GET"])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    categories = Category.query.all()

    return jsonify(
        categories_schema.dump(categories)
    ), 200


# GET ONE CATEGORY
@category_bp.route("/<int:category_id>", methods=["GET"])
@jwt_required()
def get_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.get(category_id)

    if not category:
        return jsonify({
            "error": "Category not found"
        }), 404

    return jsonify(
        category_schema.dump(category)
    ), 200


# CREATE CATEGORY
@category_bp.route("/", methods=["POST"])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        new_category = category_schema.load(data)
    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 400

    category = Category(
        name=new_category["name"],
        description=new_category.get("description")
    )

    try:
        db.session.add(category)
        db.session.commit()

    except IntegrityError:
        db.session.rollback()

        return jsonify({
            "error": "Category already exists"
        }), 409

    return jsonify(
        category_schema.dump(category)
    ), 201


# UPDATE CATEGORY
@category_bp.route("/<int:category_id>", methods=["PATCH"])
@jwt_required()
def update_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.get(category_id)

    if not category:
        return jsonify({
            "error": "Category not found"
        }), 404

    data = request.get_json()

    try:
        validated_data = CategorySchema(
            partial=True
        ).load(data)
    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 400

    if "name" in validated_data:
        category.name = validated_data["name"]

    if "description" in validated_data:
        category.description = validated_data["description"]

    try:
        db.session.commit()

    except IntegrityError:
        db.session.rollback()

        return jsonify({
            "error": "Category already exists"
        }), 409

    return jsonify(
        category_schema.dump(category)
    ), 200


# DELETE CATEGORY
@category_bp.route("/<int:category_id>", methods=["DELETE"])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.get(category_id)

    if not category:
        return jsonify({
            "error": "Category not found"
        }), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({
        "message": "Category deleted"
    }), 200