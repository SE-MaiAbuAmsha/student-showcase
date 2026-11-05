import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import "./ShareProject.css";
import BackLink from "../components/BackLink";

export default function ShareProject() {
  const navigate = useNavigate();

  const handleSave = (data) => {
    console.log("Saved Data:", data);
    navigate("/profile");
  };

  return (
    <div className="share-project-page">
      <div className="share-project-header">
        <BackLink to="/projects">All projects</BackLink>
        <h1>Share a project</h1>
        <p>Tell visitors what you built and where they can see it.</p>
      </div>

      <ProjectForm onSave={handleSave} onCancel={() => navigate("/profile")} />
    </div>
  );
}
