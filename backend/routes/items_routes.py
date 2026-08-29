from flask import Blueprint, jsonify, request
from models import db
from models.items import Item
from schemas.items_schema import ItemSchema


item_bp = Blueprint("items", __name__, url_prefix="/items")

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

@item_bp.route("/", methods=["GET"])
def get_items():
    items = Item.query.all()
    return jsonify(items_schema.dump(items)), 200

@item_bp.route("/", methods=["POST"])
def create_item():
    data = request.get_json()

    try:
        new_item = item_schema.load(data, session=db.session)
    except Exception as error:
        return jsonify({"error": str(error)}), 400

    db.session.add(new_item)
    db.session.commit()

    return jsonify(item_schema.dump(new_item)), 201

@item_bp.route("/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted"}), 200

