// Mock data for interview system
export const interviewTypes = [
  {
    id: "behavioral",
    name: "Behavioral Interview",
    description: "Assess your communication skills and cultural fit",
    duration: "30-45 minutes",
    questionCount: "8-12 questions",
    color: "#3B82F6",
    icon: "psychology",
    difficulty: "Medium",
    features: ["STAR method practice", "Soft skills assessment", "Real-time feedback"]
  },
  {
    id: "technical",
    name: "Technical Interview",
    description: "Test your programming and problem-solving abilities",
    duration: "45-60 minutes",
    questionCount: "3-5 problems",
    color: "#10B981",
    icon: "code",
    difficulty: "Hard",
    features: ["Live coding", "Algorithm challenges", "System design"]
  },
  {
    id: "case_study",
    name: "Case Study Interview",
    description: "Analyze business scenarios and provide solutions",
    duration: "60-90 minutes",
    questionCount: "1-2 cases",
    color: "#F59E0B",
    icon: "business_center",
    difficulty: "Hard",
    features: ["Business analysis", "Strategic thinking", "Presentation skills"]
  },
  {
    id: "hr_screening",
    name: "HR Screening",
    description: "Initial assessment of your background and interest",
    duration: "15-30 minutes",
    questionCount: "5-8 questions",
    color: "#8B5CF6",
    icon: "person_search",
    difficulty: "Easy",
    features: ["Background verification", "Interest assessment", "Basic fit check"]
  },
  {
    id: "group_discussion",
    name: "Group Discussion",
    description: "Collaborative problem-solving and leadership skills",
    duration: "30-45 minutes",
    questionCount: "1-2 topics",
    color: "#EF4444",
    icon: "groups",
    difficulty: "Medium",
    features: ["Leadership assessment", "Team collaboration", "Communication skills"]
  },
  {
    id: "presentation",
    name: "Presentation Interview",
    description: "Present your ideas and handle Q&A sessions",
    duration: "30-45 minutes",
    questionCount: "1 topic + Q&A",
    color: "#06B6D4",
    icon: "slideshow",
    difficulty: "Medium",
    features: ["Presentation skills", "Public speaking", "Q&A handling"]
  }
];

export const industrySpecializations = [
  { id: "technology", name: "Technology & Software", count: 45 },
  { id: "finance", name: "Finance & Banking", count: 32 },
  { id: "consulting", name: "Management Consulting", count: 28 },
  { id: "healthcare", name: "Healthcare & Biotech", count: 24 },
  { id: "marketing", name: "Marketing & Sales", count: 38 },
  { id: "operations", name: "Operations & Supply Chain", count: 22 },
  { id: "data_science", name: "Data Science & Analytics", count: 35 },
  { id: "product", name: "Product Management", count: 26 },
  { id: "design", name: "Design & UX", count: 18 },
  { id: "engineering", name: "Engineering", count: 41 }
];

export const difficultyLevels = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Entry-level positions and fresh graduates",
    color: "#10B981",
    experienceRange: "0-1 years"
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Mid-level professionals with some experience",
    color: "#F59E0B",
    experienceRange: "2-5 years"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Senior roles and leadership positions",
    color: "#EF4444",
    experienceRange: "5+ years"
  }
];

