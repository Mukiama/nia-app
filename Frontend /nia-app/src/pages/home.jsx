import Navbar from "../components/navbar";
import Hero from "../components/hero";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="interests-section">
          <div className="section-container">
            <p className="section-eyebrow">START EXPLORING</p>

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

        <section className="picks-section">
          <div className="section-container">
            <p className="section-eyebrow">DISCOVER</p>

            <h2>Nia Picks</h2>

            <p>
              Interesting places we think you'll love.
            </p>

            {/* PlaceCards */}
          </div>
        </section>

        <section className="offmap-section">
          <div className="section-container">
            <p className="section-eyebrow">GO OFFMAP</p>

            <h2>Discover somewhere unexpected.</h2>

            <p>
              Skip the usual spots and discover somewhere
              you wouldn't normally think to visit.
            </p>

            <button>Explore OffMap</button>
          </div>
        </section>

        <section className="business-section">
          <div className="section-container">
            <h2>Own a hidden gem?</h2>

            <p>
              Help people discover your business on Nia.
            </p>

            <button>List Your Business</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;