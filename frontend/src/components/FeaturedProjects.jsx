import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { api } from "../api";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/projects.php")
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((err) => setError(err.message));
  }, []);

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

        {error ? (
          <p role="alert">{error}</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
