import { useState } from "react";
import { authFetch } from "../api/client";
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

    setError("");
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));

    setError("");
  };

  const handlePhotos = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 5) {
      setError("You can add a maximum of 5 photos.");
      setPhotos(files.slice(0, 5));
      return;
    }

    setPhotos(files);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (formData.rating === 0) {
      setError("Please give this place a rating.");
      return;
    }

    if (photos.length === 0) {
      setError("Please add at least one photo.");
      return;
    }

    setSubmitting(true);

    try {
      // STEP 1: Create the place
      const response = await authFetch("/places/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          physical_address: formData.location,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Could not add this place."
        );
      }

      // STEP 2: Upload photos to Cloudinary
      const imageData = new FormData();

      photos.forEach((photo) => {
        imageData.append("pictures", photo);
      });

      const uploadResponse = await authFetch(
        `/places/${data.id}/picture`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.error || "Could not upload the photos."
        );
      }

      // Everything succeeded
      setSubmitted(true);

    } catch (err) {
      console.error("Error submitting place:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
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
    setError("");
  };

  if (submitted) {
    return (
      <main className="add-place-page">
        <section className="add-place-success">
          <div className="success-icon">✓</div>

          <p className="add-place-eyebrow">
            PLACE SUBMITTED
          </p>

          <h1>Thanks for sharing!</h1>

          <p>
            Your place has been submitted to Nia and will be reviewed before
            appearing publicly.
          </p>

          <button
            type="button"
            onClick={resetForm}
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
            Help others discover places that deserve to be on Nia.
          </p>
        </div>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        <form
          className="add-place-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">
            <h2>Place details</h2>

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

          <div className="form-section">
            <h2>Photos</h2>

            <p className="form-help">
              Add up to 5 photos that show people what the place is like.
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

          <div className="form-section">
            <h2>Your experience</h2>

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
                    onClick={() => handleRating(star)}
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
              submitting
            }
          >
            {submitting
              ? "Submitting..."
              : "Submit Place"}
          </button>

        </form>
      </section>
    </main>
  );
}

export default AddPlace;