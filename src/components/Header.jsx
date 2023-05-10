import React from "react";
import { useLocation, Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";


export default function Header({email, onSignOut}) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo"/>

      <div className="navbar">

        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="navbar__link">
            Регистрация
          </Link>
        )}

        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="navbar__link">
            Войти
          </Link>
        )}

        {location.pathname === "/" && (
          <>
            <p className="navbar__email">{`${email}`}</p>

            <button className="navbar__link navbar__link_btn_gray" onClick={onSignOut}>
              Выйти
            </button>

            <ScrollToTop smooth color="white" style={{ background: "#000000", boxShadow: "none" }} />
          </>
        )}

      </div>
    </header>
  );
};
