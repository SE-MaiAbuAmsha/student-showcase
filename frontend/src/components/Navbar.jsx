import Logo from "./Logo.jsx";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar__brand">
        <Logo />
        <div className="navbar__titles">
          <b>Women in Tech</b>
          <small>Student Showcase · Paper Airplanes</small>
        </div>
      </a>

      <nav className="navbar__links">
        <a href="#">Browse Projects</a>
        <a href="#">Login</a>
        <a href="#" className="navbar__signup">
          Sign Up
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
