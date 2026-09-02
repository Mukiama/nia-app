from flask import Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import IntegrityError
from models import db, Place
from schemas.place_schema import PlaceSchema
import cloudinary.uploader
import json


place_bp = Blueprint("places", __name__)
place_api = Api(place_bp)


class PlacesResource(Resource):
    def options(self):
        return "", 200

    @jwt_required(optional=True)
    def get(self):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)
        search = request.args.get("q", "", type=str).strip()
        category = request.args.get("category", "", type=str).strip()

        query = Place.query

        if search:
            query = query.filter(Place.name.ilike(f"%{search}%"))

        if category and category != "All":
            query = query.filter(Place.category == category)

        pagination = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        return make_response(
            jsonify({
                "items": PlaceSchema(many=True).dump(pagination.items),
                "page": pagination.page,
                "has_more": pagination.has_next,
            }),
            200
        )

    @jwt_required()
    def post(self):
        data = request.get_json()

        try:
            new_place = PlaceSchema().load(
                data,
                session=db.session
            )
        except Exception as error:
            return {"error": str(error)}, 400

        try:
            db.session.add(new_place)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {"error": "Could not create place"}, 409

        return make_response(
            jsonify(PlaceSchema().dump(new_place)),
            201
        )


class PlaceResource(Resource):
    def options(self, id):
        return "", 200

    @jwt_required(optional=True)
    def get(self, id):
        place = Place.query.filter_by(id=id).first()

        if not place:
            return {"error": "Place not found"}, 404

        return make_response(
            jsonify(PlaceSchema().dump(place)),
            200
        )

    @jwt_required()
    def delete(self, id):
        place = Place.query.filter_by(id=id).first()

        if not place:
            return {"error": "Place not found"}, 404

        db.session.delete(place)
        db.session.commit()

        return {"message": "Place deleted"}, 200


class PlacePictureResource(Resource):
    @jwt_required()
    def post(self, id):
        place = Place.query.filter_by(id=id).first()

        if not place:
            return {"error": "Place not found"}, 404

        pictures = request.files.getlist("pictures")

        if not pictures:
            return {"error": "No pictures provided"}, 400

        if len(pictures) > 5:
            return {"error": "Maximum of 5 pictures allowed"}, 400

        uploaded_urls = []

        try:
            for picture in pictures:
                if not picture or picture.filename == "":
                    continue

                result = cloudinary.uploader.upload(
                    picture,
                    folder="nia/places"
                )

                uploaded_urls.append(result["secure_url"])

            if not uploaded_urls:
                return {"error": "No valid pictures provided"}, 400

            place.picture = json.dumps(uploaded_urls)

            db.session.commit()

            return {
                "message": "Pictures uploaded successfully",
                "pictures": uploaded_urls
            }, 200

        except Exception as error:
            db.session.rollback()

            return {
                "error": "Picture upload failed",
                "details": str(error)
            }, 500


place_api.add_resource(
    PlacesResource,
    "/places",
    "/places/"
)

place_api.add_resource(
    PlaceResource,
    "/places/<int:id>",
    "/places/<int:id>/"
)

place_api.add_resource(
    PlacePictureResource,
    "/places/<int:id>/picture",
    "/places/<int:id>/picture/"
)


class PlaceCategoriesResource(Resource):
    def options(self):
        return "", 200

    @jwt_required(optional=True)
    def get(self):
        categories = (
            db.session.query(Place.category)
            .filter(Place.category.isnot(None))
            .distinct()
            .all()
        )

        return make_response(
            jsonify(
                sorted([
                    c[0]
                    for c in categories
                    if c[0]
                ])
            ),
            200
        )


place_api.add_resource(
    PlaceCategoriesResource,
    "/places/categories",
    "/places/categories/"
)