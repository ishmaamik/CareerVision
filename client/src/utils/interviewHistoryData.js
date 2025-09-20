// Mock data for interview history and performance analytics
export const interviewHistoryData = [
  {
    id: "hist_001",
    title: "Google Software Engineer Interview",
    type: "technical",
    industry: "technology",
    difficulty: "advanced",
    duration: 60,
    completedAt: "2024-01-15T14:30:00Z",
    score: 85,
    interviewer: {
      name: "AI Interviewer - Sarah Chen",
      avatar: "/default-profile.png",
      title: "Senior Software Engineer at Google",
      company: "Google"
    },
    questions: 3,
    feedback: {
      overall: "Strong performance with room for improvement in system design",
      strengths: ["Problem-solving approach", "Code quality", "Communication"],
      improvements: ["System design patterns", "Scalability considerations", "Time complexity analysis"]
    },
    skillsAssessed: ["Algorithms", "Data Structures", "System Design", "Communication"],
    tags: ["algorithms", "system-design", "coding"],
    company: "Google",
    position: "Senior Software Engineer"
  },
  {
    id: "hist_002",
    title: "Microsoft Product Manager Interview",
    type: "case_study",
    industry: "technology",
    difficulty: "intermediate",
    duration: 75,
    completedAt: "2024-01-12T10:00:00Z",
    score: 78,
    interviewer: {
      name: "AI Interviewer - Michael Johnson",
      avatar: "/default-profile.png",
      title: "Principal Product Manager at Microsoft",
      company: "Microsoft"
    },
    questions: 3,
    feedback: {
      overall: "Good analytical thinking with solid business acumen",
      strengths: ["Market analysis", "User empathy", "Strategic thinking"],
      improvements: ["Data-driven decisions", "Competitive analysis", "Technical feasibility"]
    },
    skillsAssessed: ["Business Analysis", "Strategic Thinking", "Market Research", "Product Strategy"],
    tags: ["product-management", "strategy", "market-analysis"],
    company: "Microsoft",
    position: "Product Manager"
  },
  {
    id: "hist_003",
    title: "Amazon Leadership Principles Interview",
    type: "behavioral",
    industry: "technology",
    difficulty: "intermediate",
    duration: 45,
    completedAt: "2024-01-10T16:20:00Z",
    score: 92,
    interviewer: {
      name: "AI Interviewer - Emily Rodriguez",
      avatar: "/default-profile.png",
      title: "Senior Manager at Amazon",
      company: "Amazon"
    },
    questions: 4,
    feedback: {
      overall: "Excellent demonstration of leadership principles with concrete examples",
      strengths: ["STAR method usage", "Concrete examples", "Self-reflection"],
      improvements: ["Quantified impact", "Failure handling", "Long-term thinking"]
    },
    skillsAssessed: ["Leadership", "Communication", "Problem Solving", "Self-awareness"],
    tags: ["leadership", "behavioral", "star-method"],
    company: "Amazon",
    position: "Software Development Manager"
  },
  {
    id: "hist_004",
    title: "Startup Finance Role Interview",
    type: "hr_screening",
    industry: "finance",
    difficulty: "beginner",
    duration: 25,
    completedAt: "2024-01-08T11:15:00Z",
    score: 88,
    interviewer: {
      name: "AI Interviewer - David Kim",
      avatar: "/default-profile.png",
      title: "HR Manager at FinTech Startup",
      company: "FinanceFlow"
    },
    questions: 4,
    feedback: {
      overall: "Strong cultural fit with good foundational knowledge",
      strengths: ["Enthusiasm", "Cultural alignment", "Growth mindset"],
      improvements: ["Industry knowledge", "Technical skills", "Experience depth"]
    },
    skillsAssessed: ["Cultural Fit", "Communication", "Motivation", "Adaptability"],
    tags: ["hr-screening", "cultural-fit", "finance"],
    company: "FinanceFlow",
    position: "Junior Financial Analyst"
  },
  {
    id: "hist_005",
    title: "Meta React Developer Interview",
    type: "technical",
    industry: "technology",
    difficulty: "intermediate",
    duration: 50,
    completedAt: "2024-01-05T13:45:00Z",
    score: 82,
    interviewer: {
      name: "AI Interviewer - Jennifer Zhang",
      avatar: "/default-profile.png",
      title: "Senior Frontend Engineer at Meta",
      company: "Meta"
    },
    questions: 2,
    feedback: {
      overall: "Solid React knowledge with good problem-solving skills",
      strengths: ["React concepts", "Component design", "State management"],
      improvements: ["Performance optimization", "Testing strategies", "Accessibility"]
    },
    skillsAssessed: ["React", "JavaScript", "Frontend Development", "Problem Solving"],
    tags: ["react", "frontend", "javascript"],
    company: "Meta",
    position: "Frontend Engineer"
  },
  {
    id: "hist_006",
    title: "McKinsey Case Interview",
    type: "case_study",
    industry: "consulting",
    difficulty: "advanced",
    duration: 90,
    completedAt: "2024-01-03T09:30:00Z",
    score: 76,
    interviewer: {
      name: "AI Interviewer - Robert Wilson",
      avatar: "/default-profile.png",
      title: "Partner at McKinsey & Company",
      company: "McKinsey"
    },
    questions: 2,
    feedback: {
      overall: "Good structured thinking with room for improvement in quantitative analysis",
      strengths: ["Framework application", "Communication", "Business intuition"],
      improvements: ["Quantitative analysis", "Hypothesis testing", "Industry knowledge"]
    },
    skillsAssessed: ["Case Interview", "Business Analysis", "Quantitative Reasoning", "Communication"],
    tags: ["consulting", "case-study", "business-analysis"],
    company: "McKinsey",
    position: "Business Analyst"
  },
  {
    id: "hist_007",
    title: "Tesla Mechanical Engineer Interview",
    type: "technical",
    industry: "engineering",
    difficulty: "advanced",
    duration: 70,
    completedAt: "2024-01-01T15:00:00Z",
    score: 79,
    interviewer: {
      name: "AI Interviewer - Lisa Thompson",
      avatar: "/default-profile.png",
      title: "Principal Engineer at Tesla",
      company: "Tesla"
    },
    questions: 3,
    feedback: {
      overall: "Strong technical foundation with practical engineering mindset",
      strengths: ["Technical knowledge", "Problem-solving", "Innovation thinking"],
      improvements: ["Manufacturing processes", "Cost optimization", "Project management"]
    },
    skillsAssessed: ["Mechanical Engineering", "Problem Solving", "Design Thinking", "Innovation"],
    tags: ["engineering", "mechanical", "automotive"],
    company: "Tesla",
    position: "Mechanical Engineer"
  },
  {
    id: "hist_008",
    title: "Netflix Data Science Interview",
    type: "technical",
    industry: "technology",
    difficulty: "advanced",
    duration: 80,
    completedAt: "2023-12-28T14:20:00Z",
    score: 87,
    interviewer: {
      name: "AI Interviewer - Kevin Chang",
      avatar: "/default-profile.png",
      title: "Senior Data Scientist at Netflix",
      company: "Netflix"
    },
    questions: 4,
    feedback: {
      overall: "Excellent analytical skills with strong statistical knowledge",
      strengths: ["Statistical analysis", "Machine learning", "Data interpretation"],
      improvements: ["A/B testing", "Business metrics", "Data visualization"]
    },
    skillsAssessed: ["Data Science", "Statistics", "Machine Learning", "Python"],
    tags: ["data-science", "statistics", "machine-learning"],
    company: "Netflix",
    position: "Data Scientist"
  }
];

