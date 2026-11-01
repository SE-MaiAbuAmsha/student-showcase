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
  title,
  description,
  category,
  imageUrl,
  githubUrl,
  demoUrl,
  author,
}) {
  const colors = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;

  return (
    <article className="project-card">
      <div className="card-image-wrapper">
        {imageUrl ? (
          <img
            className="card-image"
            src={imageUrl}
            alt={`Preview of ${title}`}
          />
        ) : (
          <div className="mockup-placeholder">
            <div className="mockup-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="mockup-line long"></div>
            <div className="mockup-line short"></div>
            <div className="mockup-btn"></div>
          </div>
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
    </article>
  );
}
