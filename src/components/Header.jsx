import Logo from "../assets/logo.png";
import './Header.css'
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {

const location = useLocation()
const navigate = useNavigate()

const pathRoute = (route) => {
 if(route === location.pathname){
    return true
 }
}

  return (
    <div className="header-container" >
      <header className="header">
      
        <div>
          <img src={Logo} alt="" className="h-12 cursor-pointer" onClick={()=> navigate('/')}/>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li 
            className="li-item"
            onClick={()=> navigate("/")}
            >Home</li>
            <li className="li-item"
            onClick={()=> navigate("/offers")}
            >Offers</li>
            <li className="li-item"
            onClick={()=> navigate("/signIn")}
            >Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
