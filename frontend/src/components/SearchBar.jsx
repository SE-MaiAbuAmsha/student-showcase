import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="project-search" className="visually-hidden">
        Search projects by title
      </label>

      <svg
        className="search__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        id="project-search"
        type="search"
        className="search__input"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
