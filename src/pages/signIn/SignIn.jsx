import { useState } from "react";
import { Link, useNavigate, UseNavigate } from "react-router-dom";
import Key from "../../assets/gold-key.png";
import "./SignIn.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../../components/OAuth/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h1>Sign In</h1>
      <div className="container">
        <div className="image-box">
          <img src={Key} alt="key" />
        </div>
        <div className="form-box">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail address"
              className="w-full"
            />
            <div className="input-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full"
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
                Don't have an account?
                <Link to="/signUp">
                  <span> Register</span>
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
