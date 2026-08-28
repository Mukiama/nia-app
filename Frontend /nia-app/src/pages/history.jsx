import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/history.css";

const API_URL = "https://nia-app-ik4c.onrender.com";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadHistory() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/history`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load history."
        );
      }

      const data = await response.json();

      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function clearHistory() {
    try {
      await Promise.all(
        history.map((item) =>
          fetch(
            `${API_URL}/history/${item.id}`,
            {
              method: "DELETE",
            }
          )
        )
      );

      setHistory([]);
    } catch {
      setError(
        "Failed to clear history."
      );
    }
  }

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-container">
          <h1>History</h1>
          <p>Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-container">

        <div className="history-header">

          <div>
            <p className="history-label">
              NIA
            </p>

            <h1>Your History</h1>

            <p>
              Places you've marked as visited.
            </p>
          </div>

          {history.length > 0 && (
            <button
              className="clear-history"
              onClick={clearHistory}
            >
              Clear history
            </button>
          )}

        </div>


        {error && (
          <div className="history-error">
            {error}
          </div>
        )}


        {history.length === 0 && !error ? (
          <div className="empty-history">

            <h2>No history yet</h2>

            <p>
              Places you mark as visited
              will appear here.
            </p>

          </div>
        ) : (
          <div className="history-list">

            {history.map((item) => (
              <Link
                to={`/places/${item.placeId}`}
                className="history-card"
                key={item.id}
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="history-card-image"
                  />
                )}

                <div className="history-card-content">

                  <p className="history-category">
                    {item.category}
                  </p>

                  <h2>{item.name}</h2>

                  <p className="history-location">
                    {item.location},{" "}
                    {item.county}
                  </p>

                  <p className="history-description">
                    {item.description}
                  </p>

                  <small>
                    Visited{" "}
                    {item.viewedAt
                      ? new Date(
                          item.viewedAt
                        ).toLocaleString()
                      : "Recently"}
                  </small>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}