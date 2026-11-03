import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import "./ShareProject.css";

export default function ShareProject() {
  const navigate = useNavigate();

  const handleSave = (data) => {
    console.log("Saved Data:", data);
    navigate("/profile");
  };

  return (
    <div className="share-project-page">
      <div className="share-project-header">
        <Link to="/projects" className="back-btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px" }}
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          All projects
        </Link>
        <h1>Share a project</h1>
        <p>Tell visitors what you built and where they can see it.</p>
      </div>

      <ProjectForm onSave={handleSave} onCancel={() => navigate("/profile")} />
    </div>
  );
}
