import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Women in Tech, home">
        <Logo />
      </Link>

      <nav className="navbar__links">
        <Link to="/projects" className="nav-link">
          Browse Projects
        </Link>
        <Link to="/login" className="nav-link">
          Log in
        </Link>
        <Link to="/signup" className="nav-btn">
          Sign up
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
