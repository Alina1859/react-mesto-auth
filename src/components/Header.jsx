import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";

export default function Header({email, onSignOut}) {
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  const handleOnSignOut = () => {
    setIsHamburgerOpen(false);
    onSignOut();
  }

  return (
    <>
      {location.pathname === "/" && (
        <header className="header">
          <div className={`navbar ${isHamburgerOpen ? "navbar_active" : " "}`}>
            <p className="navbar__email">{`${email}`}</p>
            <button className="navbar__link navbar__link_btn_gray"
            onClick={handleOnSignOut}>
              Выйти
            </button>
          </div>

          <div className="header__container">
            <div className="logo"/>

            <div className={`hamburger
              ${isHamburgerOpen ? "hamburger_active" : ""}`} onClick={toggleHamburger}>
              <div className={`hamburger__line hamburger__line_position_top
                ${isHamburgerOpen ? "hamburger__line_active hamburger__line_position_top_active" : ""}`}></div>
              <div className={`hamburger__line hamburger__line_position_middle
                ${isHamburgerOpen ? "hamburger__line_active hamburger__line_position_middle_active" : ""}`}></div>
              <div className={`hamburger__line hamburger__line_position_bottom
              ${isHamburgerOpen ? "hamburger__line_active hamburger__line_position_bottom_active" : ""}`}></div>
            </div>
          </div>
        </header>
      )}

      {location.pathname === "/sign-in" && (
        <header className="header" style={{flexDirection: "row", alignItems: "flex-start"}}>
          <div className="logo"/>
          <Link to="/sign-up" className="navbar__link" style={{marginRight: "30px"}}>
            Регистрация
          </Link>
        </header>
      )}

      {location.pathname === "/sign-up" && (
        <header className="header" style={{flexDirection: "row", alignItems: "flex-start"}}>
         <div className="logo"/>
          <Link to="/sign-in" className="navbar__link" style={{marginRight: "30px"}}>
            Войти
          </Link>
        </header>
      )}

      <ScrollToTop smooth color="white" style={{ background: "#000000", boxShadow: "none" }} />
    </>
  );
};
