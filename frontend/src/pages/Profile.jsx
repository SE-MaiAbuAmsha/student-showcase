import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"; // استدعاء المودال
import "./Profile.css";

export default function Profile() {
  const [userName] = useState(() => localStorage.getItem("userName"));
  const [showWelcome, setShowWelcome] = useState(true);

  // State for managing the delete modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Dummy projects data
  const [myProjects, setMyProjects] = useState([
    { id: 1, title: "Weather Dashboard", category: "Web" },
    { id: 2, title: "My Portfolio", category: "UI/UX" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!userName) return <Navigate to="/login" replace />;

  // Function to open the modal and store the project to delete
  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  // Function to actually delete the project
  const handleConfirmDelete = () => {
    setMyProjects(myProjects.filter((p) => p.id !== projectToDelete.id));
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="profile-page">
      <main className="profile-content">
        {showWelcome && (
          <div className="welcome-banner">
            <div className="wave-emoji">👋</div>
            <h1>Welcome back, {userName}!</h1>
          </div>
        )}

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Projects</h3>
            <p className="stat-number">{myProjects.length}</p>
          </div>
        </div>

        <div className="projects-section">
          <div className="section-header">
            <h2>My Projects</h2>
            <button className="add-project-btn">+ Add New Project</button>
          </div>

          <div className="projects-list">
            {myProjects.map((project) => (
              <div key={project.id} className="project-item">
                <div>
                  <h3>{project.title}</h3>
                  <span className="category">{project.category}</span>
                </div>
                <div className="actions">
                  <button className="edit-btn">Edit</button>
                  {/* هنا بنستدعي دالة فتح المودال */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(project)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* المودال بيتحط برا الـ main عشان يطلع فوق كل حاجة */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={projectToDelete?.title}
      />
    </div>
  );
}
