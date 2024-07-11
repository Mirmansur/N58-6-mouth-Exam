import "../componets/Header.css";
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.svg";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="header">
        <div className="start">
          <img src={logo1} alt="" />
        </div>
        <div className="finish">
          <NavLink to="/" className="icon">
            <img src={logo2} alt="" />
          </NavLink>
          <NavLink to="/about" className="icon">
            <img src={logo3} alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
