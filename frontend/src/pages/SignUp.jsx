import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaneField from "../components/PlaneField";
import "./Auth.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import welcomeGirl from "../assets/projects/welcome-girl.jpg";
import BackLink from "../components/BackLink";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // length check first, then the match check
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // block double clicks while the request runs
    try {
      // relative URL. The Vite proxy forwards /api to Apache.
      const response = await fetch("/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName.trim(), email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      //a clear message, nothing technical shown to the user
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false); // always enable the button again
    }
  };
  return (
    <div className="auth-page">
      <PlaneField />

      <header className="auth-header">
        <Logo />

        <BackLink to="/" variant="light">
          Back
        </BackLink>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-titles">
            <img
              src={welcomeGirl}
              alt="Women in Tech Illustration"
              className="welcome-illustration"
            />
            <h1>Welcome Student</h1>
            <p>Create an account to publish and manage your projects.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Leslie Alexander"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  placeholder="leslie.alexander@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>

            <div className="form-group">
              <label>PASSWORD</label>
              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <small className="hint">ℹ️ At least 8 characters</small>
            </div>

            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the Showcase Guidelines and code of conduct.
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn login-style"
              disabled={!agreed || loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
