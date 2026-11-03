import weatherImg from "../assets/projects/weather-dashboard.jpeg";
import budgetImg from "../assets/projects/budget-buddy.jpeg";
import quizImg from "../assets/projects/student-quiz-bot.jpeg";

export const CATEGORIES = ["Web", "UI/UX", "AI", "Data"];

// TEMP: until the API exists, the logged-in student is treated as "Sara"
export const MOCK_CURRENT_AUTHOR = "Sara";

export const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Weather Dashboard",
    description:
      "A responsive dashboard that shows a five-day forecast for any city with live radar overlay.",
    category: "Web",
    imageUrl: weatherImg,
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    author: "Sara",
  },
  {
    id: 2,
    title: "Budget Buddy",
    description:
      "A simple app to track daily spending, visualize recurring expenses, and set monthly limits.",
    category: "UI/UX",
    imageUrl: budgetImg,
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Lina",
  },
  {
    id: 3,
    title: "Study Quiz Bot",
    description:
      "A conversational bot that converts raw lecture notes into interactive flashcards and practice questions.",
    category: "AI",
    imageUrl: quizImg,
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    author: "Noor",
  },
  {
    id: 4,
    title: "Library Manager",
    description:
      "Catalogue, borrowing workflows, and return tracking built for community and school libraries.",
    category: "Web",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Huda",
  },
  {
    id: 5,
    title: "Sales Insights",
    description:
      "Charts and summaries built from a year of anonymous sales data.",
    category: "Data",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    author: "Dana",
  },
  {
    id: 6,
    title: "Portfolio Redesign",
    description:
      "A case study redesigning a personal portfolio for clarity and accessibility.",
    category: "UI/UX",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Sara",
  },
  {
    id: 7,
    title: "Plant Care Reminder",
    description: "Watering reminders and care tips for houseplants.",
    category: "UI/UX",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Maya",
  },
];
