import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUp from "../../assets/signUp.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../../components/OAuth/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {toast} from 'react-toastify'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, { displayName: name });

      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign Up was Successful")
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h1>Sign Up</h1>
      <div className="container">
        <div className="image-box">
          <img src={signUp} alt="key" />
        </div>
        <div className="form-box">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail address"
            />
            <div className="input-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="icon-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="icon-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="link-account">
              <p>
                have an account?
                <Link to="/signIn">
                  <span> Sign In</span>
                </Link>
              </p>
              <p className="forgot">
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" className="btn-signIn">
              Sign In
            </button>
            <div className="divide-button">
              <p>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
