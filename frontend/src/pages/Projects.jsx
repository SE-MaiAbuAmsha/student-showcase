import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import CategoryChips from "../components/CategoryChips";
import SearchBar from "../components/SearchBar";
import { api } from "../api";
import { CATEGORIES } from "../data/projects";
import "./Projects.css";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/projects.php")
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesQuery = project.title.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setQuery("");
  };

  let content;
  if (loading) {
    content = <p>Loading projects...</p>;
  } else if (error) {
    content = <p role="alert">{error}</p>;
  } else if (visibleProjects.length === 0) {
    content = (
      <div className="projects-empty">
        <p className="projects-empty__title">No projects found</p>
        <p className="projects-empty__text">
          Try a different word or category.
        </p>
        <button
          type="button"
          className="projects-empty__btn"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>
    );
  } else {
    content = (
      <div className="projects-page__grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    );
  }

  return (
    <div className="container projects-page">
      <h1 className="projects-page__title">See what students are building.</h1>
      <p className="projects-page__subtitle">
        Browse student projects by category, open the code, or share your own
        capstone.
      </p>

      <SearchBar value={query} onChange={setQuery} />

      <div className="projects-toolbar">
        <CategoryChips
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {!loading && !error && (
          <p className="projects-count" aria-live="polite">
            Showing {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"}
          </p>
        )}
      </div>

      {content}
    </div>
  );
}

export default Projects;
