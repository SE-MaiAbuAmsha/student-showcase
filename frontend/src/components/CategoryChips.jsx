import "./CategoryChips.css";

function CategoryChips({ categories, selected, onSelect }) {
  const options = ["All", ...categories];

  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {options.map((name) => (
        <button
          key={name}
          type="button"
          className={`chip ${selected === name ? "chip--active" : ""}`}
          aria-pressed={selected === name}
          onClick={() => onSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
