import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { SAMPLE_PROJECTS } from "../data/projects";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const featured = SAMPLE_PROJECTS.slice(0, 3);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Student Creations</h2>
            <p className="section-subtitle">
              Projects built by students in the program
            </p>
          </div>
          <Link to="/projects" className="view-all">
            View all projects →
          </Link>
        </div>

        <div className="projects-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