export const performanceAnalytics = {
  overall: {
    totalInterviews: 8,
    averageScore: 83.4,
    improvementRate: 18.5,
    totalHours: 8.75,
    successRate: 75, // Percentage of interviews scoring above 80
  },
  
  byType: {
    technical: {
      count: 4,
      averageScore: 83.25,
      improvement: 12,
      successRate: 75
    },
    behavioral: {
      count: 1,
      averageScore: 92,
      improvement: 25,
      successRate: 100
    },
    case_study: {
      count: 2,
      averageScore: 77,
      improvement: 15,
      successRate: 50
    },
    hr_screening: {
      count: 1,
      averageScore: 88,
      improvement: 20,
      successRate: 100
    }
  },
  
  byIndustry: {
    technology: {
      count: 5,
      averageScore: 84.8,
      topSkills: ["Problem Solving", "Technical Knowledge", "Communication"]
    },
    consulting: {
      count: 1,
      averageScore: 76,
      topSkills: ["Business Analysis", "Framework Application", "Communication"]
    },
    finance: {
      count: 1,
      averageScore: 88,
      topSkills: ["Cultural Fit", "Communication", "Adaptability"]
    },
    engineering: {
      count: 1,
      averageScore: 79,
      topSkills: ["Technical Knowledge", "Problem Solving", "Innovation"]
    }
  },
  
  byDifficulty: {
    beginner: {
      count: 1,
      averageScore: 88,
      passRate: 100
    },
    intermediate: {
      count: 3,
      averageScore: 82.67,
      passRate: 67
    },
    advanced: {
      count: 4,
      averageScore: 82.75,
      passRate: 75
    }
  },
  
  skillsProgression: {
    "Problem Solving": {
      scores: [75, 78, 82, 85, 87],
      trend: "improving",
      currentLevel: "Advanced",
      improvement: 16
    },
    "Communication": {
      scores: [80, 82, 85, 88, 90],
      trend: "improving", 
      currentLevel: "Expert",
      improvement: 12.5
    },
    "Technical Knowledge": {
      scores: [70, 74, 78, 80, 82],
      trend: "improving",
      currentLevel: "Advanced",
      improvement: 17.1
    },
    "Business Analysis": {
      scores: [65, 70, 72, 76, 77],
      trend: "improving",
      currentLevel: "Intermediate",
      improvement: 18.5
    },
    "Leadership": {
      scores: [85, 88, 90, 92, 92],
      trend: "stable",
      currentLevel: "Expert",
      improvement: 8.2
    }
  },
  
  monthlyTrends: [
    { month: "Sep 2023", sessions: 2, avgScore: 74 },
    { month: "Oct 2023", sessions: 3, avgScore: 78 },
    { month: "Nov 2023", sessions: 2, avgScore: 81 },
    { month: "Dec 2023", sessions: 1, avgScore: 87 },
    { month: "Jan 2024", sessions: 4, avgScore: 85 }
  ],
  
  companyPerformance: {
    "Google": { sessions: 1, avgScore: 85, difficulty: "Advanced" },
    "Microsoft": { sessions: 1, avgScore: 78, difficulty: "Intermediate" },
    "Amazon": { sessions: 1, avgScore: 92, difficulty: "Intermediate" },
    "Meta": { sessions: 1, avgScore: 82, difficulty: "Intermediate" },
    "Netflix": { sessions: 1, avgScore: 87, difficulty: "Advanced" },
    "McKinsey": { sessions: 1, avgScore: 76, difficulty: "Advanced" },
    "Tesla": { sessions: 1, avgScore: 79, difficulty: "Advanced" },
    "FinanceFlow": { sessions: 1, avgScore: 88, difficulty: "Beginner" }
  }
};

