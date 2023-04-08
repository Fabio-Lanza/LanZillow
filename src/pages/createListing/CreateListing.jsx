import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./CreateListing.css";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";


export default function CreateListing() {
  const navigate = useNavigate()
  const [geolocationEnabled, setgeolocationEnabled] = useState(true);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    type: "sale",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    furnished: "",
    description: "",
    offer: false,
    regularPrice:"",
    discountedPrice:"",
    latitude: 0,
    longitude: 0,
    images: {},
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
    latitude,
    longitude,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //text/ Boolean/ Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (+discountedPrice >= +regularPrice) {
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      toast.error("maximum 6 images allowed");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAP6DDWXOHVMmAZ4KdZSHv7xmyqIarVqNY`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;
      if (location === undefined) {
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection (db, "listing"), formDataCopy);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)

  }


  return (
    <main>
      <h1 className="">Create Listing</h1>
      <form className="form-list" onSubmit={handleSubmit}>
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
            value="rent"
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
            value={true}
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
        {!geolocationEnabled && (
          <div className="lati-long-container">
            <div className="latitude">
              <p>Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
              />
            </div>
            <div className="latitude">
              <p>Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-180"
                max="180"
              />
            </div>
          </div>
        )}

        <p>Description</p>
        <textarea
          type="text"
          value={description}
          id="description"
          onChange={onChange}
          placeholder="Description"
          required
        />

        <p>Offer</p>
        <div className="furnished-container">
          <button
            type="button"
            id="offer"
            value={true}
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
                  min="0"
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
        <button type="submit" className="create-btn">
          Create Listing
        </button>
      </form>
    </main>
  );
}
