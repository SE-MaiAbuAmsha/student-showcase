import "./ProjectCard.css";

export default function ProjectCard({
  category,
  title,
  author,
  description,
  categoryColor,
}) {
  return (
    <div className="project-card">
      {/* الجزء العلوي: الصورة أو الـ Mockup */}
      <div className="card-image-wrapper">
        {/* هون بنحط الصورة اللي بتظهر بالنص، حالياً حطينا لون */}
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
      </div>

      {/* الجزء السفلي: التفاصيل */}
      <div className="card-content">
        <span
          className="category-badge"
          style={{
            backgroundColor: categoryColor.bg,
            color: categoryColor.text,
          }}
        >
          {category}
        </span>
        <h3 className="card-title">{title}</h3>
        <p className="card-author">by {author}</p>
        <p className="card-desc">{description}</p>

        <div className="card-footer">
          <div className="card-links">
            <a href="#">&lt;&gt; Code</a>
            <a href="#">🌐 Demo</a>
          </div>
          <a href="#" className="view-link">
            View project →
          </a>
        </div>
      </div>
    </div>
  );
}
