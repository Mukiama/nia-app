import { Link } from "react-router-dom";

function Topbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <span className="nia-mark">✦</span>
          <span>Nia</span>
        </Link>

        {/* MAIN NAVIGATION */}
        {/* <nav className="navbar-links">

            
          <div className="nav-dropdown">
            <button className="nav-link" type="button">
              Discover
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu discover-menu">
              <div>
                <p className="dropdown-title">DISCOVER</p>

                <Link to="/hidden-gems">Hidden Gems</Link>
                <Link to="/nia-picks">Nia Picks</Link>
                <Link to="/new-places">New Places</Link>
              </div>

              <div>
                <p className="dropdown-title">EXPLORE</p>

                <Link to="/popular-places">Popular Places</Link>
                <Link to="/surprise-me">Surprise Me</Link>
              </div>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-link" type="button">
              Explore
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu">
              <Link to="/near-me">Near Me</Link>
              <Link to="/map">Interactive Map</Link>
              <Link to="/offmap">OffMap</Link>
              <Link to="/recently-added">Recently Added</Link>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-link" type="button">
              Categories
              <span className="nav-arrow">⌄</span>
            </button>

            <div className="dropdown-menu categories-menu">
              <Link to="/categories/photography">
                📸 Photography
              </Link>

              <Link to="/categories/nature">
                🌿 Nature
              </Link>

              <Link to="/categories/food">
                ☕ Food
              </Link>

              <Link to="/categories/art">
                🎨 Art
              </Link>

              <Link to="/categories/culture">
                🏛️ Culture
              </Link>

              <Link to="/categories/family">
                👨‍👩‍👧 Family
              </Link>

              <Link to="/categories/adventure">
                🥾 Adventure
              </Link>

              <Link to="/categories/nightlife">
                🌙 Nightlife
              </Link>
            </div>
          </div>

        </nav> */}
        
        {/* SEARCH */}
        {/* <div className="navbar-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search places..."
            aria-label="Search places"
          />
        </div> */}


        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          <Link
            to="/signup"
            className="navbar-action business-link"
          >
            GET STARTED
          </Link>

          {/* <Link
            to="/business"
            className="navbar-action business-link"
          >
            List Your Business
          </Link> */}

          {/* ACCOUNT */}
          {/* <div className="profile-menu">

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
               <Link to="/profile">My Profile</Link> 
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>

          </div> */}

        </div>

      </div>
    </header>
  );
}

export default Topbar;