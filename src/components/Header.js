import React from "react";
import Navigation from "../components/Navigation.js";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function openButtonIsClicked() {
    props.isButtonClicked("true");
  }

  function redirectToMain() {
    history.push("/");
  }

  function redirectToRegister() {
    history.push("/signup");
  }

  function redirectToLogin() {
    history.push("/signin");
  }

  return (
    <header
      className={`header ${props.route !== "main" ? "header_background" : ""}`}
    >
      <button className="header__logo" onClick={redirectToMain}></button>
      <div className="header__container">
        {window.innerWidth < 1099 && props.loggedIn ? (
          <button
            className="header__menu"
            onClick={openButtonIsClicked}
          ></button>
        ) : props.route === "main" && !props.loggedIn ? (
          <div className="header__container">
            <button
              className="header__button header__button_transparent-button"
              onClick={redirectToRegister}
            >
              Регистрация
            </button>
            <button
              className="header__button header__button_green-button"
              onClick={redirectToLogin}
            >
              Войти
            </button>
          </div>
        ) : props.headerButtonClicked ? (
          ""
        ) : (
          <Navigation
            route={props.route}
            isButtonClicked={props.isButtonClicked}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
