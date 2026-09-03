
const MOOD_KEYWORDS = {
  escape: ["nature", "forest", "park", "wildlife"],
  romance: ["culture", "landmark", "art", "museum"],
  fun: ["entertainment", "shopping", "recreation"],
  adventure: ["wildlife", "hiking", "nature", "national park"],
  treat: ["shopping", "culture", "entertainment"],
  explore: ["museum", "history", "landmark", "monument"],
  night: ["entertainment", "shopping"],
};

function matchesMood(place, mood) {
  if (!mood || mood === "surprise") return true;

  const keywords = MOOD_KEYWORDS[mood] || [];
  const category = (place.category || "").toLowerCase();

  return keywords.some((keyword) => category.includes(keyword));
}

function scorePlace(place, preferences) {
  return matchesMood(place, preferences.mood) ? 1 : 0;
}

function pickFrom(candidates) {
  if (candidates.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

function getOffMapRecommendation(preferences, places, previousPlaceId = null) {
  const pool = places.filter((place) => place.id !== previousPlaceId);

  const moodMatches = pool.filter((place) =>
    matchesMood(place, preferences.mood)
  );

  const candidates = moodMatches.length > 0 ? moodMatches : pool;

  return pickFrom(candidates);
}

/*
 * WILDCARD
 *
 * Wildcard intentionally ignores the user's mood answer and picks
 * from places that did NOT match it, for a genuine surprise pick.
 */
function getOffMapWildcard(preferences, places, previousPlaceId = null) {
  const pool = places.filter((place) => place.id !== previousPlaceId);

  const nonMatches = pool.filter(
    (place) => !matchesMood(place, preferences.mood)
  );

  const candidates = nonMatches.length > 0 ? nonMatches : pool;

  const picked = pickFrom(candidates);

  return picked ? { ...picked, wildcardRule: "mood" } : null;
}

export { scorePlace, getOffMapRecommendation, getOffMapWildcard };