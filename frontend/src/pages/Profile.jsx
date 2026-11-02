import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  // Initialize state with the userName from localStorage
  const [userName] = useState(() => localStorage.getItem("userName"));

  // State to control the visibility of the welcome banner
  const [showWelcome, setShowWelcome] = useState(true);

  // useEffect to automatically hide the welcome banner after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Route Protection: If there's no userName, redirect to the login page
  if (!userName) return <Navigate to="/login" replace />;

  // Dummy data for projects (to be replaced with real API data later)
  const myProjects = [
    { id: 1, title: "Weather Dashboard", category: "Web" },
    { id: 2, title: "My Portfolio", category: "UI/UX" },
  ];

  return (
    <div className="profile-page">
      {/* Main content area, no internal header since we use the global Navbar */}
      <main className="profile-content">
        {/* Conditional rendering for the welcome banner */}
        {showWelcome && (
          <div className="welcome-banner">
            <div className="wave-emoji">👋</div>
            <h1>Welcome back, {userName}!</h1>
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Projects</h3>
            {/* Display the number of projects */}
            <p className="stat-number">{myProjects.length}</p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <div className="section-header">
            <h2>My Projects</h2>
            <button className="add-project-btn">+ Add New Project</button>
          </div>

          <div className="projects-list">
            {/* Mapping through the projects array to render each project item */}
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
