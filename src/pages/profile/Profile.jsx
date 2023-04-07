import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import "./Profile.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import {Link} from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

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
    </>
  );
}
