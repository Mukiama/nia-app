import { Link } from "react-router-dom";
import "../styles/placeCard.css";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <div className="place-card-image-wrapper">
        <img
          src={place.image}
          alt={place.name}
          className="place-card-image"
        />
        <span className="place-category-badge">{place.location}</span>
      </div>

      <div className="place-card-content">
        <h2 className="place-card-title">{place.name}</h2>
        <p className="place-card-description">{place.description}</p>

        <Link to={`/places/${place.id}`} className="place-card-link">
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;