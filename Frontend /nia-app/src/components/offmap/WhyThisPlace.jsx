function WhyThisPlace({ place, preferences }) {
  if (!place) {
    return null;
  }

  const reasons = [];

  if (
    preferences?.mood &&
    preferences.mood !== "surprise" &&
    place.moods?.includes(preferences.mood)
  ) {
    reasons.push(`matches your ${preferences.mood} mood`);
  }

  if (
    preferences?.who &&
    preferences.who !== "surprise" &&
    place.suitableFor?.includes(preferences.who)
  ) {
    reasons.push(`works well for ${preferences.who}`);
  }

  if (
    preferences?.time &&
    preferences.time !== "surprise"
  ) {
    if (
      preferences.time === "one-hour" &&
      place.timeLevel <= 1
    ) {
      reasons.push("fits your available time");
    }

    if (
      preferences.time === "three-hours" &&
      place.timeLevel <= 2
    ) {
      reasons.push("fits your available time");
    }

    if (
      preferences.time === "half-day" &&
      place.timeLevel <= 3
    ) {
      reasons.push("fits your available time");
    }

    if (preferences.time === "whole-day") {
      reasons.push("gives you plenty of time to explore");
    }
  }

  if (reasons.length === 0) {
    reasons.push("it matches your OffMap preferences");
  }

  return (
    <div className="offmap-why">
      <p className="offmap-why-label">
        WHY THIS PLACE?
      </p>

      <p className="offmap-why-text">
        We picked <strong>{place.name}</strong> because it{" "}
        {reasons.join(", ")}.
      </p>
    </div>
  );
}

export default WhyThisPlace;
