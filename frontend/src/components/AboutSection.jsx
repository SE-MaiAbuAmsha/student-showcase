import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="container about-container">
        <div className="about-content">
          <span className="about-badge">
            TUITION-FREE EDUCATION • 1-ON-1 MENTORSHIP
          </span>
          <h2 className="about-title">About Paper Airplanes Women in Tech</h2>
          <p className="about-text">
            We provide accessible, high-impact technical training to women whose
            education has been disrupted by conflict. Through personal volunteer
            mentorship and rigorous project-based curricula, graduates build
            tangible tech products and resilient digital futures.
          </p>
        </div>
        <div className="about-action">
          <a
            href="https://www.paper-airplanes.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
          >
            Learn more about our mission →
          </a>
        </div>
      </div>
    </section>
  );
}
