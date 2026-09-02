import { Link } from "react-router-dom";
import "../styles/community.css";

const featuredStory = {
  name: "Wanjiku Mwangi",
  username: "@wanjiku",
  role: "Photographer",
  location: "Karura & beyond",
  image:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  quote:
    "Nairobi feels completely different when you slow down enough to notice the places hiding in plain sight.",
};

const discoveries = [
  {
    id: 1,
    place: "Karura Forest",
    category: "Nature",
    location: "Karura, Nairobi",
    user: "Wanjiku Mwangi",
    username: "@wanjiku",
    rating: "4.9",
    review:
      "The perfect escape when you need a quiet afternoon surrounded by green.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    place: "The Alchemist",
    category: "Nightlife",
    location: "Westlands, Nairobi",
    user: "Brian Kamau",
    username: "@briank",
    rating: "4.7",
    review:
      "Great atmosphere, good food and always something interesting happening.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    place: "Nairobi National Museum",
    category: "Culture",
    location: "Museum Hill, Nairobi",
    user: "Akinyi O.",
    username: "@akinyi",
    rating: "4.8",
    review:
      "A reminder that there is so much history and creativity around us.",
    image:
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    place: "Ngong Hills",
    category: "Adventure",
    location: "Ngong, Nairobi",
    user: "David M.",
    username: "@davidexplores",
    rating: "4.9",
    review:
      "Worth the early morning start. The views make every step worthwhile.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
];

const communityMembers = [
  {
    id: 1,
    name: "Wanjiku Mwangi",
    username: "@wanjiku",
    role: "Photographer",
    places: 24,
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Brian Kamau",
    username: "@briank",
    role: "Food Explorer",
    places: 38,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Akinyi O.",
    username: "@akinyi",
    role: "Culture Lover",
    places: 31,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
];

function Community() {
  return (
    <main className="community-page">
      {/* =========================
          HERO
      ========================= */}
      <section className="community-hero">
        <div className="community-hero-content">
          <span className="community-eyebrow">THE NIA COMMUNITY</span>

          <h1>
            Discover Nairobi
            <br />
            <em>through each other.</em>
          </h1>

          <p>
            The places we discover become better when we share them.
            Meet curious locals, follow their discoveries and find
            experiences worth talking about.
          </p>

          <div className="community-hero-actions">
            <Link to="/signup" className="community-primary-btn">
              Join the community
              <span>→</span>
            </Link>

            <a href="#discoveries" className="community-text-link">
              Explore discoveries ↓
            </a>
          </div>
        </div>

        <div className="community-hero-visual">
          <div className="hero-image-main">
            <img
              src={featuredStory.image}
              alt="Nairobi discovery"
            />
          </div>

          <div className="hero-floating-card hero-floating-top">
            <span>RECENT DISCOVERY</span>
            <strong>Karura Forest</strong>
            <small>by @wanjiku</small>
          </div>

          <div className="hero-floating-card hero-floating-bottom">
            <span>COMMUNITY RATING</span>
            <strong>4.9 ★</strong>
          </div>
        </div>
      </section>

      {/* =========================
          COMMUNITY STATEMENT
      ========================= */}
      <section className="community-statement">
        <span className="community-eyebrow">WHY COMMUNITY MATTERS</span>

        <h2>
          Nairobi is more than the places
          <br />
          everyone already knows.
        </h2>

        <p>
          Nia is built around people who look twice, take the
          unfamiliar road and share what they find. Every review,
          photograph and recommendation helps someone discover
          another side of the city.
        </p>
      </section>

      {/* =========================
          FEATURED STORY
      ========================= */}
      <section className="featured-community">
        <div className="featured-image">
          <img
            src={featuredStory.image}
            alt={featuredStory.name}
          />
        </div>

        <div className="featured-content">
          <span className="community-eyebrow">COMMUNITY STORY</span>

          <div className="featured-number">01</div>

          <h2>
            Meet
            <br />
            {featuredStory.name}.
          </h2>

          <span className="featured-role">
            {featuredStory.role} · {featuredStory.location}
          </span>

          <blockquote>
            “{featuredStory.quote}”
          </blockquote>

          <Link
            to="/profile/1"
            className="community-text-link"
          >
            Explore their discoveries →
          </Link>
        </div>
      </section>

      {/* =========================
          DISCOVERIES
      ========================= */}
      <section className="community-discoveries" id="discoveries">
        <div className="discoveries-header">
          <div>
            <span className="community-eyebrow">FROM THE COMMUNITY</span>

            <h2>
              Places worth
              <br />
              passing on.
            </h2>
          </div>

          <p>
            Real places. Real experiences. Recommendations from
            people who have actually been there.
          </p>
        </div>

        <div className="discovery-grid">
          {discoveries.map((discovery, index) => (
            <article
              className={`discovery-card discovery-card-${index + 1}`}
              key={discovery.id}
            >
              <div className="discovery-image">
                <img
                  src={discovery.image}
                  alt={discovery.place}
                />

                <span className="discovery-category">
                  {discovery.category}
                </span>

                <span className="discovery-rating">
                  ★ {discovery.rating}
                </span>
              </div>

              <div className="discovery-content">
                <div className="discovery-place">
                  <div>
                    <h3>{discovery.place}</h3>
                    <span>{discovery.location}</span>
                  </div>

                  <span className="discovery-number">
                    0{index + 1}
                  </span>
                </div>

                <p>“{discovery.review}”</p>

                <div className="discovery-user">
                  <span className="discovery-avatar">
                    {discovery.user.charAt(0)}
                  </span>

                  <div>
                    <strong>{discovery.user}</strong>
                    <small>{discovery.username}</small>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          MEMBERS
      ========================= */}
      <section className="community-members-page">
        <div className="members-page-header">
          <span className="community-eyebrow">THE EXPLORERS</span>

          <h2>
            Follow people
            <br />
            with <em>curiosity.</em>
          </h2>

          <p>
            Find locals with your kind of curiosity and see Nairobi
            from their perspective.
          </p>
        </div>

        <div className="members-page-grid">
          {communityMembers.map((member) => (
            <Link
              to={`/profile/${member.id}`}
              className="community-profile-card"
              key={member.id}
            >
              <div className="profile-card-image">
                <img
                  src={member.image}
                  alt={member.name}
                />

                <span>{member.places} discoveries</span>
              </div>

              <div className="profile-card-info">
                <div>
                  <h3>{member.name}</h3>
                  <span>{member.username}</span>
                </div>

                <strong>↗</strong>

                <p>{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          JOIN CTA
      ========================= */}
      <section className="community-join">
        <div className="join-decoration">NIA</div>

        <div className="join-content">
          <span className="community-eyebrow">YOUR TURN</span>

          <h2>
            Know a place
            <br />
            worth discovering?
          </h2>

          <p>
            Share it with Nia. Your hidden gem could become
            someone else's favourite place in Nairobi.
          </p>

          <Link to="/signup" className="community-primary-btn">
            Start discovering
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Community;