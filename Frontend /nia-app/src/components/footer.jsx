import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span className="nia-mark">✦</span>
            Nia
          </Link>

          <p>
            Discover Nairobi differently.
          </p>

          <p className="footer-tagline">
            Find hidden places, unique experiences,
            and something new around every corner.
          </p>

        </div>

        {/* DISCOVER */}
        <div className="footer-column">

          <h3>Discover</h3>

          <Link to="/hidden-gems">Hidden Gems</Link>
          <Link to="/nia-picks">Nia Picks</Link>
          <Link to="/new-places">New Places</Link>
          <Link to="/add-place">Add a Place</Link>

        </div>

        {/* FOR BUSINESSES */}
        <div className="footer-column">

          <h3>For Businesses</h3>

          <Link to="/business">List Your Business</Link>
          <Link to="/claim-listing">Claim Your Listing</Link>
          <Link to="/business/dashboard">Business Dashboard</Link>

        </div>

        {/* ABOUT NIA */}
        <div className="footer-column">

          <h3>About Nia</h3>

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/community-guidelines">
            Community Guidelines
          </Link>

        </div>

      </div>

      {/* SOCIAL MEDIA */}
      <div className="footer-social">

        <div>
          <h3>Follow Nia</h3>

          <p>
            Discover more places with us.
          </p>
        </div>

        <div className="social-links">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nia on Instagram"
          >
            Instagram
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nia on TikTok"
          >
            TikTok
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nia on Facebook"
          >
            Facebook
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nia on X"
          >
            X
          </a>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 Nia. Discover something new.
        </p>

        <div className="footer-legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;