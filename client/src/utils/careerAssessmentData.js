// Career Assessment Data and Questions
export const personalityQuestions = [
  {
    id: 1,
    question: "I prefer working in a team environment rather than alone",
    category: "teamwork",
    weight: 1,
  },
  {
    id: 2,
    question: "I enjoy solving complex problems and puzzles",
    category: "analytical",
    weight: 1,
  },
  {
    id: 3,
    question: "I like to take charge and lead others",
    category: "leadership",
    weight: 1,
  },
  {
    id: 4,
    question: "I prefer structured and organized work environments",
    category: "organization",
    weight: 1,
  },
  {
    id: 5,
    question: "I enjoy creative and artistic activities",
    category: "creativity",
    weight: 1,
  },
  {
    id: 6,
    question: "I like helping and supporting others",
    category: "helping",
    weight: 1,
  },
  {
    id: 7,
    question: "I enjoy working with technology and computers",
    category: "technology",
    weight: 1,
  },
  {
    id: 8,
    question: "I prefer routine tasks over unpredictable ones",
    category: "routine",
    weight: 1,
  },
  {
    id: 9,
    question: "I enjoy public speaking and presentations",
    category: "communication",
    weight: 1,
  },
  {
    id: 10,
    question: "I like working with numbers and data",
    category: "analytical",
    weight: 1,
  },
  {
    id: 11,
    question: "I prefer working outdoors rather than in an office",
    category: "environment",
    weight: 1,
  },
  {
    id: 12,
    question: "I enjoy learning new things constantly",
    category: "learning",
    weight: 1,
  },
  {
    id: 13,
    question: "I like to work at my own pace",
    category: "independence",
    weight: 1,
  },
  {
    id: 14,
    question: "I enjoy competing with others",
    category: "competitive",
    weight: 1,
  },
  {
    id: 15,
    question: "I prefer long-term projects over short-term tasks",
    category: "planning",
    weight: 1,
  },
];

export const skillsQuestions = [
  {
    id: 1,
    skill: "Programming",
    question: "Rate your programming skills",
    category: "technical",
  },
  {
    id: 2,
    skill: "Communication",
    question: "Rate your communication skills",
    category: "soft",
  },
  {
    id: 3,
    skill: "Leadership",
    question: "Rate your leadership abilities",
    category: "soft",
  },
  {
    id: 4,
    skill: "Problem Solving",
    question: "Rate your problem-solving skills",
    category: "cognitive",
  },
  {
    id: 5,
    skill: "Time Management",
    question: "Rate your time management skills",
    category: "soft",
  },
  {
    id: 6,
    skill: "Data Analysis",
    question: "Rate your data analysis skills",
    category: "technical",
  },
  {
    id: 7,
    skill: "Design",
    question: "Rate your design abilities",
    category: "creative",
  },
  {
    id: 8,
    skill: "Writing",
    question: "Rate your writing skills",
    category: "creative",
  },
  {
    id: 9,
    skill: "Mathematics",
    question: "Rate your mathematical abilities",
    category: "technical",
  },
  {
    id: 10,
    skill: "Sales",
    question: "Rate your sales abilities",
    category: "soft",
  },
];

export const careerMatches = {
  "high-tech-analytical": {
    careers: [
      "Software Engineer",
      "Data Scientist",
      "Cybersecurity Analyst",
      "AI Researcher",
    ],
    description: "You excel in technology and analytical thinking",
    color: "#3B82F6",
  },
  "creative-communication": {
    careers: [
      "UX Designer",
      "Marketing Manager",
      "Content Creator",
      "Art Director",
    ],
    description: "You have strong creative and communication skills",
    color: "#8B5CF6",
  },
  "leadership-business": {
    careers: [
      "Product Manager",
      "Business Analyst",
      "Management Consultant",
      "Entrepreneur",
    ],
    description: "You show leadership potential and business acumen",
    color: "#059669",
  },
  "helping-healthcare": {
    careers: ["Doctor", "Nurse", "Therapist", "Social Worker"],
    description: "You have a passion for helping others",
    color: "#EF4444",
  },
  "analytical-finance": {
    careers: [
      "Financial Analyst",
      "Investment Banker",
      "Accountant",
      "Risk Manager",
    ],
    description: "You excel with numbers and financial concepts",
    color: "#F59E0B",
  },
  "technical-engineering": {
    careers: [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Chemical Engineer",
    ],
    description: "You have strong technical and problem-solving skills",
    color: "#6366F1",
  },
  "creative-media": {
    careers: [
      "Journalist",
      "Photographer",
      "Video Producer",
      "Graphic Designer",
    ],
    description: "You excel in creative media and storytelling",
    color: "#EC4899",
  },
  "research-science": {
    careers: [
      "Research Scientist",
      "Lab Technician",
      "Environmental Scientist",
      "Biologist",
    ],
    description: "You have a passion for research and scientific discovery",
    color: "#10B981",
  },
};

