import "./CategoryBadge.css";

const CATEGORY_STYLES = {
  Web: { bg: "#E0F2FE", text: "#0369A1" },
  "UI/UX": { bg: "#DCFCE7", text: "#15803D" },
  AI: { bg: "#F3E8FF", text: "#7E22CE" },
  Data: { bg: "#FEF3C7", text: "#92400E" },
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
