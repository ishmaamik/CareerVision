import "./App.css";
import React from "react";
import Topbar from "./components/bars/Topbar"; // adjust path as needed
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Blogs from "./components/pages/Blogs";
import NewBlog from "./components/pages/NewBlog";
import Profile from "./components/pages/Profile/Profile";
import JobPage from "./components/pages/JobsList";
import CreateJob from "./components/pages/CreateJob";
import ApplyJob from "./components/pages/ApplyJob/ApplyJob";
import CreateCompany from "./components/pages/CreateCompany";
import CommunityForum from "./components/pages/Community/CommunityForum";
import SampleSocial from "./components/pages/SampleSocial";
import EmotionCapture from "./components/EmotionCapture";
import Careers from "./components/pages/Careers";
import Roadmap from "./components/pages/Roadmap";
import InterviewQuestionBank from "./components/pages/InterviewQuestionBank";
import CompaniesPage from "./components/pages/CompaniesPage";
import DynamicEvents from "./components/pages/DynamicEvents";

function App() {
  return (
    <UserProvider>
      {/* Fullscreen Dreamy Glow Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: "#fefcff",
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
          `,
        }}
      ></div>
      {}
      <div className="min-h-screen flex flex-col text-black">
        <Topbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/newBlog" element={<NewBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/:id" element={<ApplyJob />} />
          <Route path="/company/create" element={<CreateCompany />} />
          <Route path="/community" element={<CommunityForum />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/sample" element={<SampleSocial />} />
          <Route path="/emotion" element={<EmotionCapture />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route
            path="/interview-questions"
            element={<InterviewQuestionBank />}
          />
          <Route path="/events" element={<DynamicEvents />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
