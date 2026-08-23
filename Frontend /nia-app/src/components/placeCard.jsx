import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <img
        src={place.image}
        alt={place.name}
        className="place-card-image"
      />

      <div className="place-card-content">
        <h2>{place.name}</h2>
        <p className="place-location">{place.county}, Kenya</p>
        <p className="place-category">{place.category}</p>
        <p className="place-description">{place.description}</p>

        <Link to={`/places/${place.id}`} className="place-card-link">
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;