import { Link } from "react-router-dom";

function Error404() {
  return (
    <section className="error">
      <div className="error__container">
        <h1 className="error__header">404</h1>
        <h2 className="error__subheader">Страница не найдена</h2>
      </div>
      <Link to="/" className="error__link">
        Назад
      </Link>
    </section>
  );
}

export default Error404;
