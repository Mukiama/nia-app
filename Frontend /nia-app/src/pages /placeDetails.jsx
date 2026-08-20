import { useParams, Link } from "react-router-dom";
import places from "../data/places";

function PlaceDetails() {
  const { id } = useParams();

  // Find the place selected by the user
  const place = places.find((place) => place.id === Number(id));

  // If the place doesn't exist
  if (!place) {
    return (
      <div className="place-not-found">
        <h1>Place Not Found</h1>
        <p>Sorry, we couldn't find that place.</p>

        <Link to="/">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="place-details">

      <img
        src={place.image}
        alt={place.name}
        className="place-details-image"
      />

      <div className="place-details-content">

        <p className="place-category">
          {place.category}
        </p>

        <h1>{place.name}</h1>

        <p className="place-location">
          📍 {place.county}, Kenya
        </p>

        <div className="place-description">
          <h2>About this place</h2>

          <p>
            {place.description}
          </p>
        </div>

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default PlaceDetails;