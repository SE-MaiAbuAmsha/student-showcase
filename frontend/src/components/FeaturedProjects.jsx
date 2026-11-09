import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const [featured, setFeatured] = useState([]);
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
        // Get only the first 3 projects for the featured section
        setFeatured(formattedData.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading featured projects...</p>;

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Student Creations</h2>
            <p className="section-subtitle">
              Projects built by students in the program
            </p>
          </div>
          <Link to="/projects" className="view-all">
            View all projects →
          </Link>
        </div>

        <div className="projects-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
