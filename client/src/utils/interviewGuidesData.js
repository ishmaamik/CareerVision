// Mock data for interview guides and preparation materials
export const interviewGuideCategories = [
  {
    id: "behavioral",
    name: "Behavioral Interviews",
    description: "Master the art of storytelling and demonstrate your soft skills",
    icon: "psychology",
    color: "#3B82F6",
    guideCount: 15,
    questionCount: 120,
    topics: ["STAR Method", "Leadership Stories", "Conflict Resolution", "Teamwork"]
  },
  {
    id: "technical",
    name: "Technical Interviews",
    description: "Ace coding challenges and system design questions",
    icon: "code",
    color: "#10B981",
    guideCount: 22,
    questionCount: 200,
    topics: ["Data Structures", "Algorithms", "System Design", "Database Design"]
  },
  {
    id: "case_study",
    name: "Case Study Interviews",
    description: "Excel in consulting and business case analysis",
    icon: "business_center",
    color: "#F59E0B",
    guideCount: 12,
    questionCount: 80,
    topics: ["Market Sizing", "Profitability", "Strategy", "Operations"]
  },
  {
    id: "industry_specific",
    name: "Industry-Specific",
    description: "Tailored guidance for specific industries and roles",
    icon: "work",
    color: "#EF4444",
    guideCount: 18,
    questionCount: 150,
    topics: ["Finance", "Healthcare", "Technology", "Consulting"]
  },
  {
    id: "company_culture",
    name: "Company Culture Fit",
    description: "Understand company values and demonstrate cultural alignment",
    icon: "group",
    color: "#8B5CF6",
    guideCount: 10,
    questionCount: 60,
    topics: ["Values Alignment", "Work Style", "Team Dynamics", "Growth Mindset"]
  },
  {
    id: "executive",
    name: "Executive Interviews",
    description: "Senior leadership and C-level interview preparation",
    icon: "account_circle",
    color: "#06B6D4",
    guideCount: 8,
    questionCount: 40,
    topics: ["Strategic Vision", "Leadership Philosophy", "Change Management", "Board Relations"]
  }
];

export const featuredGuides = [
  {
    id: "guide_001",
    title: "Complete STAR Method Mastery",
    category: "behavioral",
    difficulty: "Beginner",
    readTime: "25 min",
    rating: 4.9,
    reviews: 1247,
    author: "Sarah Johnson, Former Google Recruiter",
    description: "Learn the proven STAR (Situation, Task, Action, Result) framework to structure compelling interview responses",
    topics: ["STAR Framework", "Story Structure", "Impact Measurement", "Practice Examples"],
    isFeatured: true,
    isPopular: true,
    thumbnail: "/guides/star-method.jpg"
  },
  {
    id: "guide_002",
    title: "System Design Interview Bible",
    category: "technical",
    difficulty: "Advanced",
    readTime: "45 min",
    rating: 4.8,
    reviews: 892,
    author: "Alex Chen, Senior Engineer at Meta",
    description: "Comprehensive guide to approaching system design questions for senior engineering roles",
    topics: ["Scalability Patterns", "Database Design", "Microservices", "Load Balancing"],
    isFeatured: true,
    isPopular: true,
    thumbnail: "/guides/system-design.jpg"
  },
  {
    id: "guide_003",
    title: "McKinsey Case Interview Framework",
    category: "case_study",
    difficulty: "Advanced",
    readTime: "35 min",
    rating: 4.9,
    reviews: 654,
    author: "Jennifer Wu, McKinsey Partner",
    description: "Master the structured thinking approach used by top consulting firms",
    topics: ["MECE Principle", "Issue Trees", "Hypothesis Testing", "Quantitative Analysis"],
    isFeatured: true,
    isPopular: false,
    thumbnail: "/guides/mckinsey-case.jpg"
  },
  {
    id: "guide_004",
    title: "Amazon Leadership Principles Deep Dive",
    category: "company_culture",
    difficulty: "Intermediate",
    readTime: "30 min",
    rating: 4.7,
    reviews: 1089,
    author: "Michael Torres, Amazon Bar Raiser",
    description: "Understand and demonstrate Amazon's 16 leadership principles with real examples",
    topics: ["Customer Obsession", "Ownership", "Invent and Simplify", "Learn and Be Curious"],
    isFeatured: true,
    isPopular: true,
    thumbnail: "/guides/amazon-leadership.jpg"
  }
];

