import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectForm from "../components/ProjectForm";
import { MOCK_CURRENT_AUTHOR, SAMPLE_PROJECTS } from "../data/projects";
import "./ShareProject.css";
import BackLink from "../components/BackLink";

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
          <BackLink to="/profile">Back to My Profile</BackLink>
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
        <BackLink to="/profile">Back to My Profile</BackLink>
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
