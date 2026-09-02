import karuraImage from "../images/karura.jpg";
import museumImage from "../images/museum.jpg";
import ngongImage from "../images/ngong.jpg";
import arboretumImage from "../images/arboretum.jpg";

import "../styles/niaPicks.css";

const places = [
  {
    name: "Karura Forest",
    location: "Nairobi, Kenya",
    category: "NATURE",
    description:
      "Escape into one of Nairobi's most beautiful hidden spaces.",
    image: karuraImage,
  },
  {
    name: "Nairobi National Museum",
    location: "Nairobi, Kenya",
    category: "CULTURE",
    description:
      "Explore Kenya's history, art, culture, and natural heritage.",
    image: museumImage,
  },
  {
    name: "Ngong Hills",
    location: "Kajiado, Kenya",
    category: "ADVENTURE",
    description:
      "Take in sweeping views and beautiful walking trails.",
    image: ngongImage,
  },
  {
    name: "Nairobi Arboretum",
    location: "Nairobi, Kenya",
    category: "NATURE",
    description:
      "A peaceful green space perfect for walking and relaxing.",
    image: arboretumImage,
  },
];

const getDailyPick = (places) => {
  const today = new Date();

  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const difference = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(difference / oneDay);

  return places[dayOfYear % places.length];
};

function NiaPicks() {
  const dailyPick = getDailyPick(places);

  return (
    <main className="nia-picks-page">

      <section className="nia-picks-header">
        <div className="nia-picks-header-decoration">✦</div>

        <p className="nia-picks-eyebrow">
          NIA PICKS
        </p>

        <h1>
          Places worth knowing.
        </h1>

        <p className="nia-picks-intro">
          Handpicked places and experiences we think
          are worth discovering around Nairobi.
        </p>
      </section>

      <section className="nia-picks-featured">

        <div className="nia-picks-featured-image">
          <img
            src={dailyPick.image}
            alt={dailyPick.name}
          />

          <span className="nia-picks-tag">
            ✦ NIA PICK OF THE DAY
          </span>

          <span className="nia-picks-featured-category">
            {dailyPick.category}
          </span>
        </div>

        <div className="nia-picks-featured-content">

          <p className="nia-picks-location">
            {dailyPick.location}
          </p>

          <h2>
            {dailyPick.name}
          </h2>

          <p className="nia-picks-featured-description">
            {dailyPick.description}
          </p>

          <div className="nia-picks-featured-footer">
            <span>
              Curated by Nia
            </span>

            <span className="nia-picks-arrow">
              ↗
            </span>
          </div>

        </div>
      </section>

      <section className="nia-picks-list">

        <div className="nia-picks-list-header">

          <div>
            <p className="nia-picks-small-label">
              THE COLLECTION
            </p>

            <h2>
              More Nia Picks
            </h2>
          </div>

          <p>
            Places we're currently loving.
          </p>

        </div>

        <div className="nia-picks-grid">

          {places.map((place, index) => (
            <article
              className={`nia-pick-card nia-pick-card-${index + 1}`}
              key={place.name}
            >

              <div className="nia-pick-card-image">

                <img
                  src={place.image}
                  alt={place.name}
                />

                <span className="nia-pick-card-category">
                  {place.category}
                </span>

              </div>

              <div className="nia-pick-card-content">

                <p className="nia-pick-card-location">
                  {place.location}
                </p>

                <h3>
                  {place.name}
                </h3>

                <p className="nia-pick-card-description">
                  {place.description}
                </p>

                <span className="nia-pick-card-arrow">
                  Explore ↗
                </span>

              </div>

            </article>
          ))}

        </div>
      </section>

      <section className="nia-picks-bottom">
        <span>✦</span>

        <p>
          There's always somewhere new to discover.
        </p>

        <span>✦</span>
      </section>

    </main>
  );
}

export default NiaPicks;