import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch, getUser, clearAuth } from "../api/client";

import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = getUser() || { name: "Guest User", email: "guest@nia.app" };

  function getInitials(name) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  const initials = getInitials(user.name);

  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [recentVisits, setRecentVisits] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadProfileData() {
      try {
        setIsLoading(true);
        setLoadError("");

        const [favouritesRes, historyRes] = await Promise.all([
          authFetch("/favourites"),
          authFetch("/history"),
        ]);

        if (!favouritesRes.ok || !historyRes.ok) {
          throw new Error("Failed to load profile data.");
        }

        const favouritesData = await favouritesRes.json();
        const historyData = await historyRes.json();

        setSavedPlaces(favouritesData);
        setRecentVisits(historyData);
      } catch (err) {
        setLoadError("Could not load your saved places right now.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const allInterests = ["Nature", "Culture", "Food", "Art", "Adventure", "Nightlife"];
  const [interests, setInterests] = useState(["Nature", "Culture"]);

  function toggleInterest(interest) {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  }

  const budgetOptions = ["Low", "Moderate", "High"];
  const [budget, setBudget] = useState("Moderate");

  const companyOptions = ["Alone", "Friends", "Family", "Partner"];
  const [company, setCompany] = useState("Friends");

  const countiesExplored = useMemo(() => {
    return new Set(savedPlaces.map((place) => place.county)).size;
  }, [savedPlaces]);

  const favoriteStat = useMemo(() => {
    if (savedPlaces.length === 0) return null;

    function mostCommon(list) {
      const counts = {};
      list.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    }

    const topCategory = mostCommon(savedPlaces.map((p) => p.category));
    const topCounty = mostCommon(savedPlaces.map((p) => p.county));
    return `${topCategory} spots in ${topCounty}`;
  }, [savedPlaces]);

  const travelStyle = useMemo(() => {
    const isAdventurous = interests.includes("Adventure");
    const isFoodie = interests.includes("Food");
    const isCultural = interests.includes("Culture");
    const isNightOwl = interests.includes("Nightlife");

    if (budget === "Low" && (isAdventurous || company === "Friends")) return "Budget Adventurer";
    if (budget === "High" && company === "Partner") return "Luxury Wanderer";
    if (isFoodie && company === "Friends") return "Food Trail Explorer";
    if (isCultural && company === "Alone") return "Solo Culture Seeker";
    if (isNightOwl) return "City Nightlifer";
    if (company === "Family") return "Family Trip Planner";
    if (isAdventurous) return "Adventure Chaser";
    return "Curious Explorer";
  }, [budget, company, interests]);

  async function removeSavedPlace(id, event) {
    event.stopPropagation();

    try {
      await authFetch(`/favourites/${id}`, { method: "DELETE" });
      setSavedPlaces((prev) => prev.filter((place) => place.id !== id));
    } catch (err) {
      setToast({ type: "error", message: "Could not remove that place." });
    }
  }

  function goToPlace(place) {
    navigate(`/places/${place.placeId}`);
  }

  function handleLogout() {
    clearAuth();
    window.location.href = "/";
  }

  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareText = `My Nia travel stats \n${savedPlaces.length} places saved · ${countiesExplored} counties explored · ${travelStyle}`;

  async function handleCopyShare() {
    try {
      await navigator.clipboard.writeText(shareText);
      setToast({ type: "success", message: "Copied to clipboard." });
    } catch {
      setToast({ type: "error", message: "Couldn't copy — copy it manually instead." });
    }
  }

  return (
    <div className="profile-page">
      {/* TOAST */}
      {toast && (
        <div className={`profile-toast profile-toast--${toast.type}`} role="status">
          {toast.type === "success" ? "✓" : "!"} {toast.message}
        </div>
      )}

      {/* HERO */}
      {isLoading ? (
        <div className="profile-hero profile-hero--skeleton">
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton skeleton-line" style={{ width: "40%" }} />
          <div className="skeleton skeleton-line" style={{ width: "60%" }} />
        </div>
      ) : (
        <div className="profile-hero">
          <div className="profile-hero-top">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-header-info">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <span className="travel-style-badge">{travelStyle}</span>
            </div>
          </div>

          <div className="profile-stat-row">
            <div className="profile-stat">
              <span className="profile-stat-value">{savedPlaces.length}</span>
              <span className="profile-stat-label">Places saved</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span className="profile-stat-value">{countiesExplored}</span>
              <span className="profile-stat-label">Counties explored</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span className="profile-stat-value">{interests.length}</span>
              <span className="profile-stat-label">Interests picked</span>
            </div>
          </div>

          <div className="profile-hero-footer">
            {favoriteStat && <p className="profile-favorite-stat">Most saved: {favoriteStat}</p>}
            <button type="button" className="profile-share-btn" onClick={() => setIsShareOpen(true)}>
              Share your stats
            </button>
          </div>
        </div>
      )}

      {/* TRAVEL PREFERENCES — interests, budget, company consolidated */}
      <div className="profile-section">
        <h2>Travel Preferences</h2>
        <p className="profile-section-subtitle">
          Tell us what you're into — helps shape your OffMap picks.
        </p>

        <div className="preference-group">
          <h3>Interests</h3>
          <div className="pill-group">
            {allInterests.map((interest) => (
              <button
                key={interest}
                type="button"
                className={interests.includes(interest) ? "active" : ""}
                onClick={() => toggleInterest(interest)}
                aria-label={`Toggle interest: ${interest}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="preference-divider" />

        <div className="preference-group">
          <h3>Usual budget</h3>
          <div className="pill-group">
            {budgetOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={budget === option ? "active" : ""}
                onClick={() => setBudget(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="preference-divider" />

        <div className="preference-group">
          <h3>Usually exploring with</h3>
          <div className="pill-group">
            {companyOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={company === option ? "active" : ""}
                onClick={() => setCompany(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SAVED PLACES */}
      <div className="profile-section">
        <div className="profile-section-heading-row">
          <div>
            <h2>Saved Places</h2>
            <p className="profile-section-subtitle">
              Tap a place to view it, or remove it from your saved list.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="profile-card-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : loadError ? (
          <div className="empty-state">
            <p>{loadError}</p>
          </div>
        ) : savedPlaces.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-icon">🗺️</p>
            <p>You haven't saved any places yet. Explore Nia and tap the save icon on places you love.</p>
          </div>
        ) : (
          <div className="profile-card-grid">
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="profile-place-card"
                onClick={() => goToPlace(place)}
              >
                <button
                  className="remove-saved-btn"
                  onClick={(event) => removeSavedPlace(place.id, event)}
                  aria-label={`Remove ${place.name} from saved places`}
                >
                  ×
                </button>
                <img src={place.image} alt={place.name} />
                <div className="profile-place-content">
                  <h3>{place.name}</h3>
                  <p>{place.category} · {place.county}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT VISITS */}
      <div className="profile-section">
        <h2>Recent Visits</h2>
        <p className="profile-section-subtitle">
          Places you've recently viewed.
        </p>
        {isLoading ? (
          <div className="profile-card-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : recentVisits.length === 0 ? (
          <div className="empty-state">
            <p>No visits yet — explore places on Nia to see them here.</p>
          </div>
        ) : (
          <div className="profile-card-grid">
            {recentVisits.map((place) => (
              <div key={place.id} className="profile-place-card">
                <img src={place.image} alt={place.name} />
                <div className="profile-place-content">
                  <h3>{place.name}</h3>
                  <p>{place.category} · {place.county}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCOUNT — read-only info + logout */}
      <div className="profile-account-zone">
        <h2>Account</h2>

        <div className="profile-account-side-block">
          <h3>Session</h3>
          <p>Signed in as {user.email}</p>
          <button type="button" className="profile-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {/* SHARE STATS MODAL */}
      {isShareOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsShareOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Share your stats</h3>
            <div className="share-card">
              <p className="share-card-title">{user.name}'s Nia stats</p>
              <div className="share-card-stats">
                <div>
                  <span className="share-card-value">{savedPlaces.length}</span>
                  <span className="share-card-label">Places saved</span>
                </div>
                <div>
                  <span className="share-card-value">{countiesExplored}</span>
                  <span className="share-card-label">Counties explored</span>
                </div>
              </div>
              <p className="share-card-style">{travelStyle}</p>
            </div>
            <div className="profile-modal-actions">
              <button type="button" className="profile-modal-cancel" onClick={() => setIsShareOpen(false)}>
                Close
              </button>
              <button type="button" className="profile-save-btn" onClick={handleCopyShare}>
                Copy to clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}