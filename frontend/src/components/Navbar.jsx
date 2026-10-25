import Logo from "./Logo.jsx";

function Navbar() {
  return (
    <header>
      <div>
        <Logo />
        <div>
          <b>Women in Tech</b>
          <small>Student Showcase · Paper Airplanes</small>
        </div>
      </div>

      <nav>
        <a href="#">Browse Projects</a>
        <a href="#">Login</a>
        <a href="#">Sign Up</a>
      </nav>
    </header>
  );
}

export default Navbar;
