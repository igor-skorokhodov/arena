import React from "react";
import Avatar from "../images/avatar.jpg";
import { useHistory } from "react-router-dom";

function Navigation(props) {
  const history = useHistory();
  const isInMovies = props.route === "movies";
  const isInSavedMovies = props.route === "savedMovies";
  const isInProfile = props.route === "profile";
  const isNavOpened = props.headerButtonClicked;
  const isInMain = props.route === "main";

  const navigationButtonProfile = `navigation__button ${
    isInProfile ? "navigation__button_current" : ""
  } ${props.route === "main" ? "navigation_background-color" : ""}`;

  const navigationButtonMovies = `navigation__button ${
    isInMovies ? "navigation__button_current" : ""
  } ${props.route === "main" ? "navigation_background-color" : ""}`;

  const navigationButtonSavedMovies = `navigation__button
    ${isInSavedMovies ? "navigation__button_current" : ""} ${
    props.route === "main" ? "navigation_background-color" : ""
  }`;

  function closeButtonIsCliked() {
    props.isButtonClicked("false");
  }

  function redirectToMovies() {
    history.push("/movies");
    props.isButtonClicked("false");
  }

  function redirectToSavedMovies() {
    history.push("/saved-movies");
    props.isButtonClicked("false");
  }

  function redirectToProfile() {
    history.push("/profile");
    props.isButtonClicked("false");
  }

  function redirectToMain() {
    history.push("/");
    props.isButtonClicked("false");
  }


  return (
    <section
      className={`navigation ${isNavOpened ? "navigation_visible" : ""} ${
        props.route === "main" ? "navigation_background-color" : ""
      }`}
    >
      {props.headerButtonClicked ? (
        <button
          className="navigation__close-button"
          onClick={closeButtonIsCliked}
        ></button>
      ) : (
        ""
      )}
      <div
        className={`navigation__container ${
          props.route === "main" ? "navigation_background-color" : ""
        }`}
      >
        <div className="navigation__buttoms">
          {props.headerButtonClicked ? (
            <button className="navigation__button" onClick={redirectToMain}>
              Главная
            </button>
          ) : (
            ""
          )}
          <button className={navigationButtonMovies} onClick={redirectToMovies}>
            Фильмы
          </button>
          <button
            className={navigationButtonSavedMovies}
            onClick={redirectToSavedMovies}
          >
            Сохраненные фильмы
          </button>
        </div>
        <div className="navigation__account">
          <button
            className={navigationButtonProfile}
            onClick={redirectToProfile}
          >
            Аккаунт
          </button>
          <img className="navigation__avatar" alt="Avatar" src={Avatar}></img>
        </div>
      </div>
    </section>
  );
}

export default Navigation;
