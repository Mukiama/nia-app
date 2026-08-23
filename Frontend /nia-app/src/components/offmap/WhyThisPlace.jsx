function WhyThisPlace({ place, preferences }) {
  const reasons = [];

  if (
    preferences.mood &&
    preferences.mood !== "surprise" &&
    place.moods.includes(preferences.mood)
  ) {
    reasons.push("Matches your mood");
  }

  if (
    preferences.who &&
    preferences.who !== "surprise" &&
    place.suitableFor.includes(preferences.who)
  ) {
    reasons.push("Works for your group");
  }

  if (
    preferences.distance === "nearby" &&
    place.distanceMinutes <= 10
  ) {
    reasons.push("It's close by");
  }

  if (
    preferences.distance === "15-min" &&
    place.distanceMinutes <= 15
  ) {
    reasons.push("Within your 15-minute range");
  }

  if (
    preferences.distance === "30-min" &&
    place.distanceMinutes <= 30
  ) {
    reasons.push("Within your 30-minute range");
  }

  if (
    preferences.budget === "free" &&
    place.priceLevel === 0
  ) {
    reasons.push("Fits your free budget");
  }

  if (
    preferences.budget === "500-1500" &&
    place.priceLevel <= 1
  ) {
    reasons.push("Fits your budget");
  }

  if (reasons.length === 0) {
    reasons.push("Something different caught our eye");
  }

  return (
    <section className="offmap-why">
      <p className="offmap-result-eyebrow">
        WHY THIS?
      </p>

      <div className="offmap-reasons">
        {reasons.slice(0, 4).map((reason) => (
          <div
            className="offmap-reason"
            key={reason}
          >
            <span className="offmap-reason-check">
              ✓
            </span>

            <span>{reason}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyThisPlace;