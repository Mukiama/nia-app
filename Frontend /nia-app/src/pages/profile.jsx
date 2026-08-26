import { useState } from "react";
import { useNavigate } from "react-router-dom";
import places from "../data/places.js";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();

  
  const storedUser = localStorage.getItem("niaUser");
  const user = storedUser
    ? JSON.parse(storedUser)
    : { name: "Guest User", email: "guest@nia.app" };

  // Turns a full name into initials, e.g. "Ted Karani" -> "TK"
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const initials = getInitials(user.name);

 
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
}

  function handleLogout() {
    localStorage.removeItem("niaUser");
    window.location.href = "/login";
  }

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-header-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      {/* INTERESTS */}
      <div className="profile-section">
        <h2>Interests</h2>
        <p className="profile-section-subtitle">
          Pick what you're into — this helps Nia recommend better matches.
        </p>
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

      {/* BUDGET */}
      <div className="profile-section">
        <h2>Usual Budget</h2>
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

      {/* COMPANY */}
      <div className="profile-section">
        <h2>Usually Exploring With</h2>
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

      {/* SAVED PLACES */}
      
      <div className="profile-section">
        <h2>Saved Places</h2>
        <p className="profile-section-subtitle">
          Click a place to view it, or remove it from your saved list.
        </p>
        {savedPlaces.length === 0 ? (
          <div className="empty-state">
  <p style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>🗺️</p>
  <p style={{ margin: 0 }}>
    You haven't saved any places yet. Explore Nia and tap the save icon on places you love.
  </p>
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
      <div className="profile-section">
        <h2>Recent Visits</h2>
        <p className="profile-section-subtitle">
          Sample data for now — real visit history will show here once tracking is connected.
        </p>
        <div className="profile-card-grid">
          {recentVisitsDemo.map((place) => (
            <div
              key={place.id}
              className="profile-place-card"
              onClick={() => goToPlace(place)}
            >
              <span className="demo-badge">DEMO</span>
              <img src={place.image} alt={place.name} />
              <div className="profile-place-content">
                <h3>{place.name}</h3>
                <p>{place.category} · {place.county}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="profile-section">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSave}>
          <div className="profile-form-field">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="profile-form-field">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="profile-form-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="profile-save-btn">
            Save Changes
          </button>
          {passwordMessage && <p className="profile-save-note">{passwordMessage}</p>}
        </form>
      </div>

      {/* LOGOUT */}
      <button type="button" className="profile-logout-btn" onClick={handleLogout}>
        Log Out
      </button>

    </div>
  );
}