export const improvementRecommendations = [
  {
    id: "rec_001",
    category: "System Design",
    priority: "high",
    description: "Focus on scalability patterns and distributed systems",
    resources: [
      {
        title: "System Design Interview Guide",
        type: "course",
        url: "#",
        duration: "8 hours"
      },
      {
        title: "Designing Data-Intensive Applications",
        type: "book",
        url: "#",
        duration: "20 hours"
      }
    ],
    practiceQuestions: [
      "Design a URL shortener like bit.ly",
      "Design a chat application like WhatsApp",
      "Design a video streaming service like Netflix"
    ],
    estimatedImprovementTime: "2-3 weeks"
  },
  {
    id: "rec_002",
    category: "Quantitative Analysis",
    priority: "medium",
    description: "Strengthen your ability to work with numbers and data in case interviews",
    resources: [
      {
        title: "Case Interview Math & Frameworks",
        type: "course",
        url: "#",
        duration: "6 hours"
      },
      {
        title: "Mental Math for Consulting",
        type: "practice",
        url: "#",
        duration: "3 hours"
      }
    ],
    practiceQuestions: [
      "Calculate market size for electric vehicles in India",
      "Estimate the revenue impact of a 10% price increase",
      "Analyze profitability of opening a new store location"
    ],
    estimatedImprovementTime: "1-2 weeks"
  },
  {
    id: "rec_003",
    category: "A/B Testing",
    priority: "medium",
    description: "Learn experimental design and statistical significance for data science roles",
    resources: [
      {
        title: "A/B Testing for Data Scientists",
        type: "course",
        url: "#",
        duration: "10 hours"
      },
      {
        title: "Statistical Methods Practice",
        type: "practice",
        url: "#",
        duration: "5 hours"
      }
    ],
    practiceQuestions: [
      "Design an A/B test for a new recommendation algorithm",
      "Analyze the results of a pricing experiment",
      "Calculate sample size needed for detecting a 5% improvement"
    ],
    estimatedImprovementTime: "2-3 weeks"
  },
  {
    id: "rec_004",
    category: "Industry Knowledge",
    priority: "low",
    description: "Build deeper understanding of specific industry dynamics",
    resources: [
      {
        title: "Industry Reports and Analysis",
        type: "reading",
        url: "#",
        duration: "4 hours"
      },
      {
        title: "Company Research Framework",
        type: "template",
        url: "#",
        duration: "2 hours"
      }
    ],
    practiceQuestions: [
      "What are the key trends in fintech?",
      "How is AI transforming healthcare?",
      "What challenges face the automotive industry?"
    ],
    estimatedImprovementTime: "1 week"
  }
];

