import "./ProjectImage.css";

export default function ProjectImage({ imageUrl, title }) {
  if (imageUrl) {
    return (
      <img
        className="project-image"
        src={imageUrl}
        alt={`Preview of ${title}`}
      />
    );
  }

  return (
    <div className="mockup-placeholder" aria-hidden="true">
      <div className="mockup-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="mockup-line long"></div>
      <div className="mockup-line short"></div>
      <div className="mockup-btn"></div>
    </div>
  );
}
