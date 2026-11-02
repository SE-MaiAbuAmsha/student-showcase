import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";
import ProjectImage from "./ProjectImage";
import "./ProjectCard.css";

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
  return (
    <article className="project-card">
      <div className="card-image-wrapper">
        <ProjectImage imageUrl={imageUrl} title={title} />
      </div>

      <div className="card-content">
        <CategoryBadge category={category} />
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
