import { Link } from "react-router-dom";
import "./BackLink.css";

export default function BackLink({ to, children, variant = "dark" }) {
  return (
    <Link to={to} className={`backlink backlink--${variant}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>{children}</span>
    </Link>
  );
}
