import weatherImg from "../assets/projects/weather-dashboard.jpeg";
import budgetImg from "../assets/projects/budget-buddy.jpeg";
import quizImg from "../assets/projects/student-quiz-bot.jpeg";

export const CATEGORIES = [
  "Web Development",
  "Python",
  "UX Design",
  "Business Analytics",
  "AI",
];

// TEMP: until the API exists, the logged-in student is treated as "Sara"
export const MOCK_CURRENT_AUTHOR = "Sara";

export const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Weather Dashboard",
    description:
      "A responsive dashboard that shows a five-day forecast for any city with live radar overlay.",
    category: "Web Development",
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
    category: "UX Design",
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
    category: "Web Development",
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
    category: "Business Analytics",
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
    category: "UX Design",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Sara",
  },
  {
    id: 7,
    title: "Plant Care Reminder",
    description: "Watering reminders and care tips for houseplants.",
    category: "UX Design",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Maya",
  },
  {
    id: 8,
    title: "Habit Tracker",
    description:
      "A Python command-line tool that tracks daily habits and shows weekly streaks.",
    category: "Python",
    imageUrl: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    author: "Dana",
  },
];
