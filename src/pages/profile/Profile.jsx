import { useState } from "react";
import { getAuth } from "firebase/auth";
import "./Profile.css";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();

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

  return (
    <>
      <section>
        <h1>My Profile</h1>
        <div className="form-container">
          <form className="form">
            <input type="text" id="name" value={name} />

            <input type="text" id="email" value={email} />

            <div className="edit">
              <p>
                Do you want to change your name?
                <span> Edit</span>
              </p>
              <p onClick={onLogout}>Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
