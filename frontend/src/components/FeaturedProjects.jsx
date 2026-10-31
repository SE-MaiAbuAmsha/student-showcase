import ProjectCard from "./ProjectCard";
import "./FeaturedProjects.css";

import weatherImg from "../assets/projects/weather-dashboard.jpeg";
import budgetImg from "../assets/projects/budget-buddy.jpeg";
import quizImg from "../assets/projects/student-quiz-bot.jpeg";

export default function FeaturedProjects() {
  const dummyProjects = [
    {
      id: 1,
      title: "Weather Dashboard",
      author: "Sara",
      description:
        "A responsive dashboard that shows a five-day forecast for any city with live radar overlay.",
      category: "Web",
      image: weatherImg,
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
    },
    {
      id: 2,
      title: "Budget Buddy",
      author: "Lina",
      description:
        "A simple app to track daily spending, visualize recurring expenses, and set monthly limits.",
      category: "UI/UX",
      image: budgetImg,
      githubUrl: "https://github.com",
      demoUrl: "https://example.com",
    },
    {
      id: 3,
      title: "Study Quiz Bot",
      author: "Noor",
      description:
        "A conversational bot that converts raw lecture notes into interactive flashcards and practice questions.",
      category: "AI",
      image: quizImg,
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
          <a href="#" className="view-all">
            View all projects →
          </a>
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
