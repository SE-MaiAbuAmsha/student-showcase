import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectImage from "../components/ProjectImage";
import { api } from "../api";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    api(`/api/project.php?id=${id}`)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      await api(`/api/delete_project.php?id=${id}`, { method: "DELETE" });
      navigate("/profile");
    } catch (err) {
      setIsModalOpen(false);
      setDeleteError(err.message);
    }
  };

  if (loading) return <p className="container">Loading project details...</p>;

  if (error || !project) {
    return (
      <div className="container details">
        <BackLink to="/projects">Back to Projects</BackLink>
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

  const currentUserId = localStorage.getItem("userId");
  const isOwner =
    currentUserId !== null && String(project.studentId) === currentUserId;

  return (
    <div className="container details">
      <BackLink to="/projects">Back to Projects</BackLink>

      <article className="details__card">
        <header className="details__header">
          <div>
            <CategoryBadge category={project.category} />
            <h1 className="details__title">{project.title}</h1>
            <p className="details__author">
              by <strong>{project.author}</strong>
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

        {deleteError && (
          <p className="details__error" role="alert">
            {deleteError}
          </p>
        )}

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

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={project.title}
      />
    </div>
  );
}

export default ProjectDetails;
