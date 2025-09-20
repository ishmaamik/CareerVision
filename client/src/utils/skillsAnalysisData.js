// Skills analysis data and recommendations
export const skillCategories = {
  technical: {
    name: "Technical Skills",
    icon: "💻",
    color: "#3B82F6",
    skills: [
      { id: "programming", name: "Programming", inDemand: true, growth: "+25%" },
      { id: "data_analysis", name: "Data Analysis", inDemand: true, growth: "+30%" },
      { id: "cybersecurity", name: "Cybersecurity", inDemand: true, growth: "+35%" },
      { id: "cloud_computing", name: "Cloud Computing", inDemand: true, growth: "+40%" },
      { id: "ai_ml", name: "AI/Machine Learning", inDemand: true, growth: "+50%" },
      { id: "web_development", name: "Web Development", inDemand: true, growth: "+20%" },
      { id: "mobile_development", name: "Mobile Development", inDemand: true, growth: "+22%" },
      { id: "devops", name: "DevOps", inDemand: true, growth: "+28%" },
    ]
  },
  business: {
    name: "Business Skills",
    icon: "💼",
    color: "#059669",
    skills: [
      { id: "project_management", name: "Project Management", inDemand: true, growth: "+18%" },
      { id: "digital_marketing", name: "Digital Marketing", inDemand: true, growth: "+24%" },
      { id: "business_analysis", name: "Business Analysis", inDemand: true, growth: "+15%" },
      { id: "financial_analysis", name: "Financial Analysis", inDemand: true, growth: "+12%" },
      { id: "strategy", name: "Strategic Planning", inDemand: false, growth: "+8%" },
      { id: "sales", name: "Sales & Negotiation", inDemand: true, growth: "+10%" },
      { id: "consulting", name: "Consulting", inDemand: false, growth: "+14%" },
      { id: "entrepreneurship", name: "Entrepreneurship", inDemand: false, growth: "+20%" },
    ]
  },
  creative: {
    name: "Creative Skills",
    icon: "🎨",
    color: "#8B5CF6",
    skills: [
      { id: "ux_design", name: "UX/UI Design", inDemand: true, growth: "+26%" },
      { id: "graphic_design", name: "Graphic Design", inDemand: false, growth: "+8%" },
      { id: "content_creation", name: "Content Creation", inDemand: true, growth: "+32%" },
      { id: "video_editing", name: "Video Editing", inDemand: true, growth: "+28%" },
      { id: "photography", name: "Photography", inDemand: false, growth: "+5%" },
      { id: "copywriting", name: "Copywriting", inDemand: true, growth: "+18%" },
      { id: "brand_design", name: "Brand Design", inDemand: false, growth: "+12%" },
      { id: "animation", name: "Animation", inDemand: true, growth: "+22%" },
    ]
  },
  communication: {
    name: "Communication Skills",
    icon: "💬",
    color: "#EF4444",
    skills: [
      { id: "public_speaking", name: "Public Speaking", inDemand: true, growth: "+15%" },
      { id: "writing", name: "Technical Writing", inDemand: true, growth: "+20%" },
      { id: "presentation", name: "Presentation Skills", inDemand: true, growth: "+12%" },
      { id: "team_collaboration", name: "Team Collaboration", inDemand: true, growth: "+18%" },
      { id: "cross_cultural", name: "Cross-Cultural Communication", inDemand: true, growth: "+25%" },
      { id: "customer_service", name: "Customer Service", inDemand: false, growth: "+8%" },
      { id: "negotiation", name: "Negotiation", inDemand: true, growth: "+14%" },
      { id: "conflict_resolution", name: "Conflict Resolution", inDemand: false, growth: "+10%" },
    ]
  },
  leadership: {
    name: "Leadership Skills",
    icon: "👑",
    color: "#F59E0B",
    skills: [
      { id: "team_management", name: "Team Management", inDemand: true, growth: "+16%" },
      { id: "change_management", name: "Change Management", inDemand: true, growth: "+22%" },
      { id: "decision_making", name: "Decision Making", inDemand: true, growth: "+12%" },
      { id: "mentoring", name: "Mentoring & Coaching", inDemand: true, growth: "+18%" },
      { id: "strategic_thinking", name: "Strategic Thinking", inDemand: true, growth: "+20%" },
      { id: "delegation", name: "Delegation", inDemand: false, growth: "+8%" },
      { id: "performance_management", name: "Performance Management", inDemand: true, growth: "+14%" },
      { id: "emotional_intelligence", name: "Emotional Intelligence", inDemand: true, growth: "+25%" },
    ]
  }
};

export const skillLevels = [
  { value: 1, label: "Beginner", description: "Just starting out", color: "#EF4444" },
  { value: 2, label: "Basic", description: "Some knowledge", color: "#F59E0B" },
  { value: 3, label: "Intermediate", description: "Can work independently", color: "#EAB308" },
  { value: 4, label: "Advanced", description: "Highly skilled", color: "#22C55E" },
  { value: 5, label: "Expert", description: "Industry expert", color: "#059669" }
];

