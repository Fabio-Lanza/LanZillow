import { useState } from "react";
import { Link } from "react-router-dom";
import signUp from "../../assets/signUp.png";
import "./SignUp.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../../components/OAuth/OAuth";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <div className="container">
        <div className="image-box">
          <img src={signUp} alt="key" />
        </div>
        <div className="form-box">
          <form className="form">
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
