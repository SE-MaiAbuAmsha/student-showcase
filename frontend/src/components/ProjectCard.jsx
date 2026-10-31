import { Link } from "react-router-dom";
import "./ProjectCard.css";

const CATEGORY_STYLES = {
  Web: { bg: "#E0F2FE", text: "#0369A1" },
  "UI/UX": { bg: "#DCFCE7", text: "#15803D" },
  AI: { bg: "#F3E8FF", text: "#7E22CE" },
  Data: { bg: "#FEF3C7", text: "#92400E" },
};
const DEFAULT_STYLE = { bg: "#E5E7EB", text: "#374151" };

export default function ProjectCard({
  id,
  category,
  title,
  author,
  description,
  githubUrl,
  demoUrl,
  image, // <-- ضفنا الصورة هون
}) {
  const colors = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;

  return (
    <div className="project-card">
      {/* كتلة الصورة */}
      <div className="card-image-wrapper">
        {image ? (
          <img src={image} alt={title} className="project-image" />
        ) : (
          <div className="project-image-placeholder">No Image</div>
        )}
      </div>

      <div className="card-content">
        <span
          className="category-badge"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {category}
        </span>
        <h3 className="card-title">{title}</h3>
        <p className="card-author">by {author}</p>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <div className="card-links">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                &lt;&gt; Code
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            )}
          </div>
          <Link to={`/projects/${id}`} className="view-link">
            View project →
          </Link>
        </div>
      </div>
    </div>
  );
}
