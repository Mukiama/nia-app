function scorePlace(place, preferences) {
  let score = 0;

  // MOOD
  if (
    preferences.mood &&
    preferences.mood !== "surprise" &&
    place.moods?.includes(preferences.mood)
  ) {
    score += 3;
  }

  // WHO
  if (
    preferences.who &&
    preferences.who !== "surprise" &&
    place.suitableFor?.includes(preferences.who)
  ) {
    score += 3;
  }

  // BUDGET
  if (
    preferences.budget &&
    preferences.budget !== "surprise"
  ) {
    if (
      preferences.budget === "free" &&
      place.priceLevel === 0
    ) {
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

    if (preferences.time === "whole-day") {
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

  const topScore = scoredPlaces[0].score;

  const strongMatches = scoredPlaces.filter(
    (place) => place.score >= topScore - 2
  );

  const randomIndex = Math.floor(
    Math.random() * strongMatches.length
  );

  return strongMatches[randomIndex];
}


/*
 * WILDCARD
 *
 * Wildcard intentionally breaks the user's
 * budget preference while keeping the other
 * preferences as close as possible.
 */
function getOffMapWildcard(
  preferences,
  places,
  previousPlaceId = null
) {
  const candidates = places
    .filter((place) => place.id !== previousPlaceId)
    .map((place) => {
      let score = 0;

      // Keep MOOD
      if (
        preferences.mood &&
        preferences.mood !== "surprise" &&
        place.moods?.includes(preferences.mood)
      ) {
        score += 3;
      }

      // Keep WHO
      if (
        preferences.who &&
        preferences.who !== "surprise" &&
        place.suitableFor?.includes(preferences.who)
      ) {
        score += 3;
      }

      // Keep TIME
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

        if (preferences.time === "whole-day") {
          score += 2;
        }
      }

      // Keep DISTANCE
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

      return {
        ...place,
        score,
      };
    });

  if (candidates.length === 0) {
    return null;
  }


  /*
   * Find places that actually BREAK
   * the selected budget.
   */
  const wildcardCandidates = candidates.filter((place) => {
    if (preferences.budget === "free") {
      return place.priceLevel > 0;
    }

    if (preferences.budget === "under-500") {
      return place.priceLevel > 0;
    }

    if (preferences.budget === "500-1500") {
      return place.priceLevel > 1;
    }

    if (preferences.budget === "1500-3000") {
      return place.priceLevel > 2;
    }

    if (preferences.budget === "treat") {
      return true;
    }

    return true;
  });


  /*
   * If we found places that actually
   * break the budget, use those.
   *
   * Otherwise fall back to all candidates.
   */
  const availableCandidates =
    wildcardCandidates.length > 0
      ? wildcardCandidates
      : candidates;


  availableCandidates.sort(
    (a, b) => b.score - a.score
  );

  const topScore = availableCandidates[0].score;

  const strongCandidates =
    availableCandidates.filter(
      (place) => place.score >= topScore - 2
    );


  const randomIndex = Math.floor(
    Math.random() * strongCandidates.length
  );

  return {
    ...strongCandidates[randomIndex],
    wildcardRule: "budget",
  };
}


export {
  scorePlace,
  getOffMapRecommendation,
  getOffMapWildcard,
};