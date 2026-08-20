function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <a href="/" className="navbar-logo">
          <span className="nia-mark">✦</span>
          <span>Nia</span>
        </a>

        {/* MAIN NAVIGATION */}
        <nav className="navbar-links">

          {/* DISCOVER */}
          <div className="nav-dropdown">
            <button className="nav-link">
              Discover
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu discover-menu">
              <div>
                <p className="dropdown-title">DISCOVER</p>
                <a href="/">Hidden Gems</a>
                <a href="/">Nia Picks</a>
                <a href="/">New Places</a>
              </div>

              <div>
                <p className="dropdown-title">EXPLORE</p>
                <a href="/">Popular Places</a>
                <a href="/">Surprise Me</a>
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="nav-dropdown">
            <button className="nav-link">
              Explore
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu">
              <a href="/">Near Me</a>
              <a href="/">Interactive Map</a>
              <a href="/">OffMap</a>
              <a href="/">Recently Added</a>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="nav-dropdown">
            <button className="nav-link">
              Categories
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu categories-menu">
              <a href="/">📸 Photography</a>
              <a href="/">🌿 Nature</a>
              <a href="/">☕ Food</a>
              <a href="/">🎨 Art</a>
              <a href="/">🏛️ History</a>
              <a href="/">👨‍👩‍👧 Family</a>
              <a href="/">🥾 Adventure</a>
              <a href="/">🌙 Nightlife</a>
            </div>
          </div>

        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          <a href="/business" className="navbar-action business-link">
            List Your Business
          </a>

          {/* ACCOUNT */}
          <div className="profile-menu">

            <button
              type="button"
              className="nav-link profile-button"
              aria-label="Account"
            >
              <svg
                className="profile-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
              </svg>
            </button>

            <div className="profile-dropdown">
              <a href="/login">Log in</a>
              <a href="/signup">Sign up</a>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;