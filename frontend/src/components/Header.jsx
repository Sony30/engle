import  { useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "../styles/Header.css"
import { logout } from '../services/operations/authServices';
import {  useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate()
  const {authUserData, header} = useSelector((state)=> state.auth)

  const handlesignout = () => {
    logout();
    navigate('/');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";

    return (
        <>
      <ul className={listClassName}>
        <li>
          <NavLink to="/"      
          className={`${linkClassName} ${header === 0 ? "text-[#2E3D79]" : "text-black"}`}
           onClick={closeMobileMenu} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className={`${linkClassName} ${header === 1 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={`${linkClassName} ${header === 2 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={`${linkClassName} ${header === 3 ? "text-[#2E3D79]" : "text-black"}`}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        </ul>
        <ul className={`${listClassName}  lg:mt-0 mt-3` }>
        {authUserData ? (
          <li>
          <button className='btn px-5 py-2' onClick={handlesignout}>
           Logout
          </button>
      </li>
        ):(<>
          <li>
          <NavLink
            to="/login"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            <button className="btn px-5 py-2">Log In</button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            <button className="btn px-5 py-2 ">Sign Up</button>
          </NavLink>
        </li>
        </>
        )}
      </ul>
      </>
    );
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__logo">
          ENGLE
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""} z-20`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default Header;
