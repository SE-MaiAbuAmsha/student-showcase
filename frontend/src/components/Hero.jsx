import PlaneField from "./PlaneField.jsx"; // بدل import Plane
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__planes" aria-hidden="true">
        <PlaneField />
      </div>

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
          <a href="#" className="hero__btn hero__btn--primary">
            Explore projects
          </a>
          <a href="#" className="hero__btn hero__btn--outline">
            Join as a student
          </a>
        </div>
      </div>
      <div className="wave-container">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"
            fill="var(--cream)"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
