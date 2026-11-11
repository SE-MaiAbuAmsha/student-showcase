import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { api } from "../api";
import "./Profile.css";

export default function Profile() {
  const userName = localStorage.getItem("userName") ?? "";
  const userEmail = localStorage.getItem("userEmail") ?? "";

  const [showWelcome, setShowWelcome] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api(`/api/projects.php?mine=1&student_id=${userId}`)
      .then(setMyProjects)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await api(`/api/delete_project.php?id=${projectToDelete.id}`, {
        method: "DELETE",
      });
      setMyProjects((current) =>
        current.filter((p) => p.id !== projectToDelete.id),
      );
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setProjectToDelete(null);
    }
  };

  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="profile-page">
      <main className="profile-content">
        {showWelcome && (
          <div className="welcome-banner">
            <div className="wave-emoji">👋</div>
            <h1>Welcome back, {userName}!</h1>
          </div>
        )}

        <div className="profile-header-card">
          <div className="profile-info">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-details">
              <h1>{userName}</h1>
              <p>✉️ {userEmail}</p>
            </div>
          </div>
        </div>

        <div className="projects-section">
          <div className="profile-section-header">
            <h2>
              My Projects{" "}
              <span className="project-count">
                ({myProjects.length}{" "}
                {myProjects.length === 1 ? "project" : "projects"})
              </span>
            </h2>
            <Link to="/share-project" className="add-project-btn">
              + Add New Project
            </Link>
          </div>

          {loadError && <p role="alert">{loadError}</p>}

          {loading ? (
            <p>Loading your projects...</p>
          ) : myProjects.length === 0 ? (
            <p>You haven't shared any projects yet.</p>
          ) : (
            <div className="profile-projects-grid">
              {myProjects.map((project) => (
                <div key={project.id} className="simple-project-card">
                  <div className="simple-card-header">
                    <CategoryBadge category={project.category} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="simple-card-footer">
                    <div className="card-actions">
                      <Link
                        to={`/edit-project/${project.id}`}
                        className="action-btn edit"
                      >
                        ✎ Edit
                      </Link>
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => setProjectToDelete(project)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="view-project-link"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmDeleteModal
        isOpen={projectToDelete !== null}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
        projectTitle={projectToDelete?.title}
      />
    </div>
  );
}