export const mockInterviewSessions = [
  {
    id: "session_001",
    title: "Google Software Engineer Interview",
    type: "technical",
    industry: "technology",
    difficulty: "advanced",
    duration: 60,
    completedAt: "2024-01-15T14:30:00Z",
    score: 85,
    feedback: {
      overall: "Strong performance with room for improvement in system design",
      strengths: ["Problem-solving approach", "Code quality", "Communication"],
      improvements: ["System design patterns", "Scalability considerations", "Time complexity analysis"],
      detailedFeedback: "You demonstrated excellent problem-solving skills and wrote clean, well-structured code. Your communication was clear throughout the interview. However, consider studying more system design patterns and scalability concepts for senior-level positions."
    },
    questions: [
      {
        id: "q1",
        question: "Implement a function to find the longest substring without repeating characters",
        answer: "// Your solution using sliding window technique",
        timeSpent: 15,
        score: 90
      },
      {
        id: "q2",
        question: "Design a URL shortener service like bit.ly",
        answer: "Discussed database schema, API design, and caching strategy",
        timeSpent: 25,
        score: 80
      },
      {
        id: "q3",
        question: "Optimize a slow database query for a social media feed",
        answer: "Suggested indexing, denormalization, and caching approaches",
        timeSpent: 20,
        score: 85
      }
    ],
    interviewer: {
      name: "AI Interviewer - Sarah Chen",
      avatar: "/default-profile.png",
      title: "Senior Software Engineer at Google",
      experience: "8 years"
    }
  },
  {
    id: "session_002",
    title: "Microsoft Product Manager Interview",
    type: "case_study",
    industry: "technology",
    difficulty: "intermediate",
    duration: 75,
    completedAt: "2024-01-12T10:00:00Z",
    score: 78,
    feedback: {
      overall: "Good analytical thinking with solid business acumen",
      strengths: ["Market analysis", "User empathy", "Strategic thinking"],
      improvements: ["Data-driven decisions", "Competitive analysis", "Technical feasibility"],
      detailedFeedback: "You showed strong user empathy and strategic thinking. Your market analysis was thorough. To improve, focus more on data-driven decision making and consider technical constraints when proposing solutions."
    },
    questions: [
      {
        id: "q1",
        question: "How would you improve Microsoft Teams for remote workers?",
        answer: "Focused on productivity features, virtual presence, and integration improvements",
        timeSpent: 35,
        score: 80
      },
      {
        id: "q2",
        question: "Estimate the market size for cloud storage solutions",
        answer: "Used bottom-up approach considering enterprise and consumer segments",
        timeSpent: 25,
        score: 75
      },
      {
        id: "q3",
        question: "Design metrics to measure Teams success",
        answer: "Proposed engagement, retention, and business impact metrics",
        timeSpent: 15,
        score: 80
      }
    ],
    interviewer: {
      name: "AI Interviewer - Michael Johnson",
      avatar: "/default-profile.png",
      title: "Principal Product Manager at Microsoft",
      experience: "10 years"
    }
  },
  {
    id: "session_003",
    title: "Amazon Leadership Principles Interview",
    type: "behavioral",
    industry: "technology",
    difficulty: "intermediate",
    duration: 45,
    completedAt: "2024-01-10T16:20:00Z",
    score: 92,
    feedback: {
      overall: "Excellent demonstration of leadership principles with concrete examples",
      strengths: ["STAR method usage", "Concrete examples", "Self-reflection"],
      improvements: ["Quantified impact", "Failure handling", "Long-term thinking"],
      detailedFeedback: "Outstanding use of the STAR method with compelling examples. You showed strong self-awareness and learning from experiences. Consider including more quantified impacts and discussing how you handle failures and setbacks."
    },
    questions: [
      {
        id: "q1",
        question: "Tell me about a time when you had to earn trust",
        answer: "Shared example about rebuilding team trust after project failure",
        timeSpent: 8,
        score: 95
      },
      {
        id: "q2",
        question: "Describe a situation where you had to think big",
        answer: "Discussed scaling a local initiative to company-wide program",
        timeSpent: 10,
        score: 90
      },
      {
        id: "q3",
        question: "Give an example of when you disagreed with your manager",
        answer: "Explained respectful disagreement and collaborative solution finding",
        timeSpent: 12,
        score: 88
      },
      {
        id: "q4",
        question: "Tell me about a time you failed",
        answer: "Shared project failure, lessons learned, and subsequent improvements",
        timeSpent: 15,
        score: 95
      }
    ],
    interviewer: {
      name: "AI Interviewer - Emily Rodriguez",
      avatar: "/default-profile.png",
      title: "Senior Manager at Amazon",
      experience: "12 years"
    }
  },
  {
    id: "session_004",
    title: "Startup Finance Role Interview",
    type: "hr_screening",
    industry: "finance",
    difficulty: "beginner",
    duration: 25,
    completedAt: "2024-01-08T11:15:00Z",
    score: 88,
    feedback: {
      overall: "Strong cultural fit with good foundational knowledge",
      strengths: ["Enthusiasm", "Cultural alignment", "Growth mindset"],
      improvements: ["Industry knowledge", "Technical skills", "Experience depth"],
      detailedFeedback: "You demonstrated excellent enthusiasm and cultural fit. Your growth mindset is impressive. To strengthen your profile, focus on developing deeper industry knowledge and technical skills relevant to the finance sector."
    },
    questions: [
      {
        id: "q1",
        question: "Why are you interested in working at a startup?",
        answer: "Emphasized learning opportunities, impact, and growth potential",
        timeSpent: 5,
        score: 90
      },
      {
        id: "q2",
        question: "What do you know about our company?",
        answer: "Researched company mission, recent funding, and market position",
        timeSpent: 8,
        score: 85
      },
      {
        id: "q3",
        question: "Where do you see yourself in 5 years?",
        answer: "Discussed career progression and contribution to company growth",
        timeSpent: 7,
        score: 88
      },
      {
        id: "q4",
        question: "What are your salary expectations?",
        answer: "Provided market-rate range with flexibility for equity",
        timeSpent: 5,
        score: 90
      }
    ],
    interviewer: {
      name: "AI Interviewer - David Kim",
      avatar: "/default-profile.png",
      title: "HR Manager at FinTech Startup",
      experience: "6 years"
    }
  }
];

