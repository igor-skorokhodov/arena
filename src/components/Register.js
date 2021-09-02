import LogRegForm from "./LogRegForm.js";
import FormErrors from "./FormErrors.js";
import React from "react";
import InfoToolTip from "./InfoTollTip.js";
import Background from "../images/BG2.png";
import Male from "../images/male.png";
import Female from "../images/female.png";

function Register(props) {
  const [maleFlag, setMaleFlag] = React.useState(false);
  const [femaleFlag, setFemaleFlag] = React.useState(false);
  const [acceptButton, setAcceptButton] = React.useState(false);
  const [race, setRace] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [calendarButtonClicked, isCalendarButtonClicked] =
    React.useState(false);
  const [raceButtonClicked, isRaceButtonClicked] = React.useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    props.setData(
      {
        ...props.data,
        [name]: value,
      },
      props.validateField(name, value, props.passwordsMatch)
    );
  }

  function handleChangeRace(e) {
    setRace(e.target.value);
    props.setData({ ...props.data, race: e.target.value });
  }

  function handleChangeDate(e) {
    setDate(e.target.value);
    props.setData({ ...props.data, birthday: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function clickOnMaleButton() {
    props.setData({ ...props.data, sex: "male" });
    setMaleFlag(true);
    setFemaleFlag(false);
  }

  function clickOnFemaleButton() {
    props.setData({ ...props.data, sex: "female" });
    setFemaleFlag(true);
    setMaleFlag(false);
  }

  function clickOnAcceptButton() {
    if (!acceptButton) {
      props.setData({ ...props.data, accept: "agree" });
      setAcceptButton(true);
    } else {
      props.setData({ ...props.data, accept: "" });
      setAcceptButton(false);
    }
  }

  function clickOnCalendar() {
    isCalendarButtonClicked(true);
  }

  function clickOnRace() {
    isRaceButtonClicked(true);
    props.setData({ ...props.data, race: race });
  }

  let maleButtonOnClick = maleFlag
    ? "register__button register__button_isClicked"
    : "register__button";

  let femaleButtonOnClick = femaleFlag
    ? "register__button register__button_isClicked"
    : "register__button";

    let acceptButtonOnClick = acceptButton
    ? "register__button register__button_isClicked"
    : "register__button";

  return (
    <>
      <div className="register">
        <img
          src={Background}
          alt="Фоновая картинка"
          className="register__background"
        ></img>
        <LogRegForm
          className="logreg__container"
          title="Регистрация"
          buttonText="Регистрация"
          submit={handleSubmit}
          formValid={props.validity.formValidReg}
        >
          <input
            onChange={handleChange}
            placeholder="Ник"
            value={props.data.name}
            className="logreg__input"
            type="name"
            name="name"
            required
          />
          <FormErrors formErrors={props.validity.formErrors.name} />
          <input
            onChange={handleChange}
            value={props.data.email}
            placeholder="E-mail"
            className="logreg__input"
            type="email"
            name="email"
            required
          />
          <FormErrors formErrors={props.validity.formErrors.email} />
          <input
            onChange={handleChange}
            value={props.data.password}
            className="logreg__input"
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <FormErrors formErrors={props.validity.formErrors.password} />
          <input
            onChange={handleChange}
            value={props.data.confirmPassword}
            className="logreg__input"
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            required
          />
          <FormErrors formErrors={props.validity.formErrors.confirmPassword} />
          <FormErrors
            formErrors={props.validity.formErrors.passwordsMatch}
            data={props.data}
          />
          <div className="register__sex">
            <div className="register__choose">
              <img className="register__pic" alt="Выбор пола" src={Male}></img>
              <button
                className={maleButtonOnClick}
                onClick={clickOnMaleButton}
              ></button>
            </div>
            <div className="register__choose">
              <img
                className="register__pic"
                alt="Выбор пола"
                src={Female}
              ></img>
              <button
                className={femaleButtonOnClick}
                onClick={clickOnFemaleButton}
              ></button>
            </div>
          </div>
          <select
            className={`register__select ${
              raceButtonClicked ? "register__text_active" : ""
            }`}
            size="1"
            name="race"
            onClick={clickOnRace}
            value={race}
            onChange={handleChangeRace}
          >
            <option>Раса</option>
            <option value="Человек">Человек</option>
            <option value="Орк">Орк</option>
            <option value="Гном">Гном</option>
            <option value="Эльф">Эльф</option>
            <option value="Хоббит">Хоббит</option>
          </select>
          <div className="register__choose register__choose_birthday">
            <p
              className={`register__text ${
                calendarButtonClicked ? "register__text_active" : ""
              }`}
            >
              Дата рождения:
            </p>
            <input
              className={`register__calendar ${
                calendarButtonClicked ? "register__calendar_active" : ""
              }`}
              type="date"
              name="birthday"
              value={date}
              onChange={handleChangeDate}
              onClick={clickOnCalendar}
            ></input>
          </div>
          <div className="register__container-acc">
            <p className={`register__text ${
                  acceptButton ? "register__text_active" : ""
                }`}>
              Принимаю     
              <a
                className={`register__text ${
                  acceptButton ? "register__text_active" : ""
                }`}
                href="https://kovcheg.apeha.ru/licence.htm"
              > условия лицензионного соглашения
              </a>
            </p>
            <button
              className={acceptButtonOnClick}
              onClick={clickOnAcceptButton}
            ></button>
          </div>
        </LogRegForm>
      </div>
    </>
  );
}

export default Register;
