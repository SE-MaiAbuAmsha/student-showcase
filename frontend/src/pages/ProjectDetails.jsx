import { Link, useParams } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ProjectImage from "../components/ProjectImage";
import { SAMPLE_PROJECTS } from "../data/projects";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const project = SAMPLE_PROJECTS.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="container details">
        <Link to="/projects" className="details__back">
          ← Back to Projects
        </Link>
        <div className="details__missing">
          <h1 className="details__title">Project not found</h1>
          <p>This project doesn't exist or was removed.</p>
          <Link to="/projects" className="details__btn details__btn--primary">
            Browse projects
          </Link>
        </div>
      </div>
    );
  }

  const { title, description, category, imageUrl, githubUrl, demoUrl, author } =
    project;

  // TEMP: will come from the logged-in user later
  const isOwner = true;

  return (
    <div className="container details">
      <Link to="/projects" className="details__back">
        ← Back to Projects
      </Link>

      <article className="details__card">
        <header className="details__header">
          <div>
            <CategoryBadge category={category} />
            <h1 className="details__title">{title}</h1>
            <p className="details__author">
              by <strong>{author}</strong>
            </p>
          </div>

          {isOwner && (
            <div className="details__owner">
              <Link
                to={`/projects/${project.id}/edit`}
                className="details__btn"
              >
                Edit
              </Link>
              <button
                type="button"
                className="details__btn details__btn--danger"
                onClick={() => {
                  // TODO: open ConfirmDeleteModal (step 7)
                }}
              >
                Delete
              </button>
            </div>
          )}
        </header>

        <div className="details__image">
          <ProjectImage imageUrl={imageUrl} title={title} />
        </div>

        <h2 className="details__subtitle">About the project</h2>
        <p className="details__text">{description}</p>

        <div className="details__actions">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="details__btn details__btn--primary"
            >
              Live demo ↗
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="details__btn"
          >
            View on GitHub
          </a>
        </div>
      </article>
    </div>
  );
}

export default ProjectDetails;
