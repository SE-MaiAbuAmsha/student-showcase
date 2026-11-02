import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import "./ShareProject.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dummyData = {
    id: id,
    title: "Weather Dashboard",
    category: "Web",
    description:
      "A responsive dashboard that shows a five-day forecast with radar map.",
    githubUrl: "https://github.com/paper-airplanes-fellows/weather-app",
    demoUrl: "https://weather-telemetry-demo.app",
    imageUrl:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=500&q=60",
  };

  const handleSave = (data) => {
    console.log("Updated Project Data:", data);
    navigate("/profile");
  };

  return (
    <div className="share-project-page">
      <div className="share-project-header">
        <button onClick={() => navigate(-1)} className="back-btn">
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
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to My Profile
        </button>
        <h1>Edit Project</h1>
        <p>Update your details, external repositories, and preview banner.</p>
      </div>

      <ProjectForm
        initialData={dummyData}
        onSave={handleSave}
        onCancel={() => navigate("/profile")}
      />
    </div>
  );
}
