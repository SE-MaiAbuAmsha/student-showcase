import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";
import ShareProject from "./pages/ShareProject";
import EditProject from "./pages/EditProject";
function App() {
  return (
    <Router>
      <Routes>
        {/* 
          Routes wrapped in <Layout /> will include the Navbar and Footer.
          These are the main pages of the application.
        */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/share-project" element={<ShareProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          {/* Moved Profile here so it gets the global Navbar and Footer */}
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 
          Auth pages (Login & Signup) are OUTSIDE the Layout.
          This is because they have their own custom header (Logo + Back button) 
          and shouldn't show the main Navbar or Footer.
        */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
