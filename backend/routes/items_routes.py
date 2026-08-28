from flask import Blueprint, jsonify, request
from models import db
from models.items import Item
from schemas.items_schema import ItemSchema


item_bp = Blueprint("items", __name__, url_prefix="/items")