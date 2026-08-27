import { Link } from "react-router-dom";
import karuraImage from "../images/karura.jpg";
import museumImage from "../images/museum.jpg";
import ngongImage from "../images/ngong.jpg";
import arboretumImage from "../images/arboretum.jpg";

/* =========================================
   PLACES FOR NIA PICK
========================================= */

const places = [
  {
    name: "Karura Forest",
    location: "Nairobi, Kenya",
    description:
      "Escape into one of Nairobi's most beautiful hidden spaces.",
    image: karuraImage,
  },

  {
    name: "Nairobi National Museum",
    location: "Nairobi, Kenya",
    description:
      "Explore Kenya's history, art, culture, and natural heritage.",
    image: museumImage,
  },

  {
    name: "Ngong Hills",
    location: "Kajiado, Kenya",
    description:
      "Take in sweeping views and beautiful walking trails.",
    image: ngongImage,
  },

  {
    name: "Nairobi Arboretum",
    location: "Nairobi, Kenya",
    description:
      "A peaceful green space perfect for walking and relaxing.",
    image: arboretumImage,
  },
];

/* =========================================
   GET DAILY PICK
========================================= */

const getDailyPick = (places) => {
  const today = new Date();

  const startOfYear = new Date(today.getFullYear(), 0, 0);

  const difference = today - startOfYear;

  const oneDay = 1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(difference / oneDay);

  return places[dayOfYear % places.length];
};

/* =========================================
   HERO COMPONENT
========================================= */

function Hero() {
  const dailyPick = getDailyPick(places);

  return (
    <section className="hero">

      {/* ================================
          MAIN HERO CONTENT
      ================================= */}

      <div className="hero-content">

        <p className="hero-eyebrow">
          Find your next thing
        </p>

        <h1>
          Discover places
          <br />
          worth knowing.
        </h1>

        <p className="hero-description">
          Explore hidden gems, beautiful spaces, and local experiences
          around Nairobi.
        </p>

      <div className="hero-actions">

        {/* <Link
          to="/nearby-finds"
          className="hero-primary"
        >
         Nearby Finds
        </Link>

        <Link
          to="/nia-picks"
          className="hero-secondary"
        >
         Find Your Next Thing
        </Link> */}
        </div>

      </div>

      {/* ================================
          NIA PICK
      ================================= */}

      <div className="nia-pick">

        {/* Place image */}

        <div className="nia-pick-image">

          <img
            src={dailyPick.image}
            alt={dailyPick.name}
          />

          <span className="nia-pick-tag">
            NIA PICK OF THE DAY
          </span>

        </div>

        {/* Place information */}

        <div className="nia-pick-content">

          <p className="nia-pick-location">
            {dailyPick.location}
          </p>

          <h2>
            {dailyPick.name}
          </h2>

          <p className="nia-pick-description">
            {dailyPick.description}
          </p>

          <div className="nia-pick-footer">

            <span>
              Explore this place
            </span>

            <span className="nia-arrow">
              ↗
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;