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

        {/* EXPLORE */}
        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/discover">Discover</Link>
          <Link to="/nearby">NearMe</Link>
          <Link to="/map">Interactive Map</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/surprise">Surprise Me</Link>

        </div>

        {/* BUSINESS */}
        <div className="footer-column">

          <h3>For Businesses</h3>

          <Link to="/business">List Your Business</Link>
          <Link to="/business">Add a Place</Link>
          <Link to="/business">Claim Your Listing</Link>

          <p className="footer-business-text">
            Have a place worth discovering?
          </p>

        </div>

        {/* NIA */}
        <div className="footer-column">

          <h3>Nia</h3>

          <Link to="/about">About Nia</Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Create an Account</Link>
          <Link to="/contact">Contact Us</Link>

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