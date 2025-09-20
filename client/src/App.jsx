import "./App.css";
import React, { useState } from "react";
import Topbar from "./components/bars/Topbar";
import Sidebar from "./components/bars/Sidebar";
import Home from "./components/pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Social from "./components/pages/Community/Social";
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
import Roadmap from "./components/pages/pre-university/Roadmap";
import Careers from "./components/pages/pre-university/Careers";
import PreUniversity from "./components/pages/pre-university/PreUniversity";
import CareerChoice from "./components/pages/pre-university/CareerChoice";
import CareerDetails from "./components/pages/pre-university/CareerDetails";
import UniversityChoice from "./components/pages/pre-university/UniversityChoice";
import InterviewQuestionBank from "./components/pages/InterviewQuestionBank";
import CompaniesPage from "./components/pages/CompaniesPage";
import InterviewRoomForm from "./components/interview/InterviewRoomForm";
import DynamicEvents from "./components/pages/DynamicEvents";
import Webinars from "./components/pages/Webinars";
import Conferences from "./components/pages/Conferences";
import Workshops from "./components/pages/Workshops";
import CareerChatbot from "./components/pages/CareerChatbot";
import ChatbotPage from "./components/pages/ChatbotPage";
import SavedJobs from "./components/pages/SavedJobs";
import Articles from "./components/pages/Community/Articles";
import Videos from "./components/pages/Community/Videos";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Routes where sidebar should be hidden (e.g., login, signup, home landing)
  const noSidebarRoutes = ["/", "/login", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="h-screen flex flex-col overflow-hidden">
          {/* Topbar - Fixed height */}
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
          <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Layout - Takes remaining viewport height */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Only show on authenticated pages */}
            {showSidebar && (
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            )}

            {/* Main Content - Takes remaining space with proper scrolling */}
            <main className="flex-1 overflow-auto">
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
                <Route path="/videos" element={<Videos />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/social" element={<Social />} />

                {/* Pre-University Career Guidance */}
                <Route path="/pre-university" element={<PreUniversity />} />
                <Route
                  path="/pre-university/career-choice"
                  element={<CareerChoice />}
                />
                <Route
                  path="/pre-university/career/:careerTitle"
                  element={<CareerDetails />}
                />
                <Route
                  path="/pre-university/roadmap/:careerTitle"
                  element={<Roadmap />}
                />
                <Route
                  path="/pre-university/university-choice"
                  element={<UniversityChoice />}
                />

                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/careers" element={<Careers />} />

                <Route path="/sample" element={<SampleSocial />} />
                <Route path="/emotion" element={<EmotionCapture />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route
                  path="/interview-questions"
                  element={<InterviewQuestionBank />}
                />
                <Route path="/interview-room" element={<InterviewRoomForm />} />
                <Route path="/events" element={<DynamicEvents />} />
                <Route path="/chatbot" element={<ChatbotPage />} />

                {/* New Event-specific Routes */}
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/conferences" element={<Conferences />} />
                <Route path="/workshops" element={<Workshops />} />

                {/* New sidebar routes */}
                <Route
                  path="/dashboard"
                  element={<div className="p-8">Dashboard Coming Soon</div>}
                />
                <Route
                  path="/career-assessment"
                  element={
                    <div className="p-8">Career Assessment Coming Soon</div>
                  }
                />
                <Route
                  path="/skills-analysis"
                  element={
                    <div className="p-8">Skills Analysis Coming Soon</div>
                  }
                />
                <Route
                  path="/saved-jobs"
                  element={<SavedJobs/>}
                />
                <Route
                  path="/applications"
                  element={<div className="p-8">Applications Coming Soon</div>}
                />
                <Route
                  path="/job-alerts"
                  element={<div className="p-8">Job Alerts Coming Soon</div>}
                />
                <Route
                  path="/mock-interviews"
                  element={
                    <div className="p-8">Mock Interviews Coming Soon</div>
                  }
                />
                <Route
                  path="/interview-history"
                  element={
                    <div className="p-8">Interview History Coming Soon</div>
                  }
                />
                <Route
                  path="/interview-guides"
                  element={
                    <div className="p-8">Interview Guides Coming Soon</div>
                  }
                />
                <Route path="/network" element={<CommunityForum />} />
                <Route
                  path="/messages"
                  element={<div className="p-8">Messages Coming Soon</div>}
                />
                <Route
                  path="/mentorship"
                  element={<div className="p-8">Mentorship Coming Soon</div>}
                />
                <Route path="/forums" element={<CommunityForum />} />
                <Route
                  path="/company-reviews"
                  element={
                    <div className="p-8">Company Reviews Coming Soon</div>
                  }
                />
                <Route
                  path="/salary-insights"
                  element={
                    <div className="p-8">Salary Insights Coming Soon</div>
                  }
                />
                <Route
                  path="/culture-match"
                  element={<div className="p-8">Culture Match Coming Soon</div>}
                />
                <Route
                  path="/webinars"
                  element={<div className="p-8">Webinars Coming Soon</div>}
                />
                <Route
                  path="/workshops"
                  element={<div className="p-8">Workshops Coming Soon</div>}
                />
                <Route
                  path="/conferences"
                  element={<div className="p-8">Conferences Coming Soon</div>}
                />
                <Route
                  path="/settings"
                  element={<div className="p-8">Settings Coming Soon</div>}
                />
              </Routes>
            </main>
          </div>

          {/* Career Chatbot - Fixed position, doesn't affect layout */}
          {/* <CareerChatbot /> */}
        </div>
        <CareerChatbot />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
