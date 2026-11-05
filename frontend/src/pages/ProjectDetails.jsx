import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectImage from "../components/ProjectImage";
import { MOCK_CURRENT_AUTHOR, SAMPLE_PROJECTS } from "../data/projects";
import "./ProjectDetails.css";
import BackLink from "../components/BackLink";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = SAMPLE_PROJECTS.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="container details">
        <BackLink to="/projects">Back to Projects</BackLink>
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

  const isLoggedIn = Boolean(localStorage.getItem("userName"));
  const isOwner = isLoggedIn && author === MOCK_CURRENT_AUTHOR;

  const handleConfirmDelete = () => {
    // TODO: call the API (DELETE) when the back end exists
    setIsModalOpen(false);
    navigate("/profile");
  };

  return (
    <div className="container details">
      <BackLink to="/projects">Back to Projects</BackLink>

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
              <Link to={`/edit-project/${project.id}`} className="details__btn">
                Edit
              </Link>
              <button
                type="button"
                className="details__btn details__btn--danger"
                onClick={() => setIsModalOpen(true)}
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

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={title}
      />
    </div>
  );
}

export default ProjectDetails;
