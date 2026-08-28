import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/favourites.css";

const API_URL = "https://nia-app-ik4c.onrender.com/";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [removingId, setRemovingId] = useState(null);

  /* ================================
     FETCH FAVOURITES
  ================================= */

  useEffect(() => {
    async function loadFavourites() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/favourites`);

        if (!response.ok) {
          throw new Error("Failed to load favourites.");
        }

        const data = await response.json();

        setFavourites(data);
      } catch (err) {
        setError(
          "Could not load favourites. Make sure the mock API is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFavourites();
  }, []);

  /* ================================
     REMOVE FAVOURITE
  ================================= */

  async function handleRemove(favouriteId) {
    if (removingId) {
      return;
    }

    try {
      setRemovingId(favouriteId);

      await fetch(`${API_URL}/favourites/${favouriteId}`, {
        method: "DELETE",
      });

      setFavourites((prev) =>
        prev.filter((item) => item.id !== favouriteId)
      );
    } catch (err) {
      setError("Could not remove favourite.");
    } finally {
      setRemovingId(null);
    }
  }

  /* ================================
     RENDER
  ================================= */

  return (
    <main className="favourites-page">

      <section className="favourites-hero">
        <p className="favourites-eyebrow">YOUR LIST</p>
        <h1>Favourites</h1>
        <p className="favourites-description">
          Places you've saved to come back to.
        </p>
      </section>

      <section className="favourites-section">

        {loading && (
          <div className="status-message">
            Loading favourites...
          </div>
        )}

        {!loading && error && (
          <div className="status-message error">
            {error}
          </div>
        )}

        {!loading && !error && favourites.length === 0 && (
          <div className="empty-state">
            <h3>No favourites yet</h3>
            <p>
              Places you like will show up here.{" "}
              <Link to="/filter">Browse places</Link>
            </p>
          </div>
        )}

        {!loading && !error && favourites.length > 0 && (
          <div className="places-grid">
            {favourites.map((item) => (
              <div className="place-card" key={item.id}>
                <Link to={`/places/${item.placeId}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="place-card-image"
                  />

                  <div className="place-card-content">
                    <p className="place-category">
                      {item.category}
                    </p>

                    <h2>{item.name}</h2>

                    <p className="place-location">
                      {item.county}, Kenya
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  className="remove-favourite"
                  onClick={() => handleRemove(item.id)}
                  disabled={removingId === item.id}
                >
                  {removingId === item.id
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            ))}
          </div>
        )}

      </section>

    </main>
  );
}