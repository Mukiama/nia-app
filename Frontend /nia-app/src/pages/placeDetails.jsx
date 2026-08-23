import { Link, useParams } from "react-router-dom";
import places from "../data/places";

function PlaceDetails() {
  const { id } = useParams();
  const place = places.find((item) => String(item.id) === String(id));

  if (!place) {
    return (
      <main>
        <h1>Place not found</h1>
        <Link to="/">Back to places</Link>
      </main>
    );
  }

  return (
    <main className="place-details">
      <img src={place.image} alt={place.name} />

      <h1>{place.name}</h1>
      <p>{place.county}, Kenya</p>
      <p>{place.category}</p>
      <p>{place.description}</p>

      <Link to="/">← Back to places</Link>
    </main>
  );
}

export default PlaceDetails;