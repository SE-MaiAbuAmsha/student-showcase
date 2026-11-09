import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import CategoryChips from "../components/CategoryChips";
import SearchBar from "../components/SearchBar";
import { CATEGORIES } from "../data/projects";
import "./Projects.css";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from the PHP API
  useEffect(() => {
    fetch("/api/projects.php")
      .then((res) => res.json())
      .then((data) => {
        // Map the data to match the keys expected by ProjectCard
        const formattedData = data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          author: p.author,
          imageUrl: p.image_url,
          githubUrl: p.github_url,
          demoUrl: p.demo_url,
        }));
        setProjects(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
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

  if (loading) return <p className="container">Loading projects...</p>;

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
        <p className="projects-count" aria-live="polite">
          Showing {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="projects-page__grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Projects;
