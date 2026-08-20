import Navbar from "../components/navbar";
import Hero from "../components/hero";

function Footer() {
  return (
    <footer className="footer">

      {/* FOOTER MAIN */}
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


function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        {/* INTERESTS */}
        <section className="interests-section">
          <div className="section-container">

            <p className="section-eyebrow">
              START EXPLORING
            </p>

            <h2>What are you into?</h2>

            <div className="interest-list">
              <button>📸 Photography</button>
              <button>🌿 Nature</button>
              <button>☕ Food</button>
              <button>🎨 Art</button>
              <button>🏛️ Culture</button>
              <button>👨‍👩‍👧 Family</button>
              <button>🥾 Adventure</button>
              <button>🌙 Nightlife</button>
            </div>

          </div>
        </section>


        {/* WHO ARE YOU WITH */}
        <section className="companions-section">
          <div className="section-container">

            <p className="section-eyebrow">
              MAKE IT PERSONAL
            </p>

            <h2>Who are you with?</h2>

            <p>
              Tell us who you're exploring with and we'll help
              you find places that fit.
            </p>

            <div className="companion-list">
              <button>🧍 Solo</button>
              <button>❤️ Partner</button>
              <button>👨‍👩‍👧 Family</button>
              <button>👯 Friends</button>
              <button>💼 Colleagues</button>
              <button>🎒 Kids</button>
            </div>

          </div>
        </section>


        {/* NIA PICKS */}
        <section className="picks-section">
          <div className="section-container">

            <p className="section-eyebrow">
              DISCOVER
            </p>

            <h2>Nia Picks</h2>

            <p>
              Interesting places we think you'll love.
            </p>

            {/* PlaceCards */}

          </div>
        </section>


        {/* OFFMAP */}
        <section className="offmap-section">
          <div className="section-container">

            <p className="section-eyebrow">
              OFFMAP
            </p>

            <h2>
              Discover somewhere unexpected.
            </h2>

            <p>
              Skip the usual spots and discover somewhere
              you wouldn't normally think to visit.
            </p>

            <button>
              Explore OffMap
            </button>

          </div>
        </section>


        {/* BUSINESS */}
        <section className="business-section">
          <div className="section-container">

            <h2>
              Own a hidden gem?
            </h2>

            <p>
              Help people discover your business on Nia.
            </p>

            <button>
              List Your Business
            </button>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </>
  );
}

export default Home;