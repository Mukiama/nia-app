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