function PlaceCard({ place }) {
  return (
    <article className="place-card">
      <img
        src={place.image}
        alt={place.name}
        className="place-image"
      />

      <div className="place-card-content">
        <p className="place-category">
          {place.category}
        </p>

        <h3>{place.name}</h3>

        <p>{place.description}</p>

        <span>{place.location}</span>

        <button>
          Explore
        </button>
      </div>
    </article>
  );
}

export default PlaceCard;