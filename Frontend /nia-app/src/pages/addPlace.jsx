import { useState } from "react";
import "../styles/offMap.css";

function AddPlace() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    review: "",
    rating: 0,
  });

  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Photography",
    "Nature",
    "Food",
    "Art",
    "Culture",
    "Family",
    "Adventure",
    "Nightlife",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));
  };

  const handlePhotos = (event) => {
    const files = Array.from(event.target.files);

    setPhotos(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Place submission:", {
      ...formData,
      photos,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="add-place-page">
        <section className="add-place-success">
          <div className="success-icon">✓</div>

          <h1>Thanks for sharing!</h1>

          <p>
            Your place has been submitted to Nia and will be reviewed before
            appearing publicly.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                category: "",
                location: "",
                description: "",
                review: "",
                rating: 0,
              });
              setPhotos([]);
            }}
          >
            Add Another Place
          </button>

        </section>
      </main>
    );
  }

  return (
    <main className="add-place-page">

      <section className="add-place-container">

        <div className="add-place-header">

          <p className="add-place-eyebrow">
            SHARE A DISCOVERY
          </p>

          <h1>
            Found somewhere worth sharing?
          </h1>

          <p>
            Help others discover places that
            deserve to be on Nia.
          </p>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="add-place-form"
          onSubmit={handleSubmit}
        >

          {/* PLACE DETAILS */}

          <div className="form-section">

            <h2>
              Place details
            </h2>

            <div className="form-group">

              <label htmlFor="name">
                Place name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Karura Forest"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Choose a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </div>

            <div className="form-group">

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Karura, Nairobi"
                value={formData.location}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="description">
                About this place
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Tell people what makes this place worth discovering..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />

            </div>

          </div>

          {/* PHOTOS */}

          <div className="form-section">

            <h2>
              Photos
            </h2>

            <p className="form-help">
              Add up to 5 photos that show people
              what the place is like.
            </p>

            <label className="photo-upload">

              <span>
                ＋ Add photos
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handlePhotos}
              />

            </label>

            {photos.length > 0 && (
              <div className="selected-photos">

                <p>
                  {photos.length} photo(s) selected
                </p>

                <div className="photo-names">

                  {photos.map((photo) => (
                    <span
                      key={`${photo.name}-${photo.lastModified}`}
                    >
                      {photo.name}
                    </span>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* REVIEW */}

          <div className="form-section">

            <h2>
              Your experience
            </h2>

            <div className="form-group">

              <label>
                Rating
              </label>

              <div className="rating-selector">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    className={
                      star <= formData.rating
                        ? "rating-star active"
                        : "rating-star"
                    }
                    onClick={() =>
                      handleRating(star)
                    }
                    aria-label={`Rate ${star} out of 5`}
                  >
                    ★
                  </button>

                ))}

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="review">
                Your review
              </label>

              <textarea
                id="review"
                name="review"
                placeholder="What was your experience like?"
                value={formData.review}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="add-place-submit"
            disabled={
              formData.rating === 0 ||
              photos.length === 0 ||
              loading
            }
          >
            {loading
              ? "Submitting..."
              : "Submit Place"}
          </button>

        </form>

      </section>

    </main>
  );
}

export default AddPlace;