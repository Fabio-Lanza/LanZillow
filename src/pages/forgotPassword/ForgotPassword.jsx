import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forgot from "../../assets/forgot.png";
import OAuth from "../../components/OAuth/OAuth";
import { toast } from "react-toastify";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent!");
      navigate("/signIn");
    } catch (error) {
      toast.error("Could not reset the password");
    }
  }

  return (
    <section>
      <h1>Forgot Password</h1>
      <div className="container">
        <div className="image-box">
          <img src={Forgot} alt="key" />
        </div>
        <div className="form-box">
          <form className="form" onSubmit={handleSubmit}>
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
                <Link to="/signUp">
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
