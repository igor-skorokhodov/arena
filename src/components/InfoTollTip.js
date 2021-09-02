import React from "react";
import ok from "../images/galka.svg";
import error from "../images/krestik.svg";
import search from "../images/lupa.png";
import { useHistory } from "react-router-dom";

function InfoToolTip(props) {
  const history = useHistory();

  function closeInfoToolTip() {
    props.setOpen(false);
    props.setError(false);
  }

  React.useEffect(() => {
    function handleClick(evt) {
      if (evt.target.classList.contains("infotooltip_active")) {
        props.setOpen(false);
        props.setError(false);
        if (props.registeredIn) {
          history.push("/movies");
        }
      }
    }

    function handleOnKeyDown(evt) {
      if (evt.key === "Escape") {
        props.setOpen(false);
        props.setError(false);
        if (props.registeredIn) {
          history.push("/movies");
        }
      }
    }

    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className={`infotooltip ${props.isOpen ? "infotooltip_active" : ""}`}>
      <div className="infotooltip__container">
        <button
          className="popup__close-button popup__close-button_position-tool"
          onClick={closeInfoToolTip}
          type="button"
          aria-label="Закрыть окно"
          id="close_button_edit"
        ></button>
        <img
          className="infotooltip__pic"
          src={
            props.errMessage === "начните поиск фильмов"
              ? search
              : props.route === "profile"
              ? ok
              : props.registeredIn &&
                !props.regError &&
                props.route === "profile"
              ? ok
              : error
          }
          alt={
            (props.registeredIn
              ? "регистрация прошла успешно"
              : "что-то пошло не так, регистрация не прошла") &&
            (props.regError
              ? "регистрация прошла успешно"
              : "такой пользователь уже существует")
          }
        ></img>
        <p className="infotooltip__text">
          {props.errMessage === "начните поиск фильмов"
            ? "начните поиск фильмов"
            : props.errMessage === "Ошибка: 401"
            ? "Вы ввели некорректные данные пользователя, попробуйте еще раз"
            : props.regError
            ? "такой пользователь уже существует"
            : props.route === "profile"
            ? "Данные пользователя успешно обновлены"
            : props.route === "movies" || props.route === "savedMovies"
            ? "ничего не найдено"
            : props.registeredIn
            ? "регистрация прошла успешно"
            : "что-то пошло не так, попробуйте еще раз"}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
