import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import places from "../data/places.js";
import { getUser, clearAuth } from "../api/client";

import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = getUser() || { name: "Guest User", email: "guest@nia.app" };

  // Turns a full name into initials, e.g. "Ted Karani" -> "TK"
  function getInitials(name) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  // Local display copies of name/email — editing these does NOT touch
  // getUser()/auth, so nothing else in the app that reads the real user
  // object is affected. Not persisted anywhere yet (no backend for it).
  const [displayName, setDisplayName] = useState(user.name);
  const [displayEmail, setDisplayEmail] = useState(user.email);
  const initials = getInitials(displayName);

  // ---------- brief skeleton loading state (cosmetic, mount-only) ----------
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  // ---------- toast ----------
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // ---------- edit profile modal ----------
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editEmail, setEditEmail] = useState(displayEmail);

  function openEdit() {
    setEditName(displayName);
    setEditEmail(displayEmail);
    setIsEditOpen(true);
  }

  function handleEditSave(event) {
    event.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      setToast({ type: "error", message: "Name and email can't be empty." });
      return;
    }
    setDisplayName(editName.trim());
    setDisplayEmail(editEmail.trim());
    setIsEditOpen(false);
    setToast({ type: "success", message: "Profile updated." });
  }

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

  const [savedPlaceIds, setSavedPlaceIds] = useState(
    places.slice(0, 3).map((place) => place.id)
  );

  const savedPlaces = places.filter((place) => savedPlaceIds.includes(place.id));

  // Live stat for the hero banner — real count of distinct counties saved
  const countiesExplored = useMemo(() => {
    return new Set(savedPlaces.map((place) => place.county)).size;
  }, [savedPlaces]);

  // Most-saved category and county, purely computed from real saved places
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

  // Fun label derived from existing preference state — no fake data
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

  function removeSavedPlace(id, event) {
    event.stopPropagation(); // don't trigger the card's own click (navigation)
    setSavedPlaceIds(savedPlaceIds.filter((savedId) => savedId !== id));
  }

  function goToPlace(place) {
    navigate("/places", { state: { place } });
  }

  const recentVisitsDemo = places.slice(1, 4);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  function handlePasswordSave(event) {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMessage("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation don't match.");
      return;
    }
    setPasswordMessage("Password changes will be enabled once the backend is ready.");
    setToast({ type: "success", message: "Password form validated." });
  }

  function handleLogout() {
    clearAuth();
    window.location.href = "/";
  }

  // ---------- share stats ----------
  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareText = `My Nia travel stats 🌍\n${savedPlaces.length} places saved · ${countiesExplored} counties explored · ${travelStyle}`;

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
          <button type="button" className="profile-edit-btn" onClick={openEdit} aria-label="Edit profile">
            ✎
          </button>

          <div className="profile-hero-top">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-header-info">
              <h1>{displayName}</h1>
              <p>{displayEmail}</p>
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
          This is what Nia uses to recommend better matches — update it any time.
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
          <Link to="/add-place" className="profile-add-link">
            + Add a place
          </Link>
        </div>

        {isLoading ? (
          <div className="profile-card-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
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

      {/* RECENT VISITS — demo only for now */}
      <div className="profile-section profile-section--preview">
        <h2>Recent Visits</h2>
        <p className="profile-section-subtitle">
          Preview data — your real visit history will show here once tracking is connected.
        </p>
        <div className="profile-card-grid">
          {recentVisitsDemo.map((place) => (
            <div key={place.id} className="profile-place-card profile-place-card--preview">
              <span className="preview-badge">Preview</span>
              <img src={place.image} alt={place.name} />
              <div className="profile-place-content">
                <h3>{place.name}</h3>
                <p>{place.category} · {place.county}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACCOUNT — password + logout, visually separated as a settings zone */}
      <div className="profile-account-zone">
        <h2>Account</h2>

        <div className="profile-account-grid">
          <form onSubmit={handlePasswordSave} className="profile-password-form">
            <h3>Change password</h3>
            <div className="profile-form-field">
              <label>Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="profile-form-field">
              <label>New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="profile-form-field">
              <label>Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="profile-save-btn">
              Save changes
            </button>
            {passwordMessage && <p className="profile-save-note">{passwordMessage}</p>}
          </form>

          <div className="profile-account-side">
            <div className="profile-account-side-block">
              <h3>Session</h3>
              <p>Signed in as {displayEmail}</p>
              <button type="button" className="profile-logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit profile</h3>
            <form onSubmit={handleEditSave}>
              <div className="profile-form-field profile-form-field--light">
                <label>Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="profile-form-field profile-form-field--light">
                <label>Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <p className="profile-modal-note">
                Changes are shown here only — syncing to your account will be enabled once the backend is ready.
              </p>
              <div className="profile-modal-actions">
                <button type="button" className="profile-modal-cancel" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="profile-save-btn">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHARE STATS MODAL */}
      {isShareOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsShareOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Share your stats</h3>
            <div className="share-card">
              <p className="share-card-title">{displayName}'s Nia stats</p>
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
