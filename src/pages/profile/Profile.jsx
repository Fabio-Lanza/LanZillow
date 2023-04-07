import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import "./Profile.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import {collection,doc,getDocs,orderBy,query,updateDoc,where,} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../../components/listingItem/ListingItem";


export default function Profile() {
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;


  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, { displayName: name });
      }
      //update name in the firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { name });

      toast.success("Profile details Updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, "listing");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listings)
    }

    fetchUserListing();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section>
        <h1>My Profile</h1>
        <div className="form-container">
          <form className="form-profile">
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={handleChange}
            />

            <input
              type="text"
              id="email"
              value={email}
              disabled={!changeDetail}
            />

            <div className="edit">
              <p>
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                >
                  {changeDetail ? "Done" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout}>Sign Out</p>
            </div>
          </form>
          <button type="submit" className="list-btn">
            <Link to="/create-listing" className="link">
              <FcHome />
              Sell or Rent
            </Link>
          </button>
        </div>
      </section>

      <div className="listing-container">
        {listings && (
          <>
          <h2>My Listing</h2>
          <ul>
            {listings.map((listing) =>(
              <ListingItem key={listing.id} id={listing.id}
              listing={listing.data}/>
            ))}
          </ul>
          </>
        )}
      </div>
    </>
  );
}
