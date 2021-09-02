import "../index.css";
import Navigation from "../components/Navigation.js";
import Error404 from "../components/Error404.js";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register.js";

function App() {
  const [headerButtonClicked, isHeaderButtonClicked] = React.useState(false);
  const [open, isOpen] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [validity, setValidity] = React.useState({
    formErrors: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      passwordsMatch: "",
    },
    emailValid: false,
    passwordValid: false,
    formValidReg: false,
    formValidLog: false,
    nameValid: true,
    passwordsMatch: false,
  });

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    race: "",
    sex: "",
    birthday: "",
    accept: "",
  });

  React.useEffect(() => {
    document.title = `Арена. Лучшая игра`;
    function handleClick(evt) {
      if (evt.target.classList.contains("navigation_visible")) {
        isButtonClicked("false");
      }
    }

    function handleOnKeyDown(evt) {
      if (evt.key === "Escape") {
        isButtonClicked("false");
      }
    }
    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("click", handleClick);
    };
  });

  React.useEffect(() => {
    if (data.password === "" && data.confirmPassword === "") {
      setPasswordsMatch(false);
    } else {
      if (data.password === data.confirmPassword) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  }, [data]);

  function validateField(fieldName, value) {
    let fieldValidationErrors = validity.formErrors;
    let nameValid = validity.nameValid;
    let emailValid = validity.emailValid;
    let passwordValid = validity.passwordValid;
    let confirmPasswordValid = validity.confirmPasswordValid;
    let emailBoolean = false;
    switch (fieldName) {
      case "name":
        const letters = /^[A-Za-zА-Яа-яё -]+$/;

        if (value.length <= 2) {
          nameValid = value.length <= 2;
          fieldValidationErrors.name = nameValid ? "имя слишком короткое" : "";
        }
        if (value.length >= 30) {
          nameValid = value.length >= 30;
          fieldValidationErrors.name = nameValid ? "имя слишком длинное" : "";
        }
        if (value.length === 0) {
          nameValid = true;
          fieldValidationErrors.name = "";
        }
        if (value.length > 2 && value.length < 30) {
          if ((nameValid = value.match(letters))) {
            nameValid = false;
            fieldValidationErrors.name = "";
          } else {
            nameValid = true;
            fieldValidationErrors.name =
              "имя должно содержать только латиницу, кирилицу, пробел и дефис";
          }
        }
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "введите почту корректно";
        emailBoolean = emailValid ? false : true;
        if (value.length === 0) {
          emailBoolean = true;
          fieldValidationErrors.email = "";
        }
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "пароль сишком короткий";
        if (value.length === 0) {
          passwordValid = false;
          fieldValidationErrors.password = "";
        }
        break;
      case "confirmPassword":
        confirmPasswordValid = value.length >= 6;
        fieldValidationErrors.confirmPassword = confirmPasswordValid
          ? ""
          : "пароль сишком короткий";
        if (value.length === 0) {
          confirmPasswordValid = false;
          fieldValidationErrors.confirmPassword = "";
        }

        if (passwordsMatch === true) {
          fieldValidationErrors.passwordsMatch = "пароли совпадают";
        } else {
          fieldValidationErrors.passwordsMatch = "";
        }
        break;
      default:
        break;
    }

    setValidity({
      formErrors: fieldValidationErrors,
      emailValid: !emailBoolean,
      passwordValid: passwordValid,
      nameValid: nameValid,
      passwordsMatch: passwordsMatch,
      formValidReg:
        emailValid &&
        passwordValid &&
        confirmPasswordValid &&
        !nameValid &&
        passwordsMatch &&
        data.birthday !== "" &&
        data.race !== "" &&
        data.sex !== "" &&
        data.accept !== "",
    });
  }

  React.useEffect(() => {
    validateField("confirmPassword", data.confirmPassword);
  }, [passwordsMatch]);

  React.useEffect(() => {
    validateField("confirmPassword", data.confirmPassword);
    console.log(data)
    console.log(validity.formValidReg)
  }, [data]);

  function isButtonClicked(click) {
    if (click === "true") {
      isHeaderButtonClicked(true);
    }
    if (click === "false") {
      isHeaderButtonClicked(false);
    }
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/">
          <Register
            isButtonClicked={isButtonClicked}
            validity={validity}
            validateField={validateField}
            isOpen={open}
            setIsOpen={isOpen}
            data={data}
            setData={setData}
            passwordsMatch={passwordsMatch}
          />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
