import "./App.css";
import React from "react";
import Topbar from "./components/bars/Topbar";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AppThemeProvider from "./components/providers/AppThemeProvider";
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
import CareerVisionHome from "./components/pages/Home";

function App() {
  return (
    <AppThemeProvider>
      <UserProvider>
        <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <Topbar />

          {/* Main content with proper spacing for fixed navbar */}
          <main className="w-full pt-20">
            <Routes>
              <Route path="/" element={<CareerVisionHome />} />
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
              <Route path="/sample" element={<SampleSocial />} />
              <Route path="/emotion" element={<EmotionCapture />} />
              <Route path="/careers" element={<Careers />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </AppThemeProvider>
  );
}

export default App;
