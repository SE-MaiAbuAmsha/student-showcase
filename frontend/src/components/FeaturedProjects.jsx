import ProjectCard from "./ProjectCard";
import "./FeaturedProjects.css";
import { Link } from "react-router-dom";

export default function FeaturedProjects() {
  // بيانات وهمية (حالياً) لحد ما نربطها بالباك إند
  const dummyProjects = [
    {
      id: 1,
      title: "Weather Dashboard",
      author: "Sara",
      category: "Web",
      description:
        "A responsive dashboard that shows a five-day forecast for any city with live radar overlay.",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
    },
    {
      id: 2,
      title: "Budget Buddy",
      author: "Lina",
      category: "UI/UX",
      description:
        "A simple app to track daily spending, visualize recurring expenses, and set monthly limits.",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
    },
    {
      id: 3,
      title: "Study Quiz Bot",
      author: "Noor",
      category: "AI",
      description:
        "A conversational bot that converts raw lecture notes into interactive flashcards and practice questions.",
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
    },
  ];

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
          {dummyProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