export const personalityTypes = [
  {
    id: "analyst",
    name: "The Analyst",
    description: "Logical, analytical, and detail-oriented",
    traits: [
      "Problem Solving",
      "Critical Thinking",
      "Data-Driven",
      "Systematic",
    ],
    careers: [
      "Data Scientist",
      "Research Analyst",
      "Financial Analyst",
      "Software Engineer",
    ],
    color: "#3B82F6",
  },
  {
    id: "creator",
    name: "The Creator",
    description: "Innovative, artistic, and imaginative",
    traits: [
      "Creativity",
      "Innovation",
      "Artistic Vision",
      "Original Thinking",
    ],
    careers: ["Graphic Designer", "Artist", "Writer", "Architect"],
    color: "#8B5CF6",
  },
  {
    id: "leader",
    name: "The Leader",
    description: "Charismatic, decisive, and goal-oriented",
    traits: [
      "Leadership",
      "Decision Making",
      "Strategic Thinking",
      "Motivation",
    ],
    careers: ["Manager", "Entrepreneur", "Team Lead", "CEO"],
    color: "#059669",
  },
  {
    id: "helper",
    name: "The Helper",
    description: "Empathetic, supportive, and people-focused",
    traits: ["Empathy", "Communication", "Supportive", "Team Player"],
    careers: ["Teacher", "Counselor", "Nurse", "Social Worker"],
    color: "#EF4444",
  },
  {
    id: "explorer",
    name: "The Explorer",
    description: "Adventurous, curious, and adaptable",
    traits: ["Adaptability", "Curiosity", "Risk-Taking", "Open-Minded"],
    careers: ["Travel Writer", "Photographer", "Sales Rep", "Consultant"],
    color: "#F59E0B",
  },
  {
    id: "organizer",
    name: "The Organizer",
    description: "Structured, reliable, and methodical",
    traits: ["Organization", "Reliability", "Attention to Detail", "Planning"],
    careers: [
      "Project Manager",
      "Accountant",
      "Operations Manager",
      "Administrator",
    ],
    color: "#6366F1",
  },
];

export const industryPreferences = [
  {
    id: "technology",
    name: "Technology",
    icon: "💻",
    description: "Software, AI, and digital innovation",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    description: "Medical care and life sciences",
  },
  {
    id: "finance",
    name: "Finance",
    icon: "💰",
    description: "Banking, investments, and financial services",
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
    description: "Teaching and educational technology",
  },
  {
    id: "creative",
    name: "Creative Arts",
    icon: "🎨",
    description: "Design, media, and entertainment",
  },
  {
    id: "business",
    name: "Business",
    icon: "💼",
    description: "Consulting, management, and strategy",
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "⚙️",
    description: "Manufacturing and technical solutions",
  },
  {
    id: "science",
    name: "Science & Research",
    icon: "🔬",
    description: "Research and scientific discovery",
  },
  {
    id: "social",
    name: "Social Impact",
    icon: "🤝",
    description: "Non-profit and social causes",
  },
  {
    id: "environment",
    name: "Environment",
    icon: "🌱",
    description: "Sustainability and green technology",
  },
];

export const workEnvironmentPreferences = [
  {
    id: "office",
    name: "Traditional Office",
    icon: "🏢",
    description: "Structured office environment",
  },
  {
    id: "remote",
    name: "Remote Work",
    icon: "🏠",
    description: "Work from anywhere flexibility",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    icon: "⚡",
    description: "Mix of office and remote work",
  },
  {
    id: "startup",
    name: "Startup",
    icon: "🚀",
    description: "Fast-paced, innovative environment",
  },
  {
    id: "corporate",
    name: "Large Corporation",
    icon: "🏛️",
    description: "Established, structured company",
  },
  {
    id: "outdoors",
    name: "Outdoor Work",
    icon: "🌲",
    description: "Field work and outdoor activities",
  },
];
