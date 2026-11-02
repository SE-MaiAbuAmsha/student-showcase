import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import "./Profile.css";

export default function Profile() {
  const [userName] = useState(
    () => localStorage.getItem("userName") || "Leslie Alexander",
  );

  const [showWelcome, setShowWelcome] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [myProjects, setMyProjects] = useState([
    {
      id: 1,
      title: "Weather Dashboard",
      category: "Web",
      description:
        "A responsive dashboard that shows a five-day forecast with radar map.",
    },
    {
      id: 2,
      title: "Budget Buddy",
      category: "UI/UX",
      description:
        "A simple app to track daily spending and set monthly limits.",
    },
  ]);

  // إخفاء رسالة الترحيب بعد 4 ثواني
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // حماية الصفحة
  if (!userName) return <Navigate to="/login" replace />;

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setMyProjects(myProjects.filter((p) => p.id !== projectToDelete.id));
    setIsModalOpen(false);
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
              <p>✉️ {userName.toLowerCase().replace(" ", ".")}@example.com</p>
            </div>
          </div>
        </div>

        {/* قسم المشاريع */}
        <div className="projects-section">
          <div className="section-header">
            <h2>
              My Projects{" "}
              <span className="project-count">
                ({myProjects.length} projects)
              </span>
            </h2>
            <Link to="/share-project" className="add-project-btn">
              + Add New Project
            </Link>
          </div>

          <div className="profile-projects-grid">
            {myProjects.map((project) => (
              <div key={project.id} className="simple-project-card">
                <div className="simple-card-header">
                  <span
                    className={`simple-badge ${project.category.toLowerCase()}`}
                  >
                    {project.category}
                  </span>
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
                    </Link>{" "}
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteClick(project)}
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
        </div>
      </main>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={projectToDelete?.title}
      />
    </div>
  );
}
