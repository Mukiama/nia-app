import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authFetch } from "../api/client";

import "../styles/placeDetail.css";

export default function PlaceDetails() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [visited, setVisited] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlace() {
      try {
        setLoading(true);
        setError("");

        const response = await authFetch(`/places/${id}`);

        if (!response.ok) {
          throw new Error("Place not found.");
        }

        const data = await response.json();
        setPlace(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlace();
  }, [id]);

  useEffect(() => {
    async function checkStatus() {
      try {
        const [favouritesResponse, historyResponse] = await Promise.all([
          authFetch("/favourites"),
          authFetch("/history"),
        ]);

        const favourites = await favouritesResponse.json();
        const history = await historyResponse.json();

        setLiked(favourites.some((item) => String(item.placeId) === String(id)));
        setVisited(history.some((item) => String(item.placeId) === String(id)));
      } catch (err) {
        console.error("Could not check place status:", err);
      }
    }

    if (id) checkStatus();
  }, [id]);

  async function handleLike() {
    if (!place || actionLoading) return;

    try {
      setActionLoading(true);

      if (liked) {
        const response = await authFetch("/favourites");
        const favourites = await response.json();
        const match = favourites.find(
          (item) => String(item.placeId) === String(place.id)
        );

        if (match) {
          await authFetch(`/favourites/${match.id}`, { method: "DELETE" });
        }

        setLiked(false);
      } else {
        await authFetch("/favourites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeId: place.id }),
        });

        setLiked(true);
      }
    } catch (err) {
      setError("Could not update favourite.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleVisited() {
    if (!place || actionLoading || visited) return;

    try {
      setActionLoading(true);

      await authFetch("/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: place.id }),
      });

      setVisited(true);
    } catch (err) {
      setError("Could not mark place as visited.");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="place-details-page">
        <div className="place-details-loading">Loading place...</div>
      </main>
    );
  }

  if (error || !place) {
    return (
      <main className="place-details-page">
        <div className="place-details-error">
          <h1>Place not found</h1>
          <p>{error || "We couldn't find this place."}</p>
          <Link to="/places">Back to places</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="place-details-page">
      <section className="place-details-hero">
        <img src={place.image} alt={place.name} />
        <div className="place-details-overlay">
          <Link to="/filter" className="back-link">
            ← Back to places
          </Link>
        </div>
      </section>

      <section className="place-details-content">
        <div className="place-details-main">
          <p className="place-details-category">{place.category}</p>
          <h1>{place.name}</h1>
          <p className="place-details-location">
            {place.location}, {place.county}, Kenya
          </p>
          <p className="place-details-description">{place.description}</p>

          <div className="place-details-actions">
            <button
              type="button"
              className={liked ? "details-action liked" : "details-action"}
              onClick={handleLike}
              disabled={actionLoading}
            >
              {liked ? "♥ Liked" : "♡ Like"}
            </button>

            <button
              type="button"
              className={visited ? "details-action visited" : "details-action"}
              onClick={handleVisited}
              disabled={actionLoading || visited}
            >
              {visited ? "✓ Visited" : "Mark as visited"}
            </button>
          </div>
        </div>

        <aside className="place-details-info">
          <div>
            <span>LOCATION</span>
            <strong>{place.location}</strong>
          </div>
          <div>
            <span>COUNTY</span>
            <strong>{place.county}</strong>
          </div>
          <div>
            <span>OPENING HOURS</span>
            <strong>{place.openingHours || "Not available"}</strong>
          </div>
          <div>
            <span>ENTRY FEE</span>
            <strong>{place.entryFee || "Not available"}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}