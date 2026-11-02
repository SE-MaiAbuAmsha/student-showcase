import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__text">
        The page you are looking for doesn't exist.
      </p>
      <Link to="/" className="not-found__btn">
        Go to home
      </Link>
    </div>
  );
}
