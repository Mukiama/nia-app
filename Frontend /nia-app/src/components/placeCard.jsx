import { Link } from "react-router-dom";
import "../styles/placeCard.css";

function PlaceCard({ place }) {
  let image = "";

  try {
    if (Array.isArray(place.picture)) {
      image = place.picture[0];
    } else if (place.picture) {
      const parsed = JSON.parse(place.picture);

      if (Array.isArray(parsed)) {
        image = parsed[0];
      } else {
        image = place.picture;
      }
    }
  } catch {
    image = place.picture || "";
  }

  return (
    <div className="place-card">
      <div className="place-card-image-wrapper">
        {image ? (
          <img
            src={image}
            alt={place.name}
            className="place-card-image"
          />
        ) : (
          <div className="place-card-image placeholder">
            No image
          </div>
        )}

        <span className="place-location-badge">
          {place.physical_address || place.location}
        </span>
      </div>

      <div className="place-card-content">
        <h2 className="place-card-title">
          {place.name}
        </h2>

        <p className="place-card-description">
          {place.description}
        </p>

        <Link
          to={`/places/${place.id}`}
          className="place-card-link"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;