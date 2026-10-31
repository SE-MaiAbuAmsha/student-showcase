import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Logo />
      <nav className="navbar__links">
        <Link to="/projects">Browse Projects</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup" className="navbar__cta">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
