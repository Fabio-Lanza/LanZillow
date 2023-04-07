import { useState } from "react";
import "./CreateListing.css";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    furnished: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;

  function onChange() {}

  return (
    <main>
      <h1 className="">Create Listing</h1>
      <form className="form-list">
        <p>Sell / Rent</p>
        <div className="buttons-container">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className="left-btn"
          >
            SELL
          </button>

          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className="right-btn"
          >
            RENT
          </button>
        </div>

        <p>Name</p>
        <input
          type="text"
          value={name}
          id="name"
          onChange={onChange}
          placeholder="Propriety Name"
          maxLength="32"
          required
        />

        <div className="bed-bath-container">
          <div>
            <p>Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
            />
          </div>
          <div>
            <p>Bath</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
            />
          </div>
        </div>

        <p>Parking Spot</p>
        <div className="parkingSpot-container">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className="left-btn"
          >
            YES
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className="right-btn"
          >
            NO
          </button>
        </div>

        <p>Furnished</p>
        <div className="furnished-container">
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className="left-btn"
          >
            YES
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className="right-btn"
          >
            NO
          </button>
        </div>

        <p>Address</p>
        <textarea
          type="text"
          value={address}
          id="address"
          onChange={onChange}
          placeholder="Address"
          required
        />

        <p>Description</p>
        <textarea
          type="text"
          value={name}
          id="description"
          onChange={onChange}
          placeholder="Propriety Name"
          required
        />

        <p>Offer</p>
        <div className="furnished-container">
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className="left-btn"
          >
            YES
          </button>

          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className="right-btn"
          >
            NO
          </button>
        </div>

        <div className="price-container">
          <div>
            <p>Regular Price</p>
            <div className="price-month">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="40000000"
                required
              />
              {type === "rent" && (
                <div>
                  <p>$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {offer && (
          <div className="discounted-container">
            <div>
              <p>Discounted Price</p>
              <div className="price-month">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="40000000"
                  required={offer}
                />
                {type === "rent" && (
                  <div>
                    <p>$ / Month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="images-container">
          <p>Images</p>
          <span>The first image will be the cover(max 6)</span>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
        </div>
        <button type="submit" className="create-btn">Create Listing</button>
      </form>
    </main>
  );
}
