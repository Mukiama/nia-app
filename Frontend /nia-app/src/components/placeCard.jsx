import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <Link
      to={`/places/${place.id}`}
      className="place-card"
    >
      <img
        src={place.image}
        alt={place.name}
        className="place-card-image"
      />

      <div className="place-card-content">
        <p className="place-category">
          {place.category}
        </p>

        <h2>{place.name}</h2>

        <p className="place-location">
          {place.county}, Kenya
        </p>

        <p className="place-description">
          {place.description}
        </p>

        <span className="place-card-link">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export default PlaceCard;