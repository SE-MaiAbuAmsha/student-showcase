import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ProjectImage from "../components/ProjectImage";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the project details from the API
  useEffect(() => {
    fetch(`/api/project.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Map snake_case to camelCase for the UI
          setProject({
            id: data.id,
            title: data.title,
            description: data.description,
            category: data.category,
            author: data.author,
            imageUrl: data.image_url,
            githubUrl: data.github_url,
            demoUrl: data.demo_url,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load the project.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="container">Loading project details...</p>;

  if (error || !project) {
    return (
      <div className="container details">
        <Link to="/projects" className="details__back">
          ← Back to Projects
        </Link>
        <div className="details__missing">
          <h1 className="details__title">Project not found</h1>
          <p>{error || "This project doesn't exist or was removed."}</p>
          <Link to="/projects" className="details__btn details__btn--primary">
            Browse projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container details">
      <Link to="/projects" className="details__back">
        ← Back to Projects
      </Link>

      <article className="details__card">
        <header className="details__header">
          <div>
            <CategoryBadge category={project.category} />
            <h1 className="details__title">{project.title}</h1>
            <p className="details__author">
              by <strong>{project.author}</strong>
            </p>
          </div>
        </header>

        <div className="details__image">
          <ProjectImage imageUrl={project.imageUrl} title={project.title} />
        </div>

        <h2 className="details__subtitle">About the project</h2>
        <p className="details__text">{project.description}</p>

        <div className="details__actions">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="details__btn details__btn--primary"
            >
              Live demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="details__btn"
            >
              View on GitHub
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

export default ProjectDetails;
