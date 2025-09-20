import "./App.css";
import React, { useState } from "react";
import Topbar from "./components/bars/Topbar";
import Sidebar from "./components/bars/Sidebar";
import RecruiterSidebar from "./components/bars/RecruiterSidebar";
import Home from "./components/pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserProvider, User } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
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
import CareerChatbot from "./components/pages/CareerChatbot";
import ChatbotPage from "./components/pages/ChatbotPage";
import CareerAssessment from "./components/pages/CareerAssessment";
import SkillsAnalysis from "./components/pages/SkillsAnalysis";
import SavedJobs from "./components/pages/SavedJobs";
import Applications from "./components/pages/Applications";
import MockInterviews from "./components/pages/MockInterviews";
import InterviewHistory from "./components/pages/InterviewHistory";
import InterviewGuides from "./components/pages/InterviewGuides";
import JobAlerts from "./components/pages/JobAlerts";

// Recruiter Pages
import RecruiterDashboard from "./components/pages/recruiter/RecruiterDashboard";
import JobManagement from "./components/pages/recruiter/JobManagement";
import CandidateManagement from "./components/pages/recruiter/CandidateManagement";
import InterviewScheduling from "./components/pages/recruiter/InterviewScheduling";
import AnalyticsDashboard from "./components/pages/recruiter/AnalyticsDashboard";
import CompanyProfile from "./components/pages/recruiter/CompanyProfile";

// Sidebar Wrapper Component
const SidebarWrapper = ({ isOpen, setIsOpen }) => {
  const { userDetails } = React.useContext(User);

  // Also check localStorage as backup
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const user = userDetails || storedUser;

  // Debug logging
  console.log("SidebarWrapper Debug:", {
    userDetails,
    storedUser,
    finalUser: user,
    userRole: user?.role,
  });

  // Determine which sidebar to render based on user role
  if (!user || !user.role) {
    console.log("Rendering Student Sidebar - No user or role");
    return <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  switch (user.role.toLowerCase()) {
    case "recruiter":
    case "hiring_manager":
      console.log("Rendering Recruiter Sidebar for role:", user.role);
      return <RecruiterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
    case "student":
    case "job_seeker":
    case "user":
    default:
      console.log("Rendering Student Sidebar for role:", user.role);
      return <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }
};

// App component with user initialization
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { userDetails, setUserDetails } = React.useContext(User);

  // Initialize user from localStorage on app load
  React.useEffect(() => {
    if (!userDetails) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserDetails(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
        }
      }
    }
  }, [userDetails, setUserDetails]);

  // Routes where sidebar should be hidden (e.g., login, signup, home landing)
  const noSidebarRoutes = ["/", "/login", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Topbar - Fixed height */}
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout - Takes remaining viewport height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Only show on authenticated pages */}
        {showSidebar && (
          <SidebarWrapper isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
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

            {/* New sidebar routes */}
            <Route
              path="/dashboard"
              element={<div className="p-8">Dashboard Coming Soon</div>}
            />
            <Route path="/career-assessment" element={<CareerAssessment />} />
            <Route path="/skills-analysis" element={<SkillsAnalysis />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/job-alerts" element={<JobAlerts />} />
            <Route path="/mock-interviews" element={<MockInterviews />} />
            <Route path="/interview-history" element={<InterviewHistory />} />
            <Route path="/interview-guides" element={<InterviewGuides />} />
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
              element={<div className="p-8">Company Reviews Coming Soon</div>}
            />
            <Route
              path="/salary-insights"
              element={<div className="p-8">Salary Insights Coming Soon</div>}
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

            {/* Recruiter Routes */}
            <Route
              path="/recruiter/dashboard"
              element={<RecruiterDashboard />}
            />
            <Route path="/recruiter/jobs" element={<JobManagement />} />
            <Route path="/recruiter/jobs/create" element={<CreateJob />} />
            <Route
              path="/recruiter/job-templates"
              element={<div className="p-8">Job Templates Coming Soon</div>}
            />
            <Route
              path="/recruiter/candidates"
              element={<CandidateManagement />}
            />
            <Route
              path="/recruiter/candidates/shortlisted"
              element={<CandidateManagement />}
            />
            <Route
              path="/recruiter/pipeline"
              element={
                <div className="p-8">Candidate Pipeline Coming Soon</div>
              }
            />
            <Route
              path="/recruiter/interviews"
              element={<InterviewScheduling />}
            />
            <Route
              path="/recruiter/interviews/calendar"
              element={
                <div className="p-8">Interview Calendar Coming Soon</div>
              }
            />
            <Route
              path="/recruiter/interviews/feedback"
              element={
                <div className="p-8">Interview Feedback Coming Soon</div>
              }
            />
            <Route
              path="/recruiter/analytics"
              element={<AnalyticsDashboard />}
            />
            <Route
              path="/recruiter/reports"
              element={<div className="p-8">Reports Coming Soon</div>}
            />
            <Route
              path="/recruiter/performance"
              element={<div className="p-8">Performance Coming Soon</div>}
            />
            <Route
              path="/recruiter/company-profile"
              element={<CompanyProfile />}
            />
            <Route
              path="/recruiter/team"
              element={<div className="p-8">Team Management Coming Soon</div>}
            />
            <Route
              path="/recruiter/branding"
              element={<div className="p-8">Employer Branding Coming Soon</div>}
            />
            <Route
              path="/recruiter/settings"
              element={
                <div className="p-8">Recruiter Settings Coming Soon</div>
              }
            />
          </Routes>
        </main>
      </div>

      {/* Career Chatbot - Fixed position, doesn't affect layout */}
      <CareerChatbot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