export const questionBanks = {
  behavioral: [
    {
      id: "q001",
      question: "Tell me about yourself",
      category: "Introduction",
      difficulty: "Basic",
      tips: [
        "Keep it professional and relevant to the role",
        "Follow a present-past-future structure",
        "Highlight key achievements that align with job requirements",
        "Practice your 2-minute elevator pitch"
      ],
      sampleAnswer: "I'm currently a software engineer at TechCorp with 3 years of experience building scalable web applications. Previously, I graduated from MIT with a Computer Science degree and interned at Google. I'm passionate about creating user-centric solutions and am looking to join a company where I can contribute to innovative products while growing into a tech lead role.",
      followUpQuestions: [
        "What interests you about this role?",
        "Why are you looking to make a change?",
        "What are your career goals?"
      ]
    },
    {
      id: "q002",
      question: "Describe a time when you had to work with a difficult team member",
      category: "Teamwork",
      difficulty: "Intermediate",
      tips: [
        "Use the STAR method to structure your response",
        "Focus on your actions and conflict resolution skills",
        "Show empathy and understanding of different perspectives",
        "Highlight positive outcomes and lessons learned"
      ],
      sampleAnswer: "At my previous job, I worked with a colleague who frequently missed deadlines, affecting our team's deliverables. I scheduled a one-on-one conversation to understand their challenges - they were overwhelmed with multiple projects. I helped prioritize their tasks and offered to pair-program on complex features. As a result, they became more reliable, and our team improved delivery time by 30%.",
      followUpQuestions: [
        "How do you handle feedback?",
        "Tell me about a time you had to give difficult feedback",
        "How do you build relationships with new team members?"
      ]
    },
    {
      id: "q003",
      question: "Tell me about a time you failed and what you learned",
      category: "Learning & Growth",
      difficulty: "Advanced",
      tips: [
        "Choose a real failure, not a disguised success",
        "Take full ownership without blaming others",
        "Focus heavily on lessons learned and improvements made",
        "Show how the failure led to better outcomes later"
      ],
      sampleAnswer: "In my first year as a product manager, I launched a feature without sufficient user research. Despite positive internal feedback, user adoption was only 15%. I realized I had relied too heavily on assumptions. I implemented a new user research process, conducted interviews with 50+ users, and redesigned the feature based on their feedback. The relaunched version achieved 70% adoption and became one of our most popular features.",
      followUpQuestions: [
        "How do you handle setbacks?",
        "Tell me about a risk you took that didn't pay off",
        "How do you learn from mistakes?"
      ]
    }
  ],
  technical: [
    {
      id: "t001",
      question: "Reverse a linked list",
      category: "Data Structures",
      difficulty: "Medium",
      tips: [
        "Understand both iterative and recursive approaches",
        "Draw out the process step by step",
        "Consider edge cases (empty list, single node)",
        "Analyze time and space complexity"
      ],
      sampleCode: `
def reverse_linked_list(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev
      `,
      complexity: "Time: O(n), Space: O(1)",
      variations: [
        "Reverse a linked list recursively",
        "Reverse nodes in k-group",
        "Reverse a doubly linked list"
      ]
    },
    {
      id: "t002",
      question: "Design a URL shortener like bit.ly",
      category: "System Design",
      difficulty: "Hard",
      tips: [
        "Start with requirements gathering",
        "Consider scale and performance requirements",
        "Design database schema carefully",
        "Think about caching and load balancing"
      ],
      keyComponents: [
        "URL encoding/decoding service",
        "Database design (SQL vs NoSQL)",
        "Caching layer (Redis)",
        "Load balancer",
        "Analytics service",
        "Rate limiting"
      ],
      scaleConsiderations: [
        "Handle 100M URLs per day",
        "100:1 read to write ratio",
        "5 years of data retention",
        "High availability requirements"
      ]
    }
  ],
  caseStudy: [
    {
      id: "c001",
      question: "How would you increase profitability for a declining coffee shop chain?",
      category: "Profitability",
      difficulty: "Hard",
      framework: "Profitability = Revenue - Costs",
      approach: [
        "Structure the problem using profit framework",
        "Identify potential revenue increase opportunities",
        "Analyze cost reduction possibilities",
        "Prioritize recommendations based on impact and feasibility"
      ],
      keyAreas: [
        "Revenue: Menu pricing, new products, customer acquisition",
        "Costs: Labor, rent, supplies, operational efficiency",
        "Market analysis: Competition, customer trends",
        "Implementation: Timeline, resources, risk assessment"
      ]
    }
  ]
};

