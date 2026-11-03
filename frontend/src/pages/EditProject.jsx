import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectForm from "../components/ProjectForm";
import { MOCK_CURRENT_AUTHOR, SAMPLE_PROJECTS } from "../data/projects";
import "./ShareProject.css";

function BackArrow() {
  return (
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
  );
}

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = SAMPLE_PROJECTS.find((p) => p.id === Number(id));
  const canEdit = project && project.author === MOCK_CURRENT_AUTHOR;

  if (!canEdit) {
    return (
      <div className="share-project-page">
        <div className="share-project-header">
          <Link to="/profile" className="back-btn">
            <BackArrow />
            Back to My Profile
          </Link>
          <h1>Project not found</h1>
          <p>You can only edit your own projects.</p>
        </div>
      </div>
    );
  }

  const handleSave = (data) => {
    // TODO: call the API (PUT) when the back end exists
    console.log("Updated project data:", data);
    navigate("/profile");
  };

  const handleConfirmDelete = () => {
    // TODO: call the API (DELETE) when the back end exists
    setIsModalOpen(false);
    navigate("/profile");
  };

  return (
    <div className="share-project-page">
      <div className="share-project-header">
        <Link to="/profile" className="back-btn">
          <BackArrow />
          Back to My Profile
        </Link>
        <h1>Edit Project</h1>
        <p>Update your details, external repositories, and preview banner.</p>
      </div>

      <ProjectForm
        initialData={project}
        onSave={handleSave}
        onCancel={() => navigate("/profile")}
        onDelete={() => setIsModalOpen(true)}
      />

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={project.title}
      />
    </div>
  );
}