export const skillCategories = [
  {
    id: "technical",
    name: "Technical Skills",
    skills: ["Algorithms", "Data Structures", "System Design", "Programming", "Database Design"],
    color: "#3B82F6"
  },
  {
    id: "analytical",
    name: "Analytical Skills",
    skills: ["Problem Solving", "Quantitative Analysis", "Data Interpretation", "Critical Thinking"],
    color: "#10B981"
  },
  {
    id: "communication",
    name: "Communication Skills", 
    skills: ["Verbal Communication", "Presentation", "Active Listening", "Storytelling"],
    color: "#F59E0B"
  },
  {
    id: "leadership",
    name: "Leadership Skills",
    skills: ["Team Leadership", "Decision Making", "Conflict Resolution", "Mentoring"],
    color: "#EF4444"
  },
  {
    id: "business",
    name: "Business Skills",
    skills: ["Business Analysis", "Strategic Thinking", "Market Research", "Financial Modeling"],
    color: "#8B5CF6"
  }
];

export const interviewGoals = [
  {
    id: "goal_001",
    title: "Improve System Design Skills",
    description: "Master advanced system design concepts for senior engineering roles",
    targetScore: 90,
    currentScore: 75,
    deadline: "2024-03-01",
    category: "technical",
    milestones: [
      { id: "m1", title: "Complete System Design Course", completed: false },
      { id: "m2", title: "Practice 10 System Design Questions", completed: false },
      { id: "m3", title: "Take 3 Advanced Mock Interviews", completed: false }
    ],
    progress: 25
  },
  {
    id: "goal_002", 
    title: "Master Case Interview Framework",
    description: "Achieve consistent 85+ scores in consulting case interviews",
    targetScore: 85,
    currentScore: 76,
    deadline: "2024-02-15",
    category: "analytical",
    milestones: [
      { id: "m1", title: "Learn MECE Framework", completed: true },
      { id: "m2", title: "Practice Market Sizing", completed: false },
      { id: "m3", title: "Complete 5 Case Studies", completed: false }
    ],
    progress: 33
  },
  {
    id: "goal_003",
    title: "Enhance Leadership Communication",
    description: "Develop compelling leadership stories using STAR method",
    targetScore: 95,
    currentScore: 92,
    deadline: "2024-02-01",
    category: "leadership", 
    milestones: [
      { id: "m1", title: "Document 10 Leadership Examples", completed: true },
      { id: "m2", title: "Practice STAR Method", completed: true },
      { id: "m3", title: "Record Mock Interviews", completed: false }
    ],
    progress: 67
  }
];

export const certificationBadges = [
  {
    id: "badge_001",
    title: "Technical Interview Master",
    description: "Achieved 85+ average in 5 technical interviews",
    icon: "engineering",
    earned: false,
    progress: 80,
    requirement: "Complete 5 technical interviews with 85+ average score"
  },
  {
    id: "badge_002",
    title: "Behavioral Excellence",
    description: "Scored 90+ in behavioral interview",
    icon: "psychology",
    earned: true,
    progress: 100,
    requirement: "Score 90+ in any behavioral interview"
  },
  {
    id: "badge_003",
    title: "Consistent Performer",
    description: "Maintained 80+ average across 10 interviews",
    icon: "trending_up",
    earned: false,
    progress: 40,
    requirement: "Complete 10 interviews with 80+ average score"
  },
  {
    id: "badge_004",
    title: "Case Study Expert",
    description: "Mastered case interview methodology",
    icon: "business_center",
    earned: false,
    progress: 65,
    requirement: "Score 85+ in 3 case study interviews"
  },
  {
    id: "badge_005",
    title: "Improvement Champion",
    description: "Showed 20% improvement over 5 interviews",
    icon: "emoji_events",
    earned: false,
    progress: 92,
    requirement: "Demonstrate 20% score improvement over 5 interviews"
  }
];