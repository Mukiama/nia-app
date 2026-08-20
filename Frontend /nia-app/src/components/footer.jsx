function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <a href="/" className="footer-logo">
            <span className="nia-mark">✦</span>
            nia
          </a>

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

          <a href="/discover">Discover</a>
          <a href="/nearby">Explore Nearby</a>
          <a href="/map">Interactive Map</a>
          <a href="/categories">Categories</a>
          <a href="/surprise">Surprise Me</a>

        </div>


        {/* BUSINESS */}
        <div className="footer-column">

          <h3>For Businesses</h3>

          <a href="/business">List Your Business</a>
          <a href="/business">Add a Place</a>
          <a href="/business">Claim Your Listing</a>

          <p className="footer-business-text">
            Have a place worth discovering?
          </p>

        </div>


        {/* NIA */}
        <div className="footer-column">

          <h3>Nia</h3>

          <a href="/about">About Nia</a>
          <a href="/login">Log in</a>
          <a href="/signup">Create an Account</a>
          <a href="/contact">Contact Us</a>

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
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;