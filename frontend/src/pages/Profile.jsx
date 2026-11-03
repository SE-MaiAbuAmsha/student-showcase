import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { MOCK_CURRENT_AUTHOR, SAMPLE_PROJECTS } from "../data/projects";
import "./Profile.css";

export default function Profile() {
  const userName = localStorage.getItem("userName") ?? "";
  const userEmail = localStorage.getItem("userEmail") ?? "";

  const [showWelcome, setShowWelcome] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // TEMP: the logged-in student's projects come from the sample data
  const [myProjects, setMyProjects] = useState(() =>
    SAMPLE_PROJECTS.filter((p) => p.author === MOCK_CURRENT_AUTHOR),
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmDelete = () => {
    // TODO: call the API (DELETE) when the back end exists
    setMyProjects((current) =>
      current.filter((p) => p.id !== projectToDelete.id),
    );
    setProjectToDelete(null);
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

          {myProjects.length === 0 ? (
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
