import WhyThisPlace from "./WhyThisPlace";

function OffMapResult({
  place,
  preferences,
  onRollAgain,
  onWildcard,
}) {
  if (!place) {
    return (
      <section className="offmap-result">
        <div className="offmap-result-heading">
          <p className="offmap-label">
            OFFMAP
          </p>

          <h1>
            No place found.
          </h1>

          <p>
            Try rolling again to discover somewhere else.
          </p>
        </div>

        <div className="offmap-result-actions">
          <button
            type="button"
            onClick={onRollAgain}
          >
            ↻ Give me another
          </button>
        </div>
      </section>
    );
  }

  const isWildcard = Boolean(place.wildcardRule);

  return (
    <section className="offmap-result">

      {isWildcard && (
        <div className="offmap-wildcard-banner">
          <span>🃏 WILDCARD</span>

          <span>
            We broke your {place.wildcardRule} rule.
          </span>
        </div>
      )}

      <div className="offmap-result-heading">
        <p className="offmap-label">
          OFFMAP HAS SPOKEN
        </p>

        <h1>
          You should go here.
        </h1>
      </div>

      <article className="offmap-result-card">

        <div className="offmap-result-image">
          <img
            src={place.image}
            alt={place.name}
          />
        </div>

        <div className="offmap-result-content">

          <p className="offmap-result-category">
            {place.category}
          </p>

          <h2>
            {place.name}
          </h2>

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

          <WhyThisPlace
            place={place}
            preferences={preferences}
          />

          <p className="offmap-result-message">
            This isn't necessarily where everyone goes.
            That's the point.
          </p>

          {/* <button
            type="button"
            className="offmap-go-button"
          >
            Take me there →
          </button> */}

        </div>

      </article>

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

        <button
          type="button"
          onClick={onRollAgain}
        >
          🎭 Mystery
        </button>

      </div>

    </section>
  );
}

export default OffMapResult;
