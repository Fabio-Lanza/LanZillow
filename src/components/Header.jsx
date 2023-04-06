import Logo from "../assets/logo.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export default function Header() {

const location = useLocation()
const navigate = useNavigate()

const pathRoute = (route) => {
 if(route === location.pathname){
    return true
 }
}

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50" >
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img src={Logo} alt="" className="h-12 cursor-pointer" onClick={()=> navigate('/')}/>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li 
            className={`cursor-pointer py-4 font-semibold text-gray-400 border-b-[3px] 
            border-b-transparent ${pathRoute("/") && "text-black border-b-red-500"}`}
            onClick={()=> navigate('/')}
            >Home</li>
            <li  className={`cursor-pointer py-4 font-semibold text-gray-400 border-b-[3px] 
            border-b-transparent ${pathRoute("/offers") && "text-black border-b-red-500"}`}
            onClick={()=> navigate('/offers')}
            >Offers</li>
            <li  className={`cursor-pointer py-4 font-semibold text-gray-400 border-b-[3px] 
            border-b-transparent ${pathRoute("/signIn") && "text-black border-b-red-500"}`}
            onClick={()=> navigate('/signIn')}
            >Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