export const companySpecificGuides = [
  {
    id: "company_google",
    company: "Google",
    logo: "/logos/google.png",
    culture: "Innovation-driven, data-focused, collaborative",
    values: ["Focus on the user", "Think big", "Move fast", "Be open"],
    interviewProcess: [
      "Phone/Video screening",
      "Technical phone interview",
      "Onsite interviews (4-6 rounds)",
      "Hiring committee review"
    ],
    commonQuestions: [
      "Why Google?",
      "How would you improve Google Search?",
      "Tell me about a time you solved a complex technical problem",
      "How do you handle ambiguity?"
    ],
    tips: [
      "Emphasize impact and scale in your examples",
      "Show passion for Google's products",
      "Demonstrate analytical thinking",
      "Be prepared for Googleyness and leadership questions"
    ],
    resources: [
      "Google's hiring guide",
      "Technical interview prep",
      "Product sense questions",
      "Leadership scenarios"
    ]
  },
  {
    id: "company_amazon",
    company: "Amazon",
    logo: "/logos/amazon.png",
    culture: "Customer-obsessed, ownership-driven, high-performance",
    values: ["Customer Obsession", "Ownership", "Invent and Simplify", "Learn and Be Curious"],
    interviewProcess: [
      "Online application",
      "Phone screening",
      "Virtual or onsite interviews",
      "Bar raiser interview"
    ],
    commonQuestions: [
      "Tell me about a time you disagreed with your manager",
      "Describe a time you had to work with limited resources",
      "How do you prioritize competing demands?",
      "Give an example of when you took ownership of a problem"
    ],
    tips: [
      "Use specific examples that demonstrate leadership principles",
      "Quantify your impact with metrics",
      "Show customer focus in your stories",
      "Be prepared to dive deep into technical details"
    ],
    resources: [
      "Amazon Leadership Principles guide",
      "STAR method examples",
      "Bar raiser interview prep",
      "Technical deep dives"
    ]
  },
  {
    id: "company_mckinsey",
    company: "McKinsey & Company",
    logo: "/logos/mckinsey.png",
    culture: "Client-focused, analytical excellence, collaborative problem-solving",
    values: ["Client impact", "Professional excellence", "Inclusive collaboration", "Courageous advocacy"],
    interviewProcess: [
      "Resume screening",
      "First round interviews (2 interviews)",
      "Final round interviews (2-3 interviews)",
      "Fit and case interviews"
    ],
    commonQuestions: [
      "Walk me through your resume",
      "Why consulting? Why McKinsey?",
      "Case study problems",
      "Behavioral questions about leadership and teamwork"
    ],
    tips: [
      "Master the case interview methodology",
      "Show structured thinking and clear communication",
      "Demonstrate leadership potential",
      "Research McKinsey's recent work and thought leadership"
    ],
    resources: [
      "Case interview frameworks",
      "McKinsey PST practice",
      "Behavioral interview guide",
      "Industry knowledge prep"
    ]
  }
];

export const interviewTipsCategories = [
  {
    id: "preparation",
    title: "Interview Preparation",
    tips: [
      {
        tip: "Research the company thoroughly",
        description: "Understand their mission, values, recent news, and competitors. Show genuine interest and cultural fit."
      },
      {
        tip: "Practice your stories using the STAR method",
        description: "Prepare 7-10 compelling examples that demonstrate different skills and competencies."
      },
      {
        tip: "Prepare thoughtful questions to ask",
        description: "Show engagement and interest by asking about company culture, growth opportunities, and challenges."
      },
      {
        tip: "Do mock interviews",
        description: "Practice with friends, mentors, or professional services to get comfortable with the format."
      }
    ]
  },
  {
    id: "during_interview",
    title: "During the Interview",
    tips: [
      {
        tip: "Listen actively and take notes",
        description: "Show engagement by taking notes and asking clarifying questions when needed."
      },
      {
        tip: "Think out loud for technical problems",
        description: "Walk through your thought process so interviewers can follow your reasoning."
      },
      {
        tip: "Be specific with examples",
        description: "Use concrete details, metrics, and outcomes to make your stories memorable and credible."
      },
      {
        tip: "Show enthusiasm and energy",
        description: "Demonstrate genuine interest in the role and company through your body language and responses."
      }
    ]
  },
  {
    id: "follow_up",
    title: "Post-Interview",
    tips: [
      {
        tip: "Send thank you notes within 24 hours",
        description: "Personalize your message by referencing specific conversation points from the interview."
      },
      {
        tip: "Reflect on your performance",
        description: "Note what went well and areas for improvement for future interviews."
      },
      {
        tip: "Follow up appropriately",
        description: "If you don't hear back within the stated timeframe, send a polite follow-up email."
      },
      {
        tip: "Continue interviewing elsewhere",
        description: "Don't put all your eggs in one basket - keep other opportunities active."
      }
    ]
  }
];

