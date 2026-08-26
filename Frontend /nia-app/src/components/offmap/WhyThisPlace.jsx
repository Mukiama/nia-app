import WhyThisPlace from "./WhyThisPlace";

function OffMapResult({
  place,
  preferences,
  onRollAgain,
  onWildcard,
}) {
  if (!place) {
    return null;
  }

  const isWildcard = Boolean(place.wildcardRule);

  return (
    <section className="offmap-result">

      {/* WILDCARD BANNER */}
      {isWildcard && (
        <div className="offmap-wildcard-banner">
          <span>🃏 WILDCARD</span>

          <span>
            We broke your {place.wildcardRule} rule.
          </span>
        </div>
      )}

      {/* HEADING */}
      <div className="offmap-result-heading">
        <p className="offmap-label">
          OFFMAP HAS SPOKEN
        </p>

        <h1>
          You should go here.
        </h1>
      </div>

      {/* RESULT CARD */}
      <article className="offmap-result-card">

        {/* IMAGE */}
        <div className="offmap-result-image">
          <img
            src={place.image}
            alt={place.name}
          />
        </div>

        {/* CONTENT */}
        <div className="offmap-result-content">

          <p className="offmap-result-category">
            {place.category}
          </p>

          <h2>{place.name}</h2>

          <div className="offmap-result-details">
            <span>
              📍 {place.location}
            </span>

            <span>
              💰 {place.price}
            </span>

            <span>
              ⏱️ {place.time || place.timeRequired}
            </span>
          </div>

          {/* WHY THIS PLACE */}
          <WhyThisPlace
            place={place}
            preferences={preferences}
          />

          <p className="offmap-result-message">
            This isn't necessarily where everyone goes.
            That's the point.
          </p>

          <button
            type="button"
            className="offmap-go-button"
          >
            Take me there →
          </button>

        </div>

      </article>

      {/* ACTIONS */}
      <div className="offmap-result-actions">

        <button
          type="button"
          onClick={onRollAgain}
        >
          ↻ Give me another
        </button>

        <button
          type="button"
          onClick={onWildcard}
        >
          🃏 Wildcard
        </button>

        <button type="button">
          🎭 Mystery
        </button>

      </div>

    </section>
  );
}

export default OffMapResult;