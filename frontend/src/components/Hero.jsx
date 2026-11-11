import { Link, useLocation } from "react-router-dom";
import PlaneField from "./PlaneField";
import "./Hero.css";

function Hero() {
  const location = useLocation();

  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!userName;

  return (
    <section className="hero">
      <PlaneField />

      <div className="hero__content">
        <p className="hero__eyebrow">Women in Tech · Paper Airplanes</p>
        <h1 className="hero__title">
          Where women in tech show what they have built.
        </h1>
        <p className="hero__text">
          A showcase of student projects from the Paper Airplanes community,
          built by women and seen by the world.
        </p>
        <div className="hero__actions">
          <Link to="/projects" className="hero__btn hero__btn--primary">
            Explore projects
          </Link>

          {isLoggedIn ? (
            <Link to="/share-project" className="hero__btn hero__btn--outline">
              Share a Project
            </Link>
          ) : (
            <Link to="/signup" className="hero__btn hero__btn--outline">
              Join as a student
            </Link>
          )}
        </div>
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
