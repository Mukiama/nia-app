function scorePlace(place, preferences) {
  let score = 0;

  // MOOD
  if (
    preferences.mood &&
    preferences.mood !== "surprise" &&
    place.moods.includes(preferences.mood)
  ) {
    score += 3;
  }

  // WHO
  if (
    preferences.who &&
    preferences.who !== "surprise" &&
    place.suitableFor.includes(preferences.who)
  ) {
    score += 3;
  }

  // BUDGET
  if (
    preferences.budget &&
    preferences.budget !== "surprise"
  ) {
    if (preferences.budget === "free" && place.priceLevel === 0) {
      score += 3;
    }

    if (
      preferences.budget === "under-500" &&
      place.priceLevel <= 0
    ) {
      score += 3;
    }

    if (
      preferences.budget === "500-1500" &&
      place.priceLevel <= 1
    ) {
      score += 3;
    }

    if (
      preferences.budget === "1500-3000" &&
      place.priceLevel <= 2
    ) {
      score += 3;
    }

    if (preferences.budget === "treat") {
      score += 2;
    }
  }

  // TIME
  if (
    preferences.time &&
    preferences.time !== "surprise"
  ) {
    if (
      preferences.time === "one-hour" &&
      place.timeLevel <= 1
    ) {
      score += 2;
    }

    if (
      preferences.time === "three-hours" &&
      place.timeLevel <= 2
    ) {
      score += 2;
    }

    if (
      preferences.time === "half-day" &&
      place.timeLevel <= 3
    ) {
      score += 2;
    }

    if (
      preferences.time === "whole-day"
    ) {
      score += 2;
    }
  }

  // DISTANCE
  if (
    preferences.distance &&
    preferences.distance !== "unexpected" &&
    preferences.distance !== "anywhere"
  ) {
    if (
      preferences.distance === "nearby" &&
      place.distanceMinutes <= 10
    ) {
      score += 2;
    }

    if (
      preferences.distance === "15-min" &&
      place.distanceMinutes <= 15
    ) {
      score += 2;
    }

    if (
      preferences.distance === "30-min" &&
      place.distanceMinutes <= 30
    ) {
      score += 2;
    }
  }

  return score;
}


function getOffMapRecommendation(
  preferences,
  places,
  previousPlaceId = null
) {
  const scoredPlaces = places
    .filter((place) => place.id !== previousPlaceId)
    .map((place) => ({
      ...place,
      score: scorePlace(place, preferences),
    }))
    .sort((a, b) => b.score - a.score);

  if (scoredPlaces.length === 0) {
    return null;
  }

  // Take the strongest candidates.
  const topScore = scoredPlaces[0].score;

  const strongMatches = scoredPlaces.filter(
    (place) => place.score >= topScore - 2
  );

  // Randomly choose from strong matches.
  const randomIndex = Math.floor(
    Math.random() * strongMatches.length
  );

  return strongMatches[randomIndex];
}

export {
  scorePlace,
  getOffMapRecommendation,
};





