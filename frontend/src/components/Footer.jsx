import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const isLoggedIn = Boolean(localStorage.getItem("userName"));

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <p className="footer-left">
          © 2026 Paper Airplanes Showcase · Women in Tech
        </p>

        <nav className="footer-right" aria-label="Footer">
          <Link to="/projects">Browse Projects</Link>
          {isLoggedIn ? (
            <Link to="/share-project">Share a Project</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </nav>
      </div>
    </footer>
  );
}
