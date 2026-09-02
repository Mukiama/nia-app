import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authFetch } from "../api/client";

import "../styles/placeDetail.css";

export default function PlaceDetails() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [visited, setVisited] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    async function loadPlace() {
      try {
        setLoading(true);
        setError("");

        const response = await authFetch(`/places/${id}`);

        if (!response.ok) {
          throw new Error("Place not found.");
        }

        const data = await response.json();
        setPlace(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlace();
  }, [id]);

  useEffect(() => {
    async function checkStatus() {
      try {
        const [
          favouritesResponse,
          historyResponse
        ] = await Promise.all([
          authFetch("/favourites"),
          authFetch("/history"),
        ]);

        const favourites = await favouritesResponse.json();
        const history = await historyResponse.json();

        setLiked(
          favourites.some(
            (item) =>
              String(item.placeId) === String(id)
          )
        );

        setVisited(
          history.some(
            (item) =>
              String(item.placeId) === String(id)
          )
        );
      } catch (err) {
        console.error(
          "Could not check place status:",
          err
        );
      }
    }

    if (id) checkStatus();
  }, [id]);

  async function handleLike() {
    if (!place || actionLoading) return;

    try {
      setActionLoading(true);

      if (liked) {
        const response = await authFetch("/favourites");
        const favourites = await response.json();

        const match = favourites.find(
          (item) =>
            String(item.placeId) ===
            String(place.id)
        );

        if (match) {
          await authFetch(
            `/favourites/${match.id}`,
            {
              method: "DELETE"
            }
          );
        }

        setLiked(false);
      } else {
        await authFetch("/favourites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            placeId: place.id
          }),
        });

        setLiked(true);
      }
    } catch (err) {
      setError("Could not update favourite.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleVisited() {
    if (!place || actionLoading || visited) return;

    try {
      setActionLoading(true);

      await authFetch("/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          placeId: place.id
        }),
      });

      setVisited(true);
    } catch (err) {
      setError("Could not mark place as visited.");
    } finally {
      setActionLoading(false);
    }
  }

  function handlePhotos(event) {
    const files = Array.from(event.target.files);

    if (files.length > 5) {
      setError("You can upload a maximum of 5 photos.");
      setPhotos(files.slice(0, 5));
      return;
    }

    setPhotos(files);
    setError("");
    setUploadMessage("");
  }

  async function handleUpload() {
    if (!place || photos.length === 0 || uploading) {
      return;
    }

    if (photos.length > 5) {
      setError("You can upload a maximum of 5 photos.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setUploadMessage("");

      const imageData = new FormData();

      photos.forEach((photo) => {
        imageData.append("pictures", photo);
      });

      const response = await authFetch(
        `/places/${place.id}/picture`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details ||
          data.error ||
          "Picture upload failed."
        );
      }

      setUploadMessage(
        "Pictures uploaded successfully."
      );

      setPhotos([]);

      /*
       * Reload the place so the newly uploaded
       * Cloudinary pictures appear immediately.
       */
      const placeResponse = await authFetch(
        `/places/${place.id}`
      );

      if (placeResponse.ok) {
        const updatedPlace = await placeResponse.json();
        setPlace(updatedPlace);
      }

    } catch (err) {
      console.error(
        "Error uploading pictures:",
        err
      );

      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  let images = [];

  if (place && place.picture) {
    try {
      if (Array.isArray(place.picture)) {
        images = place.picture;
      } else {
        const parsed = JSON.parse(place.picture);

        if (Array.isArray(parsed)) {
          images = parsed;
        } else if (typeof parsed === "string") {
          images = [parsed];
        }
      }
    } catch {
      images = [place.picture];
    }
  }

  const image = images[0] || "";

  if (loading) {
    return (
      <main className="place-details-page">
        <div className="place-details-loading">
          Loading place...
        </div>
      </main>
    );
  }

  if (error && !place) {
    return (
      <main className="place-details-page">
        <div className="place-details-error">
          <h1>Place not found</h1>

          <p>
            {error || "We couldn't find this place."}
          </p>

          <Link to="/places">
            Back to places
          </Link>
        </div>
      </main>
    );
  }

  if (!place) {
    return null;
  }

  return (
    <main className="place-details-page">

      <section className="place-details-hero">

        {image ? (
          <img
            src={image}
            alt={place.name}
          />
        ) : (
          <div className="place-details-image-placeholder">
            No image available
          </div>
        )}

        <div className="place-details-overlay">
          <Link
            to="/filter"
            className="back-link"
          >
            ← Back to places
          </Link>
        </div>

      </section>

      <section className="place-details-content">

        <div className="place-details-main">

          <p className="place-details-category">
            {place.category}
          </p>

          <h1>
            {place.name}
          </h1>

          <p className="place-details-location">
            {place.physical_address}
          </p>

          <p className="place-details-description">
            {place.description}
          </p>

          <div className="place-details-actions">

            <button
              type="button"
              className={
                liked
                  ? "details-action liked"
                  : "details-action"
              }
              onClick={handleLike}
              disabled={actionLoading}
            >
              {liked
                ? "♥ Liked"
                : "♡ Like"}
            </button>

            <button
              type="button"
              className={
                visited
                  ? "details-action visited"
                  : "details-action"
              }
              onClick={handleVisited}
              disabled={
                actionLoading ||
                visited
              }
            >
              {visited
                ? "✓ Visited"
                : "Mark as visited"}
            </button>

          </div>

          {/* ADD PHOTOS */}

          <div className="place-photo-upload">

            <h2>Add photos</h2>

            <p>
              Add up to 5 photos for this place.
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotos}
            />

            {photos.length > 0 && (
              <p>
                {photos.length} photo(s) selected
              </p>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={
                photos.length === 0 ||
                uploading
              }
            >
              {uploading
                ? "Uploading..."
                : "Upload Photos"}
            </button>

            {uploadMessage && (
              <p>
                {uploadMessage}
              </p>
            )}

            {error && (
              <p role="alert">
                {error}
              </p>
            )}

          </div>

          {/* EXISTING PHOTOS */}

          {images.length > 0 && (
            <div className="place-photo-gallery">

              <h2>Photos</h2>

              <div className="place-photo-grid">

                {images.map((photo, index) => (
                  <img
                    key={`${photo}-${index}`}
                    src={photo}
                    alt={`${place.name} ${index + 1}`}
                  />
                ))}

              </div>

            </div>
          )}

        </div>

        <aside className="place-details-info">

          <div>
            <span>LOCATION</span>
            <strong>
              {place.physical_address ||
                "Not available"}
            </strong>
          </div>

          <div>
            <span>CATEGORY</span>
            <strong>
              {place.category ||
                "Not available"}
            </strong>
          </div>

          <div>
            <span>OPENING HOURS</span>
            <strong>
              {place.operating_hours ||
                "Not available"}
            </strong>
          </div>

        </aside>

      </section>

    </main>
  );
}