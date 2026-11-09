import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ProjectForm from "../components/ProjectForm";
import BackLink from "../components/BackLink";
import "./ShareProject.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // States for fetching data
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserId = localStorage.getItem("userId");

  // Fetch the project from the API when the component mounts
  useEffect(() => {
    fetch(`/api/project.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Check if the logged-in user is the owner of the project
          // Note: The API returns student_id as a number, localStorage as a string
          if (String(data.student_id) !== String(currentUserId)) {
            setError("You can only edit your own projects.");
          } else {
            // Map the data to match ProjectForm's expected keys
            setProject({
              id: data.id,
              title: data.title,
              category: data.category,
              description: data.description,
              githubUrl: data.github_url,
              demoUrl: data.demo_url,
              imageUrl: data.image_url,
            });
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load the project.");
        setLoading(false);
      });
  }, [id, currentUserId]);

  const handleSave = () => {
    // The actual update happens inside ProjectForm.jsx
    navigate("/profile");
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/delete_project.php?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setIsModalOpen(false);
        navigate("/profile");
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="share-project-page container">Loading project...</div>;
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