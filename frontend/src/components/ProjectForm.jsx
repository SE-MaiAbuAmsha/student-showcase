import { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectForm.css";

export default function ProjectForm({
  initialData = null,
  onSave,
  onCancel,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Web",
    description: initialData?.description || "",
    githubUrl: initialData?.githubUrl || "",
    demoUrl: initialData?.demoUrl || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const shortDesc =
    formData.description.length > 100
      ? formData.description.substring(0, 100) + "..."
      : formData.description;

  return (
    <div className="form-layout-wrapper">
      <div className="project-form-container">
        <form className="project-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="pf-group">
            <div className="label-row">
              <label>Project Title</label>
              <span className="required-text">Required</span>
            </div>
            <input
              type="text"
              name="title"
              className="pf-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Weather Dashboard"
              required
            />
          </div>

          {/* Category */}
          <div className="pf-group">
            <label>Category</label>
            <select
              name="category"
              className="pf-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Web">Web Development</option>
              <option value="UI/UX">UI/UX Design</option>
              <option value="AI">AI / Machine Learning</option>
              <option value="Data">Data Science</option>
            </select>
          </div>

          {/* Description */}
          <div className="pf-group">
            <div className="label-row">
              <label>Short Description</label>
              <span className="char-count">
                {formData.description.length} / 240
              </span>
            </div>
            <textarea
              name="description"
              className="pf-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your project..."
              rows="4"
              maxLength="240"
              required
            />
          </div>

          {/* Image URL */}
          <div className="pf-group">
            <label>Cover Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="pf-input"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Paste a link to your project screenshot"
            />
          </div>

          {/* GitHub & Demo URLs */}
          <div className="form-row">
            <div className="pf-group">
              <label>GitHub Repository</label>
              <div className="input-with-icon">
                <span className="input-icon">&lt;&gt;</span>
                <input
                  type="url"
                  name="githubUrl"
                  className="pf-input"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  required
                />
              </div>
            </div>

            <div className="pf-group">
              <label>Live Deployment</label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </span>
                <input
                  type="url"
                  name="demoUrl"
                  className="pf-input"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="save-btn">
              {initialData ? "Save Changes →" : "Publish project →"}
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            {initialData && (
              <button
                type="button"
                className="delete-text-btn"
                onClick={onDelete}
              >
                🗑 Delete Project
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Live Preview */}
      <div className="preview-container">
        <div className="preview-header">
          <span>👁 LIVE CARD PREVIEW</span>
        </div>
        <ProjectCard
          title={formData.title || "Project Title"}
          category={formData.category}
          description={
            shortDesc || "Your project description will appear here."
          }
          imageUrl={formData.imageUrl}
          githubUrl={formData.githubUrl}
          demoUrl={formData.demoUrl}
          author="You"
          id="preview"
        />
      </div>
    </div>
  );
}
