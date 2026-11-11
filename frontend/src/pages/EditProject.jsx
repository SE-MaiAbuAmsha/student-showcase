import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectForm from "../components/ProjectForm";
import { api } from "../api";
import "./ShareProject.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    api(`/api/project.php?id=${id}`)
      .then((data) => {
        if (String(data.studentId) !== currentUserId) {
          setError("You can only edit your own projects.");
          return;
        }
        setProject({
          ...data,
          imageUrl: data.imageUrl ?? "",
          githubUrl: data.githubUrl ?? "",
          demoUrl: data.demoUrl ?? "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, currentUserId]);

  const handleConfirmDelete = async () => {
    try {
      await api(`/api/delete_project.php?id=${id}`, { method: "DELETE" });
      navigate("/profile");
    } catch (err) {
      setIsModalOpen(false);
      setDeleteError(err.message);
    }
  };

  if (loading) {
    return <div className="share-project-page">Loading project...</div>;
  }

  if (error) {
    return (
      <div className="share-project-page">
        <div className="share-project-header">
          <BackLink to="/profile">Back to My Profile</BackLink>
          <h1>Project not found</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="share-project-page">
      <div className="share-project-header">
        <BackLink to="/profile">Back to My Profile</BackLink>
        <h1>Edit Project</h1>
        <p>Update your details, external repositories, and preview banner.</p>
        {deleteError && (
          <p className="form-error" role="alert">
            {deleteError}
          </p>
        )}
      </div>

      <ProjectForm
        initialData={project}
        onSave={() => navigate("/profile")}
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