export const upcomingInterviewSchedule = [
  {
    id: "upcoming_001",
    title: "McKinsey Case Interview Practice",
    type: "case_study",
    industry: "consulting",
    difficulty: "advanced",
    scheduledAt: "2024-01-20T14:00:00Z",
    duration: 90,
    description: "Practice case interviews for management consulting roles",
    interviewer: {
      name: "AI Interviewer - Jennifer Wu",
      title: "Principal at McKinsey & Company",
      experience: "15 years"
    },
    preparationMaterials: [
      "Case interview frameworks",
      "Market sizing techniques",
      "Business strategy fundamentals"
    ]
  },
  {
    id: "upcoming_002",
    title: "Meta System Design Interview",
    type: "technical",
    industry: "technology",
    difficulty: "advanced",
    scheduledAt: "2024-01-22T10:30:00Z",
    duration: 60,
    description: "System design interview for senior software engineer position",
    interviewer: {
      name: "AI Interviewer - Alex Thompson",
      title: "Staff Engineer at Meta",
      experience: "12 years"
    },
    preparationMaterials: [
      "System design fundamentals",
      "Scalability patterns",
      "Database design principles"
    ]
  }
];

export const interviewTips = {
  behavioral: [
    "Use the STAR method (Situation, Task, Action, Result)",
    "Prepare 5-7 concrete examples from your experience",
    "Practice storytelling with clear beginning, middle, and end",
    "Show self-awareness and learning from experiences",
    "Quantify your impact with specific numbers when possible"
  ],
  technical: [
    "Think out loud and explain your approach",
    "Start with clarifying questions about requirements",
    "Write clean, readable code with proper variable names",
    "Consider edge cases and error handling",
    "Discuss time and space complexity",
    "Test your solution with examples"
  ],
  case_study: [
    "Structure your approach using frameworks (e.g., 4Cs, Porter's Five Forces)",
    "Ask clarifying questions to understand the problem",
    "Break down complex problems into smaller components",
    "Make reasonable assumptions and state them clearly",
    "Support your recommendations with logical reasoning",
    "Consider implementation challenges and next steps"
  ],
  hr_screening: [
    "Research the company and role thoroughly",
    "Prepare your elevator pitch (30-60 seconds)",
    "Have specific examples ready for common questions",
    "Show enthusiasm and cultural fit",
    "Prepare thoughtful questions about the role and company",
    "Be honest about your experience and expectations"
  ],
  group_discussion: [
    "Listen actively to other participants",
    "Build on others' ideas constructively",
    "Take initiative when appropriate",
    "Stay focused on the topic and objectives",
    "Encourage quieter participants to contribute",
    "Summarize key points and drive towards conclusions"
  ],
  presentation: [
    "Structure your presentation with clear introduction, body, and conclusion",
    "Use storytelling to make your content engaging",
    "Practice your timing and stay within limits",
    "Prepare for potential questions and objections",
    "Use visual aids effectively if applicable",
    "Maintain eye contact and confident body language"
  ]
};

