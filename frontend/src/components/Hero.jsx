import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">Women in Tech · Paper Airplanes</p>

      <h1 className="hero__title">
        Where women in tech show what they have built.
      </h1>

      <p className="hero__text">
        A showcase of student projects from the Paper Airplanes community, built
        by women and seen by the world.
      </p>

      <div className="hero__actions">
        <a href="#" className="hero__btn hero__btn--primary">
          Explore projects
        </a>
        <a href="#" className="hero__btn hero__btn--outline">
          Join as a student
        </a>
      </div>
    </section>
  );
}

export default Hero;
