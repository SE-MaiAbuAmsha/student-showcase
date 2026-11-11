import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  // Check if a user is logged in
  const userName = localStorage.getItem("userName");

  const handleLogout = async () => {
    try {
      await fetch("/api/logout.php", { method: "POST" }); // destroy the server session
    } catch {
      // The server is unreachable: we still clear the browser data below.
    }
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="navbar">
      <Logo />

      <nav className="navbar__links">
        <Link to="/projects" className="nav-link">
          Browse Projects
        </Link>

        {userName ? (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="nav-icon-btn"
              title="My Profile"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--cream)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            <button
              onClick={handleLogout}
              className="nav-icon-btn"
              title="Log Out"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--cream)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
            <Link to="/signup" className="nav-btn">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
