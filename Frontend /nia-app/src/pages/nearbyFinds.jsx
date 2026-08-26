import { useEffect, useState } from "react";

const nearbyPlaces = [
  {
    id: 1,
    name: "Karura Forest",
    category: "Nature",
    location: "Karura, Nairobi",
    description:
      "A peaceful green escape with forest trails, waterfalls, and beautiful spaces to explore.",
    latitude: -1.2466,
    longitude: 36.8347,
  },
  {
    id: 2,
    name: "Nairobi Arboretum",
    category: "Nature",
    location: "Kileleshwa, Nairobi",
    description:
      "A calm green space perfect for walking, relaxing, and getting away from the city.",
    latitude: -1.2728,
    longitude: 36.8021,
  },
  {
    id: 3,
    name: "Nairobi National Museum",
    category: "Culture",
    location: "Museum Hill, Nairobi",
    description:
      "Explore Kenya's history, art, culture, and natural heritage.",
    latitude: -1.268,
    longitude: 36.8111,
  },
  {
    id: 4,
    name: "Ngong Hills",
    category: "Adventure",
    location: "Ngong, Kajiado",
    description:
      "Take in sweeping views and beautiful walking trails across the hills.",
    latitude: -1.386,
    longitude: 36.656,
  },
];

/* =========================================
   DISTANCE CALCULATION
========================================= */

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

/* =========================================
   NEARBY FINDS
========================================= */

function NearbyFinds() {
  const [status, setStatus] = useState("loading");
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
          latitude,
          longitude,
        });

        const placesWithDistance = nearbyPlaces
          .map((place) => ({
            ...place,
            distance: calculateDistance(
              latitude,
              longitude,
              place.latitude,
              place.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPlaces(placesWithDistance);
        setStatus("success");
      },
      () => {
        setStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const retryLocation = () => {
    window.location.reload();
  };

  return (
    <main className="nearby-finds-page">
      <section className="nearby-finds-container">

        {/* HEADER */}

        <div className="nearby-finds-header">
          <p className="nearby-finds-eyebrow">
            DISCOVER NEARBY
          </p>

          <h1>Nearby Finds</h1>

          <p>
            Discover interesting places around you.
          </p>
        </div>

        {/* LOADING */}

        {status === "loading" && (
          <div className="nearby-state-card">
            <div className="nearby-loading-icon">
              📍
            </div>

            <h2>
              Finding places near you...
            </h2>

            <p>
              Nia is checking your location to find nearby places.
            </p>
          </div>
        )}

        {/* LOCATION DENIED */}

        {status === "denied" && (
          <div className="nearby-state-card">
            <div className="nearby-loading-icon">
              📍
            </div>

            <h2>
              We couldn't find your location
            </h2>

            <p>
              Please allow location access in your browser so Nia
              can show you places nearby.
            </p>

            <button
              type="button"
              className="nearby-location-button"
              onClick={retryLocation}
            >
              Try Again
            </button>
          </div>
        )}

        {/* LOCATION UNSUPPORTED */}

        {status === "unsupported" && (
          <div className="nearby-state-card">
            <div className="nearby-loading-icon">
              📍
            </div>

            <h2>
              Location isn't available
            </h2>

            <p>
              Your browser doesn't support location services.
            </p>
          </div>
        )}

        {/* RESULTS */}

        {status === "success" && (
          <>
            <div className="nearby-location-bar">
              <span className="nearby-location-dot">
                ●
              </span>

              <span>
                Showing places near you
              </span>
            </div>

            <div className="nearby-results-header">
              <h2>
                Places near you
              </h2>

              <p>
                Based on your current location
              </p>
            </div>

            <div className="nearby-places-grid">
              {places.map((place) => (
                <article
                  className="nearby-place-card"
                  key={place.id}
                >
                  <div className="nearby-place-placeholder">
                    <span>📍</span>
                  </div>

                  <div className="nearby-place-content">
                    <p className="nearby-place-category">
                      {place.category}
                    </p>

                    <h3>
                      {place.name}
                    </h3>

                    <p className="nearby-place-location">
                      {place.location}
                    </p>

                    <p className="nearby-place-description">
                      {place.description}
                    </p>

                    <div className="nearby-place-footer">
                      <span>
                        {place.distance < 1
                          ? `${Math.round(place.distance * 1000)} m away`
                          : `${place.distance.toFixed(1)} km away`}
                      </span>

                      <span className="nearby-place-arrow">
                        ↗
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
}

export default NearbyFinds;