import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import "./Profile.css";

export default function Profile() {
  // Get user info from localStorage
  const userName = localStorage.getItem("userName") ?? "Student";
  const userEmail = localStorage.getItem("userEmail") ?? "student@example.com";
  const userId = localStorage.getItem("userId");

  const [showWelcome, setShowWelcome] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // State for the projects (start with empty array, not dummy data)
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Hide welcome banner after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Fetch the user's projects from the API
  useEffect(() => {
    if (!userId) return; // If not logged in, do nothing

    fetch(`/api/projects.php?student_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // Map the data to match the keys expected in the UI
        const formattedData = data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          author: p.author,
          imageUrl: p.image_url,
          githubUrl: p.github_url,
          demoUrl: p.demo_url,
        }));
        setMyProjects(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my projects:", err);
        setLoading(false);
      });
  }, [userId]);

  // 3. Handle deleting a project
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      // Send DELETE request to the API
      const response = await fetch(
        `/api/delete_project.php?id=${projectToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        // If successful, remove it from the UI state
        setMyProjects((current) =>
          current.filter((p) => p.id !== projectToDelete.id),
        );
        setProjectToDelete(null);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete project.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Could not connect to the server.");
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