export const industrySkillDemand = {
  technology: {
    name: "Technology",
    highDemand: ["programming", "ai_ml", "cybersecurity", "cloud_computing", "data_analysis"],
    mediumDemand: ["web_development", "mobile_development", "devops"],
    lowDemand: ["graphic_design"]
  },
  healthcare: {
    name: "Healthcare",
    highDemand: ["data_analysis", "project_management", "communication", "teamwork"],
    mediumDemand: ["technical_writing", "customer_service"],
    lowDemand: ["programming", "web_development"]
  },
  finance: {
    name: "Finance",
    highDemand: ["financial_analysis", "data_analysis", "project_management", "communication"],
    mediumDemand: ["programming", "strategy", "sales"],
    lowDemand: ["graphic_design", "video_editing"]
  },
  marketing: {
    name: "Marketing",
    highDemand: ["digital_marketing", "content_creation", "ux_design", "data_analysis"],
    mediumDemand: ["graphic_design", "copywriting", "public_speaking"],
    lowDemand: ["programming", "cybersecurity"]
  },
  education: {
    name: "Education",
    highDemand: ["public_speaking", "content_creation", "mentoring", "team_collaboration"],
    mediumDemand: ["technical_writing", "project_management"],
    lowDemand: ["programming", "financial_analysis"]
  }
};

export const learningResources = {
  programming: [
    { type: "Course", name: "Complete Web Development Bootcamp", platform: "Udemy", duration: "65 hours", rating: 4.8 },
    { type: "Course", name: "CS50's Introduction to Computer Science", platform: "Harvard", duration: "12 weeks", rating: 4.9 },
    { type: "Practice", name: "LeetCode", platform: "LeetCode", duration: "Ongoing", rating: 4.7 },
    { type: "Book", name: "Clean Code", platform: "Amazon", duration: "464 pages", rating: 4.6 }
  ],
  data_analysis: [
    { type: "Course", name: "Data Analysis with Python", platform: "Coursera", duration: "40 hours", rating: 4.7 },
    { type: "Course", name: "Google Data Analytics", platform: "Google", duration: "6 months", rating: 4.8 },
    { type: "Practice", name: "Kaggle Learn", platform: "Kaggle", duration: "Ongoing", rating: 4.6 },
    { type: "Book", name: "Python for Data Analysis", platform: "O'Reilly", duration: "544 pages", rating: 4.5 }
  ],
  ux_design: [
    { type: "Course", name: "Google UX Design", platform: "Coursera", duration: "6 months", rating: 4.8 },
    { type: "Course", name: "UX Design Fundamentals", platform: "Adobe", duration: "30 hours", rating: 4.6 },
    { type: "Practice", name: "Daily UI Challenge", platform: "Daily UI", duration: "100 days", rating: 4.5 },
    { type: "Book", name: "Don't Make Me Think", platform: "Amazon", duration: "216 pages", rating: 4.7 }
  ],
  project_management: [
    { type: "Certification", name: "PMP Certification", platform: "PMI", duration: "6 months", rating: 4.7 },
    { type: "Course", name: "Agile Project Management", platform: "Coursera", duration: "20 hours", rating: 4.6 },
    { type: "Practice", name: "Scrum.org", platform: "Scrum.org", duration: "Ongoing", rating: 4.5 },
    { type: "Book", name: "PMBOK Guide", platform: "PMI", duration: "756 pages", rating: 4.4 }
  ],
  digital_marketing: [
    { type: "Course", name: "Google Ads Certification", platform: "Google", duration: "40 hours", rating: 4.7 },
    { type: "Course", name: "Facebook Social Media Marketing", platform: "Coursera", duration: "30 hours", rating: 4.5 },
    { type: "Practice", name: "HubSpot Academy", platform: "HubSpot", duration: "Ongoing", rating: 4.6 },
    { type: "Book", name: "Digital Marketing for Dummies", platform: "Wiley", duration: "384 pages", rating: 4.3 }
  ]
};

export const skillGapAnalysis = {
  calculateGaps: (userSkills, targetRole) => {
    // Mock skill gap calculation
    const requiredSkills = {
      "Software Engineer": ["programming", "data_analysis", "team_collaboration", "problem_solving"],
      "Data Scientist": ["data_analysis", "programming", "ai_ml", "statistical_analysis"],
      "UX Designer": ["ux_design", "graphic_design", "user_research", "prototyping"],
      "Product Manager": ["project_management", "business_analysis", "communication", "strategy"],
      "Marketing Manager": ["digital_marketing", "content_creation", "data_analysis", "strategy"]
    };

    const required = requiredSkills[targetRole] || [];
    const gaps = required.filter(skill => !(skill in userSkills) || userSkills[skill] < 3);
    const strengths = required.filter(skill => (skill in userSkills) && userSkills[skill] >= 4);
    
    return { gaps, strengths, required };
  }
};

export const careerPathRecommendations = {
  "Software Engineer": {
    currentSkills: ["programming", "web_development"],
    nextSkills: ["ai_ml", "cloud_computing", "devops"],
    timeframe: "6-12 months",
    difficulty: "Medium"
  },
  "Data Scientist": {
    currentSkills: ["data_analysis", "programming"],
    nextSkills: ["ai_ml", "statistical_modeling", "big_data"],
    timeframe: "8-15 months",
    difficulty: "High"
  },
  "UX Designer": {
    currentSkills: ["graphic_design", "creativity"],
    nextSkills: ["ux_design", "user_research", "prototyping"],
    timeframe: "4-8 months",
    difficulty: "Medium"
  },
  "Product Manager": {
    currentSkills: ["business_analysis", "communication"],
    nextSkills: ["project_management", "strategy", "data_analysis"],
    timeframe: "6-10 months",
    difficulty: "Medium"
  }
};