import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-left">
          <p>© 2026 Paper Airplanes Showcase • Women in Tech</p>
        </div>

        <div className="footer-right">
          <Link to="/projects">Browse Projects</Link>
          <Link to="/signup">Share a Project</Link>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </footer>
  );
}
