import "./CategoryBadge.css";

const CATEGORY_STYLES = {
  "Web Development": { bg: "#E0F2FE", text: "#0369A1" },
  Python: { bg: "#FEF3C7", text: "#92400E" },
  "UX Design": { bg: "#DCFCE7", text: "#15803D" },
  "Business Analytics": { bg: "#FFE4E6", text: "#9F1239" },
  AI: { bg: "#F3E8FF", text: "#7E22CE" },
};
const DEFAULT_STYLE = { bg: "#E5E7EB", text: "#374151" };

export default function CategoryBadge({ category }) {
  const colors = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;

  return (
    <span
      className="category-badge"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  );
}
