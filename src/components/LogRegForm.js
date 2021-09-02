import Logo from "../images/logo.png"

function LogRegForm(props) {

  return (
    <div className="logreg">
      <div className="logreg__container">
        <img className="logreg__logo" alt="Логотип" src={Logo}></img>
        <form
          onSubmit={props.submit}
          className="logreg__form"
          name="logreg__form"
          id="logreg__form"
          noValidate
          method="POST"
        >
          {props.children}
          <button
            type="submit"
            className={`logreg__button ${!props.formValid ? "logreg__button_inactive " : " "}${props.route === "login" ? "logreg__button_margin" : ""}`}
            id={props.idButton}
            aria-label={props.ariaLabel}
            disabled={!props.formValid}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogRegForm;
