import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <AboutSection />
    </>
  );
}