export const industryGuides = [
  {
    id: "tech",
    industry: "Technology",
    description: "Navigate interviews at tech companies from startups to FAANG",
    keySkills: ["Technical skills", "Problem solving", "Innovation", "Scalability thinking"],
    commonRoles: ["Software Engineer", "Product Manager", "Data Scientist", "Engineering Manager"],
    interviewTypes: ["Coding", "System Design", "Behavioral", "Product Sense"],
    preparationFocus: [
      "Technical fundamentals and coding practice",
      "System design for scalability",
      "Product thinking and user focus",
      "Leadership and collaboration examples"
    ]
  },
  {
    id: "consulting",
    industry: "Management Consulting",
    description: "Excel in case interviews and demonstrate business acumen",
    keySkills: ["Analytical thinking", "Problem solving", "Communication", "Business sense"],
    commonRoles: ["Business Analyst", "Associate", "Engagement Manager", "Principal"],
    interviewTypes: ["Case Study", "Fit Interview", "Written Test", "Group Discussion"],
    preparationFocus: [
      "Case interview frameworks and practice",
      "Business fundamentals and industry knowledge",
      "Structured communication and presentation",
      "Leadership and client management stories"
    ]
  },
  {
    id: "finance",
    industry: "Finance & Banking",
    description: "Succeed in investment banking, private equity, and financial services",
    keySkills: ["Financial modeling", "Analytical skills", "Attention to detail", "Client focus"],
    commonRoles: ["Investment Banking Analyst", "Financial Advisor", "Risk Manager", "Trader"],
    interviewTypes: ["Technical Finance", "Market Knowledge", "Behavioral", "Case Study"],
    preparationFocus: [
      "Financial concepts and valuation methods",
      "Market knowledge and current events",
      "Attention to detail and accuracy",
      "Client service and teamwork examples"
    ]
  }
];

export const studyPlans = [
  {
    id: "plan_1week",
    duration: "1 Week Intensive",
    description: "Crash course for upcoming interviews",
    dailyHours: "3-4 hours",
    schedule: [
      {
        day: 1,
        focus: "Research & Foundation",
        activities: ["Company research", "Role analysis", "STAR method review"]
      },
      {
        day: 2,
        focus: "Behavioral Prep",
        activities: ["Story development", "Practice responses", "Mock behavioral interview"]
      },
      {
        day: 3,
        focus: "Technical Skills",
        activities: ["Technical review", "Coding practice", "System design basics"]
      },
      {
        day: 4,
        focus: "Case Studies",
        activities: ["Framework learning", "Case practice", "Business fundamentals"]
      },
      {
        day: 5,
        focus: "Mock Interviews",
        activities: ["Full mock interview", "Feedback review", "Improvement areas"]
      },
      {
        day: 6,
        focus: "Final Prep",
        activities: ["Question preparation", "Research updates", "Relaxation techniques"]
      },
      {
        day: 7,
        focus: "Interview Day",
        activities: ["Final review", "Confidence building", "Interview execution"]
      }
    ]
  },
  {
    id: "plan_1month",
    duration: "1 Month Comprehensive",
    description: "Thorough preparation for multiple opportunities",
    dailyHours: "1-2 hours",
    schedule: [
      {
        week: 1,
        focus: "Foundation Building",
        activities: ["Company research", "Industry analysis", "Skill assessment", "Story development"]
      },
      {
        week: 2,
        focus: "Skill Development",
        activities: ["Technical practice", "Case interview training", "Communication skills", "Mock interviews"]
      },
      {
        week: 3,
        focus: "Advanced Preparation",
        activities: ["Advanced topics", "Industry-specific prep", "Leadership scenarios", "Stress interviews"]
      },
      {
        week: 4,
        focus: "Final Polish",
        activities: ["Full mock interviews", "Feedback integration", "Confidence building", "Last-minute prep"]
      }
    ]
  }
];

export const popularResources = [
  {
    id: "res_001",
    title: "Cracking the Coding Interview",
    type: "Book",
    author: "Gayle Laakmann McDowell",
    rating: 4.8,
    description: "Essential guide for technical interview preparation with 189 programming questions",
    topics: ["Data Structures", "Algorithms", "System Design", "Behavioral"]
  },
  {
    id: "res_002",
    title: "Case in Point",
    type: "Book", 
    author: "Marc Cosentino",
    rating: 4.7,
    description: "Complete case interview preparation for consulting roles",
    topics: ["Case Frameworks", "Market Sizing", "Profitability", "Strategy"]
  },
  {
    id: "res_003",
    title: "Behavioral Interview Masterclass",
    type: "Course",
    author: "Interview Prep Academy",
    rating: 4.9,
    description: "Comprehensive course on behavioral interview techniques and storytelling",
    topics: ["STAR Method", "Leadership Stories", "Conflict Resolution", "Career Goals"]
  },
  {
    id: "res_004",
    title: "System Design Interview",
    type: "Book",
    author: "Alex Xu",
    rating: 4.8,
    description: "Insider's guide to system design interviews with real-world examples",
    topics: ["Scalability", "Database Design", "Microservices", "Load Balancing"]
  }
];