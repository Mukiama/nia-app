import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/communitySection.css";

const communityMembers = [
  {
    id: 1,
    name: "Wanjiku Mwangi",
    username: "@wanjiku",
    role: "Photographer",
    places: 24,
    quote: "Always looking for the quiet side of Nairobi.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Brian Kamau",
    username: "@briank",
    role: "Food Explorer",
    places: 38,
    quote: "If it's hidden, I'm probably looking for it.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Akinyi O.",
    username: "@akinyi",
    role: "Culture Lover",
    places: 31,
    quote: "There is always another side of Nairobi to discover.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "David M.",
    username: "@davidexplores",
    role: "Adventure Seeker",
    places: 42,
    quote: "Weekends are for finding somewhere new.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  },
];

function CommunitySection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="community-section">

      {/* HEADER */}
      <div className="community-header">

        <div>
          <span className="community-eyebrow">
            NIA COMMUNITY
          </span>

          <h2>
            The people making Nairobi
            <br />
            worth discovering.
          </h2>

          <p>
            Meet curious locals and explorers sharing the places,
            stories and experiences that make Nairobi special.
          </p>
        </div>

        <Link to="/community" className="community-view-all">
          View community
          <span>→</span>
        </Link>

      </div>

      {/* MEMBER CARDS */}
      <div className="community-carousel-wrapper">

        <button
          className="community-arrow community-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous community members"
        >
          ←
        </button>

        <div
          className="community-members"
          ref={scrollRef}
        >
          {communityMembers.map((member) => (
            <article
              className="community-member-card"
              key={member.id}
            >

              {/* PROFILE IMAGE */}
              <div className="member-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />

                <div className="member-place-count">
                  {member.places} places
                </div>
              </div>

              {/* MEMBER INFO */}
              <div className="member-info">

                <div className="member-name-row">
                  <div>
                    <h3>{member.name}</h3>
                    <span className="member-username">
                      {member.username}
                    </span>
                  </div>

                  <span className="member-arrow">
                    ↗
                  </span>
                </div>

                <span className="member-role">
                  {member.role}
                </span>

                <p className="member-quote">
                  “{member.quote}”
                </p>

                <Link
                  to={`/community/${member.id}`}
                  className="member-profile-link"
                >
                  View profile
                  <span>→</span>
                </Link>

              </div>

            </article>
          ))}
        </div>

        <button
          className="community-arrow community-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next community members"
        >
          →
        </button>

      </div>

      {/* BECOME A MEMBER */}
      <div className="become-member">

        <div className="become-member-content">

          <span className="become-member-eyebrow">
            JOIN NIA
          </span>

          <h2>
            Your next discovery could
            <br />
            be someone else's hidden gem.
          </h2>

          <p>
            Share the places you love, discover new favourites,
            and help others see Nairobi differently.
          </p>

        </div>

        <Link
          to="/signup"
          className="become-member-button"
        >
          Become a member
          <span>→</span>
        </Link>

      </div>

    </section>
  );
}

export default CommunitySection;

