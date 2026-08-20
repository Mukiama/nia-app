import { useState } from "react";
import "./placeCard.css";

function PlaceCard() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    location: "",
    description: "",
    price: "",
    phone: "",
    email: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="business-form-container">
      <div className="business-form">

        <div className="form-header">
          <h2>Add a Business / Place</h2>
          <p>
            Provide details about the business, property or destination.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="businessName">
              Business / Place Name
            </label>

            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Lake Nakuru Lodge"
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
              <option value="">Select a category</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Tourist Attraction">
                Tourist Attraction
              </option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Nature">Nature</option>
              <option value="Other">Other</option>
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
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Nakuru, Kenya"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the business or place..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 5000"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +254 700 000 000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="business@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">
              Website
            </label>

            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Add Business
          </button>

          {submitted && (
            <div className="success-message">
              
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default PlaceCard;