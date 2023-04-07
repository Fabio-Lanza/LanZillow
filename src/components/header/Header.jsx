import Logo from "../../assets/logo.png";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      }else{
        setPageState("Sign In");
      }
    });
  }, [auth]);

  const pathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="header-container">
      <header className="header">
        <div>
          <img
            src={Logo}
            alt=""
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className="li-item" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="li-item" onClick={() => navigate("/offers")}>
              Offers
            </li>
            <li className="li-item" onClick={() => navigate("/profile")}>
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
