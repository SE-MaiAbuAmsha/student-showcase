import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  // Initialize state with the userName from localStorage
  const [userName] = useState(() => localStorage.getItem("userName"));

  // State to control the visibility of the welcome banner
  const [showWelcome, setShowWelcome] = useState(true);

  // State to toggle between the project list and the form
  const [showForm, setShowForm] = useState(false);

  // State to store the project being edited (null means we are adding a new one)
  const [editingProject, setEditingProject] = useState(null);

  // Dummy data for projects (We use state so we can update it when adding/editing)
  const [myProjects, setMyProjects] = useState([
    {
      id: 1,
      title: "Weather Dashboard",
      category: "Web",
      description: "A weather app.",
    },
    {
      id: 2,
      title: "My Portfolio",
      category: "UI/UX",
      description: "My personal website.",
    },
  ]);

  // useEffect to automatically hide the welcome banner after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Route Protection: If there's no userName, redirect to the login page
  if (!userName) return <Navigate to="/login" replace />;

  // Function to handle saving the project (both creating and updating)
  const handleSaveProject = (projectData) => {
    if (editingProject) {
      // If editing, update the existing project in the list
      setMyProjects(
        myProjects.map((p) =>
          p.id === editingProject.id ? { ...p, ...projectData } : p,
        ),
      );
    } else {
      // If creating, add a new project to the list
      const newProject = {
        ...projectData,
        id: Date.now(), // Generate a temporary ID
      };
      setMyProjects([...myProjects, newProject]);
    }

    // Reset form and editing states
    setShowForm(false);
    setEditingProject(null);
  };

  // Function to open the form for editing
  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

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
            {/* Display the number of projects dynamically */}
            <p className="stat-number">{myProjects.length}</p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          {/* If showForm is true, render the ProjectForm, otherwise render the list */}
          {showForm ? (
            <ProjectForm
              initialData={editingProject}
              onSave={handleSaveProject}
              onCancel={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
            />
          ) : (
            <>
              <div className="section-header">
                <h2>My Projects</h2>
                <Link to="/share-project" className="add-project-btn">
                  + Add New Project
                </Link>
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
                      {/* Pass the project data to the edit handler */}
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(project)}
                      >
                        Edit
                      </button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
