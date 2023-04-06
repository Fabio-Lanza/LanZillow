import { useState } from "react";
import { Link } from "react-router-dom";
import Forgot from "../../assets/forgot.png";
import OAuth from "../../components/OAuth/OAuth";

export default function ForgotPassword() {
  
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <h1>Forgot Password</h1>
      <div className="container">
        <div className="image-box">
          <img src={Forgot} alt="key" />
        </div>
        <div className="form-box">
          <form className="form">
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail address"
            />

            <div className="link-account">
              <p>
                Don't have an account?
                <Link to="/signUn">
                  <span> Register</span>
                </Link>
              </p>
              <p className="forgot">
                <Link to="/signIn">Sign In</Link>
              </p>
            </div>
            <button type="submit" className="btn-signIn">
              Reset Password
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
