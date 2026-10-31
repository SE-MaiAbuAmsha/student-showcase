import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Profile.css";

export default function Dashboard() {
  const [userName] = useState(() => localStorage.getItem("userName"));
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!userName) return <Navigate to="/login" replace />;

  const myProjects = [
    { id: 1, title: "Weather Dashboard", category: "Web" },
    { id: 2, title: "My Portfolio", category: "UI/UX" },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>My Profile</h2>

        <div className="header-actions">
          <button className="profile-btn" title="Profile">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "24px", height: "24px" }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <Link
            to="/"
            className="logout-btn"
            title="Log Out"
            onClick={() => localStorage.removeItem("userName")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "24px", height: "24px" }}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </Link>
        </div>
      </header>

      <main className="dashboard-content">
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
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