export const performanceMetrics = {
  totalSessions: 15,
  averageScore: 84,
  improvementRate: 12,
  strongAreas: ["Communication", "Problem Solving", "Technical Skills"],
  improvementAreas: ["System Design", "Leadership", "Business Acumen"],
  sessionsByType: {
    behavioral: 6,
    technical: 4,
    case_study: 3,
    hr_screening: 2
  },
  scoreProgression: [
    { session: 1, score: 72, date: "2023-12-01" },
    { session: 2, score: 75, date: "2023-12-05" },
    { session: 3, score: 78, date: "2023-12-10" },
    { session: 4, score: 82, date: "2023-12-15" },
    { session: 5, score: 85, date: "2023-12-20" },
    { session: 6, score: 88, date: "2023-12-25" },
    { session: 7, score: 84, date: "2024-01-02" },
    { session: 8, score: 87, date: "2024-01-05" },
    { session: 9, score: 90, date: "2024-01-08" },
    { session: 10, score: 92, date: "2024-01-10" },
    { session: 11, score: 89, date: "2024-01-12" },
    { session: 12, score: 85, date: "2024-01-15" },
    { session: 13, score: 88, date: "2024-01-18" },
    { session: 14, score: 91, date: "2024-01-20" },
    { session: 15, score: 93, date: "2024-01-22" }
  ]
};

export const companies = [
  { id: "google", name: "Google", logo: "/logos/google.png", interviewStyles: ["technical", "behavioral"] },
  { id: "microsoft", name: "Microsoft", logo: "/logos/microsoft.png", interviewStyles: ["technical", "behavioral", "case_study"] },
  { id: "amazon", name: "Amazon", logo: "/logos/amazon.png", interviewStyles: ["behavioral", "technical"] },
  { id: "meta", name: "Meta", logo: "/logos/meta.png", interviewStyles: ["technical", "behavioral"] },
  { id: "apple", name: "Apple", logo: "/logos/apple.png", interviewStyles: ["technical", "behavioral"] },
  { id: "netflix", name: "Netflix", logo: "/logos/netflix.png", interviewStyles: ["behavioral", "technical"] },
  { id: "tesla", name: "Tesla", logo: "/logos/tesla.png", interviewStyles: ["technical", "behavioral"] },
  { id: "mckinsey", name: "McKinsey", logo: "/logos/mckinsey.png", interviewStyles: ["case_study", "behavioral"] },
  { id: "goldman_sachs", name: "Goldman Sachs", logo: "/logos/goldman.png", interviewStyles: ["behavioral", "case_study"] },
  { id: "jpmorgan", name: "JPMorgan Chase", logo: "/logos/jpmorgan.png", interviewStyles: ["behavioral", "technical"] }
];

export const questionBank = {
  behavioral: [
    "Tell me about yourself",
    "Why do you want to work here?",
    "Describe a challenging project you worked on",
    "How do you handle stress and pressure?",
    "Tell me about a time you disagreed with your manager",
    "Describe a situation where you had to learn something new quickly",
    "Give an example of when you showed leadership",
    "Tell me about a time you failed",
    "How do you prioritize multiple tasks?",
    "Describe a time you worked with a difficult team member"
  ],
  technical: [
    "Reverse a linked list",
    "Find two numbers in an array that sum to a target",
    "Design a cache system",
    "Implement a binary search algorithm",
    "Find the longest common subsequence",
    "Design a rate limiter",
    "Implement a stack using queues",
    "Find the maximum depth of a binary tree",
    "Design a chat application",
    "Optimize a database query"
  ],
  case_study: [
    "How would you increase profitability for a declining retail chain?",
    "Estimate the market size for electric vehicles in India",
    "Should Netflix enter the gaming market?",
    "A tech startup's user growth has stagnated - what would you do?",
    "How would you price a new subscription service?",
    "Design a go-to-market strategy for a B2B software product",
    "A company's customer satisfaction scores are declining - investigate",
    "Should a traditional bank launch a cryptocurrency trading platform?",
    "How would you reduce customer churn for a SaaS company?",
    "Evaluate whether a company should acquire a competitor"
  ]
};