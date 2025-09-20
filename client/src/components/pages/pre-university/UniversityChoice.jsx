import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { getThemeClasses, getComponentStyles } from "../../../styles/themes";
import {
  ArrowBack,
  School,
  LocationOn,
  Star,
  TrendingUp,
  Money,
  Group,
  Language,
  Public,
  CheckCircle,
  Search,
  FilterList,
  BookmarkBorder,
  Bookmark,
  Launch,
  ArrowForward,
  Grade,
  Work,
  Timeline,
  Reviews,
  Person,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const UniversityChoice = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const themeClasses = getThemeClasses(isDarkMode);
  const componentStyles = getComponentStyles(isDarkMode);

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [bookmarkedUniversities, setBookmarkedUniversities] = useState(
    new Set()
  );
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const categories = [
    "All Universities",
    "Top Ranked",
    "By Field",
    "Admission Requirements",
    "Scholarships",
  ];

  const fields = [
    { id: "engineering", name: "Engineering", icon: "🔧", color: "#3b82f6" },
    { id: "medicine", name: "Medicine", icon: "🏥", color: "#ef4444" },
    { id: "business", name: "Business", icon: "💼", color: "#059669" },
    {
      id: "computer_science",
      name: "Computer Science",
      icon: "💻",
      color: "#8b5cf6",
    },
    { id: "arts", name: "Arts & Humanities", icon: "🎨", color: "#ec4899" },
    { id: "science", name: "Natural Sciences", icon: "🔬", color: "#10b981" },
    {
      id: "social_science",
      name: "Social Sciences",
      icon: "👥",
      color: "#f59e0b",
    },
    { id: "law", name: "Law", icon: "⚖️", color: "#374151" },
  ];

  const universities = [
    {
      id: 1,
      name: "Bangladesh University of Engineering and Technology (BUET)",
      banglaName: "বাংলাদেশ প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
      location: "Dhaka, Bangladesh",
      ranking: 1,
      rating: 4.8,
      tuition: "৳১৫,০০০-৩০,০০০",
      acceptanceRate: "2%",
      studentCount: "8,500",
      type: "Public",
      logo: "BUET",
      color: "#1565C0",
      fields: ["engineering", "computer_science", "science"],
      programs: [
        "Computer Science & Engineering",
        "Electrical & Electronic Engineering",
        "Civil Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Architecture",
      ],
      highlights: [
        "Bangladesh's premier engineering university",
        "Highest engineering admission standard",
        "Strong industry connections",
        "Excellent job placement in tech companies",
      ],
      requirements: {
        admission: "BUET Admission Test",
        hsc: "GPA 5.00 (Science)",
        subjects: "Physics, Chemistry, Mathematics required",
        cutoff: "Top 1000 in admission test",
      },
      scholarships: [
        "Merit-based scholarships",
        "Need-based financial aid",
        "Prime Minister's Education Assistance",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 120,
          overview:
            "Leading CSE program in Bangladesh with focus on software engineering, AI, and data science",
          facilities: [
            "Modern computer labs",
            "High-speed internet",
            "Project labs",
            "Research centers",
          ],
          careerProspects: [
            "Software Engineer",
            "Data Scientist",
            "ML Engineer",
            "Tech Lead",
            "CTO",
          ],
        },
        {
          name: "Electrical & Electronic Engineering",
          duration: "4 years",
          seats: 180,
          overview:
            "Comprehensive EEE program covering power systems, electronics, telecommunications, and control systems",
          facilities: [
            "Advanced labs",
            "Power system lab",
            "Electronics lab",
            "Microprocessor lab",
          ],
          careerProspects: [
            "Power Engineer",
            "Electronics Engineer",
            "Telecom Engineer",
            "Control Systems Engineer",
          ],
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 180,
          overview:
            "Infrastructure and construction engineering with focus on sustainable development",
          facilities: [
            "Structural lab",
            "Concrete lab",
            "Surveying equipment",
            "CAD lab",
          ],
          careerProspects: [
            "Structural Engineer",
            "Construction Manager",
            "Urban Planner",
            "Project Manager",
          ],
        },
      ],
    },
    {
      id: 2,
      name: "University of Dhaka",
      banglaName: "ঢাকা বিশ্ববিদ্যালয়",
      location: "Dhaka, Bangladesh",
      ranking: 2,
      rating: 4.6,
      tuition: "৳১০,০০০-২৫,০০০",
      acceptanceRate: "8%",
      studentCount: "46,000",
      type: "Public",
      logo: "DU",
      color: "#2E7D32",
      fields: ["arts", "business", "science", "social_science"],
      programs: [
        "Computer Science",
        "Economics",
        "English Literature",
        "International Business",
        "Physics",
        "Chemistry",
      ],
      highlights: [
        "Oldest modern university in Bangladesh",
        "Strong liberal arts education",
        "Active student life and culture",
        "Historic Curzon Hall campus",
      ],
      requirements: {
        admission: "DU Admission Test",
        hsc: "GPA 4.00+ (varies by faculty)",
        subjects: "Subject-specific requirements",
        cutoff: "Faculty-wise merit list",
      },
      scholarships: [
        "Merit scholarships",
        "Need-based aid",
        "Research assistantships",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 60,
          overview:
            "Well-established CSE program with strong theoretical foundation and practical skills",
          facilities: [
            "Computer labs",
            "Internet facility",
            "Programming labs",
            "Project rooms",
          ],
          careerProspects: [
            "Software Developer",
            "System Analyst",
            "Database Administrator",
            "Web Developer",
          ],
        },
        {
          name: "International Business",
          duration: "4 years",
          seats: 90,
          overview:
            "Modern business education with international perspective and practical case studies",
          facilities: [
            "Business lab",
            "Presentation rooms",
            "Library",
            "Seminar halls",
          ],
          careerProspects: [
            "Business Analyst",
            "Marketing Manager",
            "Export-Import Manager",
            "Consultant",
          ],
        },
        {
          name: "English Literature",
          duration: "4 years",
          seats: 120,
          overview:
            "Comprehensive literature program covering classical and contemporary works",
          facilities: [
            "Library",
            "Seminar rooms",
            "Language lab",
            "Drama hall",
          ],
          careerProspects: [
            "Teacher",
            "Journalist",
            "Content Writer",
            "Editor",
            "Translator",
          ],
        },
      ],
    },
    {
      id: 3,
      name: "North South University (NSU)",
      banglaName: "নর্থ সাউথ ইউনিভার্সিটি",
      location: "Dhaka, Bangladesh",
      ranking: 3,
      rating: 4.5,
      tuition: "৳২,৫০,০০০-৪,০০,০০০",
      acceptanceRate: "45%",
      studentCount: "22,000",
      type: "Private",
      logo: "NSU",
      color: "#D32F2F",
      fields: ["business", "engineering", "computer_science"],
      programs: [
        "Computer Science",
        "Business Administration",
        "Electrical Engineering",
        "Civil Engineering",
        "Economics",
        "English",
      ],
      highlights: [
        "Leading private university",
        "American liberal arts model",
        "Strong international partnerships",
        "Modern campus facilities",
      ],
      requirements: {
        admission: "NSU Admission Test + Interview",
        hsc: "GPA 3.50+ (O & A Level equivalent)",
        english: "IELTS 6.0 or equivalent",
        subjects: "Program-specific requirements",
      },
      scholarships: [
        "Merit scholarships up to 100%",
        "Need-based financial aid",
        "Talent scholarships",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 200,
          overview:
            "Industry-aligned CSE program with emphasis on practical skills and innovation",
          facilities: [
            "Modern computer labs",
            "High-speed internet",
            "Research labs",
            "Innovation hub",
          ],
          careerProspects: [
            "Software Engineer",
            "Full-stack Developer",
            "DevOps Engineer",
            "Product Manager",
          ],
        },
        {
          name: "Business Administration",
          duration: "4 years",
          seats: 300,
          overview:
            "Comprehensive business program following American curriculum with local context",
          facilities: [
            "Case study rooms",
            "Presentation facilities",
            "Business simulation lab",
            "Library",
          ],
          careerProspects: [
            "Business Manager",
            "Financial Analyst",
            "Marketing Executive",
            "Entrepreneur",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "BRAC University",
      banglaName: "ব্র্যাক বিশ্ববিদ্যালয়",
      location: "Dhaka, Bangladesh",
      ranking: 4,
      rating: 4.4,
      tuition: "৳২,২০,০০০-৩,৮০,০০০",
      acceptanceRate: "50%",
      studentCount: "18,000",
      type: "Private",
      logo: "BRACU",
      color: "#FF6F00",
      fields: ["business", "computer_science", "engineering"],
      programs: [
        "Computer Science",
        "Business Administration",
        "Economics",
        "Electrical Engineering",
        "Microbiology",
        "English",
      ],
      highlights: [
        "Strong industry connections",
        "Excellent campus facilities",
        "Active research culture",
        "International collaborations",
      ],
      requirements: {
        admission: "BRAC University Admission Test",
        hsc: "GPA 3.50+ (O & A Level equivalent)",
        english: "English proficiency test",
        interview: "Personal interview required",
      },
      scholarships: [
        "Merit scholarships",
        "Need-based aid",
        "Alumni scholarships",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 180,
          overview:
            "Cutting-edge CSE program with focus on emerging technologies and industry readiness",
          facilities: [
            "State-of-the-art labs",
            "Research centers",
            "Innovation lab",
            "Collaboration spaces",
          ],
          careerProspects: [
            "Software Engineer",
            "AI/ML Engineer",
            "Cybersecurity Specialist",
            "Tech Entrepreneur",
          ],
        },
        {
          name: "Business Administration",
          duration: "4 years",
          seats: 250,
          overview:
            "Dynamic business program with emphasis on leadership and entrepreneurship",
          facilities: [
            "Modern classrooms",
            "Case study rooms",
            "Business incubator",
            "Networking events",
          ],
          careerProspects: [
            "Business Leader",
            "Consultant",
            "Financial Manager",
            "Startup Founder",
          ],
        },
      ],
    },
    {
      id: 5,
      name: "Islamic University of Technology (IUT)",
      banglaName: "ইসলামিক ইউনিভার্সিটি অব টেকনোলজি",
      location: "Gazipur, Bangladesh",
      ranking: 5,
      rating: 4.7,
      tuition: "৳৮,০০০-২০,০০০",
      acceptanceRate: "5%",
      studentCount: "3,500",
      type: "International",
      logo: "IUT",
      color: "#388E3C",
      fields: ["engineering", "computer_science"],
      programs: [
        "Computer Science & Engineering",
        "Electrical & Electronic Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Textile Engineering",
      ],
      highlights: [
        "OIC subsidiary university",
        "International faculty",
        "Research-oriented education",
        "Modern residential campus",
      ],
      requirements: {
        admission: "IUT Admission Test",
        hsc: "GPA 5.00 (Science)",
        subjects: "Physics, Chemistry, Mathematics",
        international: "Open to OIC member countries",
      },
      scholarships: [
        "OIC scholarships",
        "Full tuition waivers",
        "Residential scholarships",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 60,
          overview:
            "International standard CSE program with research focus and global perspective",
          facilities: [
            "Advanced computing labs",
            "Research facilities",
            "International library",
            "Modern dormitories",
          ],
          careerProspects: [
            "Research Scientist",
            "Software Architect",
            "International Consultant",
            "Academic",
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Independent University, Bangladesh (IUB)",
      banglaName: "ইন্ডিপেন্ডেন্ট ইউনিভার্সিটি, বাংলাদেশ",
      location: "Dhaka, Bangladesh",
      ranking: 6,
      rating: 4.3,
      tuition: "৳২,০০,০০০-৩,৫০,০০০",
      acceptanceRate: "55%",
      studentCount: "12,000",
      type: "Private",
      logo: "IUB",
      color: "#7B1FA2",
      fields: ["business", "computer_science", "engineering"],
      programs: [
        "Computer Science",
        "Business Administration",
        "Economics",
        "Environmental Science",
        "Media Studies",
        "Public Health",
      ],
      highlights: [
        "Small class sizes",
        "Personalized attention",
        "Strong alumni network",
        "Beautiful campus",
      ],
      requirements: {
        admission: "IUB Admission Test",
        hsc: "GPA 3.00+ (O & A Level equivalent)",
        english: "English aptitude test",
        interview: "Personal interview",
      },
      scholarships: [
        "Academic excellence scholarships",
        "Financial aid programs",
        "Sports scholarships",
      ],
      subjects: [
        {
          name: "Computer Science & Engineering",
          duration: "4 years",
          seats: 120,
          overview:
            "Comprehensive CSE program with focus on practical application and industry collaboration",
          facilities: [
            "Computer labs",
            "Software development center",
            "Project labs",
            "Maker space",
          ],
          careerProspects: [
            "Software Developer",
            "System Designer",
            "Technical Lead",
            "IT Consultant",
          ],
        },
      ],
    },
  ];

  // Sample student reviews for subjects
  const studentReviews = {
    1: {
      // BUET
      "Computer Science & Engineering": [
        {
          id: 1,
          studentName: "Fahim Rahman",
          year: "4th Year",
          rating: 4.5,
          date: "2024-08-15",
          review:
            "BUET CSE is incredibly challenging but rewarding. The curriculum is rigorous and covers both theoretical foundations and practical applications. Professors are experts in their fields, though some classes can be overwhelming. The competitive environment pushes you to excel. Job prospects are excellent - most graduates get offers from top tech companies or pursue higher studies abroad.",
          pros: [
            "World-class faculty",
            "Excellent job prospects",
            "Strong alumni network",
            "Research opportunities",
          ],
          cons: [
            "Extremely competitive",
            "Heavy workload",
            "Limited social life during exams",
          ],
          wouldRecommend: true,
          helpfulVotes: 45,
        },
        {
          id: 2,
          studentName: "Tasnim Ahmed",
          year: "Recent Graduate",
          rating: 4.8,
          date: "2024-07-20",
          review:
            "Four years at BUET CSE transformed my understanding of computer science. The program is tough but comprehensive. You'll learn everything from algorithms to system design. The final year thesis project is particularly valuable - I worked on machine learning applications which directly helped in landing my current job at a tech startup. The peer learning environment is amazing.",
          pros: [
            "Comprehensive curriculum",
            "Hands-on projects",
            "Industry connections",
            "Peer learning",
          ],
          cons: [
            "Intense pressure",
            "Old infrastructure in some labs",
            "Limited electives",
          ],
          wouldRecommend: true,
          helpfulVotes: 38,
        },
        {
          id: 3,
          studentName: "Mehedi Hasan",
          year: "3rd Year",
          rating: 4.2,
          date: "2024-09-01",
          review:
            "BUET CSE is definitely the gold standard for computer science education in Bangladesh. The theoretical foundation you get here is unmatched. However, be prepared for sleepless nights and intense competition. The programming contests and hackathons are great for skill development. Some courses could use more modern examples, but overall it's an excellent program.",
          pros: [
            "Strong theoretical foundation",
            "Programming contests",
            "Networking opportunities",
            "Prestige",
          ],
          cons: [
            "Outdated some course materials",
            "High stress environment",
            "Limited recreational activities",
          ],
          wouldRecommend: true,
          helpfulVotes: 29,
        },
      ],
      "Electrical & Electronic Engineering": [
        {
          id: 4,
          studentName: "Rashida Sultana",
          year: "4th Year",
          rating: 4.4,
          date: "2024-08-10",
          review:
            "EEE at BUET offers excellent exposure to power systems, electronics, and telecommunications. The labs are well-equipped and professors are knowledgeable. The curriculum balances theory with practical work. Power system courses are particularly strong. Many graduates work in power sector companies or pursue higher studies in prestigious universities abroad.",
          pros: [
            "Excellent lab facilities",
            "Industry-relevant curriculum",
            "Strong power systems focus",
            "Good placement",
          ],
          cons: [
            "Heavy course load",
            "Limited flexibility in course selection",
            "Competitive environment",
          ],
          wouldRecommend: true,
          helpfulVotes: 33,
        },
      ],
    },
    2: {
      // University of Dhaka
      "Computer Science & Engineering": [
        {
          id: 5,
          studentName: "Saiful Islam",
          year: "Recent Graduate",
          rating: 4.0,
          date: "2024-07-25",
          review:
            "DU CSE provides a solid foundation in computer science with a good balance of theory and practice. The faculty is experienced and supportive. While not as intensive as BUET, the program still prepares you well for industry. The campus life is vibrant with many cultural activities. Job placement is good, especially for software development roles.",
          pros: [
            "Balanced curriculum",
            "Supportive faculty",
            "Rich campus life",
            "Good industry connections",
          ],
          cons: [
            "Less research focus",
            "Infrastructure could be better",
            "Limited advanced courses",
          ],
          wouldRecommend: true,
          helpfulVotes: 22,
        },
        {
          id: 6,
          studentName: "Fatema Khatun",
          year: "3rd Year",
          rating: 3.8,
          date: "2024-08-20",
          review:
            "DU CSE is a good program with dedicated teachers. The course structure covers all essential topics in computer science. However, some courses need updating to include more recent technologies. The department organizes regular seminars and workshops. Overall, it's a decent choice for those who want quality education without extreme pressure.",
          pros: [
            "Dedicated teachers",
            "Regular seminars",
            "Less pressure than BUET",
            "Historic campus",
          ],
          cons: [
            "Needs curriculum update",
            "Limited research opportunities",
            "Slower adoption of new technologies",
          ],
          wouldRecommend: true,
          helpfulVotes: 18,
        },
      ],
      "International Business": [
        {
          id: 7,
          studentName: "Aminul Haque",
          year: "4th Year",
          rating: 4.3,
          date: "2024-08-05",
          review:
            "The IB program at DU is excellent for understanding global business dynamics. Case study approach helps in practical learning. Faculty includes both academics and industry professionals. The program has strong connections with international organizations. Many graduates work in multinational companies or start their own businesses.",
          pros: [
            "Global perspective",
            "Case study approach",
            "Industry connections",
            "Practical learning",
          ],
          cons: [
            "Limited internship opportunities",
            "Need more tech integration",
            "High competition for top positions",
          ],
          wouldRecommend: true,
          helpfulVotes: 26,
        },
      ],
    },
    3: {
      // NSU
      "Computer Science & Engineering": [
        {
          id: 8,
          studentName: "Rafiq Ahmed",
          year: "Recent Graduate",
          rating: 4.6,
          date: "2024-09-05",
          review:
            "NSU CSE is fantastic! The American liberal arts model gives you flexibility to explore different areas. Modern facilities, excellent faculty (many with PhD from abroad), and strong industry connections. The curriculum is regularly updated. Internship opportunities are abundant. Though expensive, the ROI is worth it considering the job prospects and skills gained.",
          pros: [
            "Modern curriculum",
            "Flexible course selection",
            "Industry partnerships",
            "International faculty",
          ],
          cons: [
            "Expensive tuition",
            "Competitive admission",
            "Limited financial aid",
          ],
          wouldRecommend: true,
          helpfulVotes: 41,
        },
        {
          id: 9,
          studentName: "Nusrat Jahan",
          year: "4th Year",
          rating: 4.4,
          date: "2024-08-12",
          review:
            "NSU provides an excellent learning environment with small class sizes and personalized attention. The focus on practical skills through projects and internships is remarkable. Career services department is very helpful in job placement. The campus culture encourages innovation and entrepreneurship. Many successful startups have emerged from NSU.",
          pros: [
            "Small class sizes",
            "Practical focus",
            "Career support",
            "Innovation culture",
          ],
          cons: ["High fees", "Parking issues", "Limited research funding"],
          wouldRecommend: true,
          helpfulVotes: 35,
        },
      ],
      "Business Administration": [
        {
          id: 10,
          studentName: "Kamrul Hassan",
          year: "Recent Graduate",
          rating: 4.5,
          date: "2024-07-30",
          review:
            "NSU Business program follows international standards with emphasis on practical application. Guest lectures from industry leaders, case competitions, and internships provide real-world exposure. The program helped me develop leadership and analytical skills. Faculty is approachable and supportive. Currently working at a multinational company thanks to the strong alumni network.",
          pros: [
            "International standards",
            "Industry exposure",
            "Strong alumni network",
            "Leadership development",
          ],
          cons: ["Expensive", "Intense course load", "Limited scholarships"],
          wouldRecommend: true,
          helpfulVotes: 28,
        },
      ],
    },
    4: {
      // BRAC University
      "Computer Science & Engineering": [
        {
          id: 11,
          studentName: "Tanvir Rahman",
          year: "4th Year",
          rating: 4.3,
          date: "2024-08-18",
          review:
            "BRACU CSE strikes a perfect balance between academic rigor and practical application. The faculty is a mix of experienced academics and industry professionals. Regular hackathons, coding competitions, and tech talks keep you updated with latest trends. The campus has excellent facilities including modern labs and library. Strong placement support with good industry connections.",
          pros: [
            "Balanced approach",
            "Modern facilities",
            "Industry professionals as faculty",
            "Active tech community",
          ],
          cons: ["Expensive fees", "Limited parking", "Sometimes overcrowded"],
          wouldRecommend: true,
          helpfulVotes: 32,
        },
      ],
      "Business Administration": [
        {
          id: 12,
          studentName: "Sultana Razia",
          year: "Recent Graduate",
          rating: 4.2,
          date: "2024-09-02",
          review:
            "BRACU Business program is well-structured with emphasis on practical learning through case studies and projects. The faculty brings real industry experience to classroom. Regular corporate visits and guest lectures provide industry insights. The career placement office is very active in arranging internships and job opportunities. Good return on investment.",
          pros: [
            "Practical curriculum",
            "Industry insights",
            "Active placement support",
            "Corporate connections",
          ],
          cons: [
            "High tuition fees",
            "Competitive environment",
            "Limited financial aid options",
          ],
          wouldRecommend: true,
          helpfulVotes: 24,
        },
      ],
    },
  };

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.programs.some((program) =>
        program.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => uni.fields.includes(filter));

    return matchesSearch && matchesFilters;
  });

  const handleBookmark = (universityId) => {
    setBookmarkedUniversities((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(universityId)) {
        newBookmarks.delete(universityId);
      } else {
        newBookmarks.add(universityId);
      }
      return newBookmarks;
    });
  };

  const handleFilterToggle = (fieldId) => {
    setSelectedFilters((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const renderUniversityCard = (university) => (
    <Card
      key={university.id}
      className={`${componentStyles.card} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      sx={{ borderRadius: 3, height: "100%" }}
    >
      <CardContent className="p-6">
        {/* Header */}
        <Box className="flex items-start justify-between mb-4">
          <Box className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: university.color,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {university.logo}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                className={`font-bold ${themeClasses.text.primary}`}
              >
                {university.name}
              </Typography>
              <Box className="flex items-center gap-1">
                <LocationOn sx={{ fontSize: 16, color: "gray" }} />
                <Typography
                  variant="body2"
                  className={themeClasses.text.secondary}
                >
                  {university.location}
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={() => handleBookmark(university.id)}
            size="small"
          >
            {bookmarkedUniversities.has(university.id) ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>
        </Box>

        {/* Rankings and Stats */}
        <Box className="grid grid-cols-2 gap-4 mb-4">
          <Box className="text-center">
            <Typography
              variant="h6"
              className={`font-bold ${themeClasses.brand.primary}`}
            >
              #{university.ranking}
            </Typography>
            <Typography
              variant="caption"
              className={themeClasses.text.secondary}
            >
              World Ranking
            </Typography>
          </Box>
          <Box className="text-center">
            <Box className="flex items-center justify-center gap-1">
              <Rating
                value={university.rating}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography variant="body2" className={themeClasses.text.primary}>
                {university.rating}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              className={themeClasses.text.secondary}
            >
              Rating
            </Typography>
          </Box>
        </Box>

        {/* Key Info */}
        <Box className="space-y-2 mb-4">
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Tuition:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.tuition}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Acceptance Rate:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.acceptanceRate}
            </Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body2" className={themeClasses.text.secondary}>
              Students:
            </Typography>
            <Typography
              variant="body2"
              className={`font-semibold ${themeClasses.text.primary}`}
            >
              {university.studentCount}
            </Typography>
          </Box>
        </Box>

        {/* Fields */}
        <Box className="mb-4">
          <Typography
            variant="body2"
            className={`font-medium mb-2 ${themeClasses.text.primary}`}
          >
            Strong Fields:
          </Typography>
          <Box className="flex flex-wrap gap-1">
            {university.fields.map((fieldId) => {
              const field = fields.find((f) => f.id === fieldId);
              return (
                <Chip
                  key={fieldId}
                  label={field?.name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem" }}
                />
              );
            })}
          </Box>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          endIcon={<Launch />}
          className="mt-2"
          onClick={() => setSelectedUniversity(university)}
        >
          View Details & Reviews
        </Button>
      </CardContent>
    </Card>
  );

  // Detailed University View Component
  const renderUniversityDetailView = () => {
    if (!selectedUniversity) return null;

    return (
      <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
        <Container maxWidth="xl" className="py-8">
          {/* Header */}
          <Box className="flex items-center justify-between mb-8">
            <Button
              onClick={() => setSelectedUniversity(null)}
              startIcon={<ArrowBack />}
              className={componentStyles.button.secondary}
            >
              Back to Universities
            </Button>
            <Typography
              variant="h4"
              className={`font-bold ${themeClasses.text.primary}`}
            >
              {selectedUniversity.name}
            </Typography>
            <IconButton
              onClick={() => handleBookmark(selectedUniversity.id)}
              size="large"
            >
              {bookmarkedUniversities.has(selectedUniversity.id) ? (
                <Bookmark color="primary" />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
          </Box>

          {/* University Overview */}
          <Card
            className={`${componentStyles.card} mb-8`}
            sx={{ borderRadius: 3 }}
          >
            <CardContent className="p-8">
              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <Box className="text-center">
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: selectedUniversity.color,
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        margin: "0 auto 1rem",
                      }}
                    >
                      {selectedUniversity.logo}
                    </Avatar>
                    <Typography
                      variant="h5"
                      className={`font-bold ${themeClasses.text.primary} mb-2`}
                    >
                      {selectedUniversity.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`${themeClasses.text.secondary} mb-2`}
                    >
                      {selectedUniversity.banglaName}
                    </Typography>
                    <Box className="flex items-center justify-center gap-1 mb-4">
                      <LocationOn sx={{ fontSize: 20, color: "gray" }} />
                      <Typography
                        variant="body1"
                        className={themeClasses.text.secondary}
                      >
                        {selectedUniversity.location}
                      </Typography>
                    </Box>
                    <Box className="flex items-center justify-center gap-1">
                      <Rating
                        value={selectedUniversity.rating}
                        precision={0.1}
                        size="large"
                        readOnly
                      />
                      <Typography
                        variant="h6"
                        className={`font-bold ${themeClasses.text.primary} ml-2`}
                      >
                        {selectedUniversity.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Grid container spacing={4}>
                    {/* Key Stats */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="text-center">
                        <Typography
                          variant="h4"
                          className={`font-bold ${themeClasses.brand.primary} mb-1`}
                        >
                          #{selectedUniversity.ranking}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          Bangladesh Ranking
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="text-center">
                        <Typography
                          variant="h4"
                          className={`font-bold ${themeClasses.brand.primary} mb-1`}
                        >
                          {selectedUniversity.acceptanceRate}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          Acceptance Rate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="text-center">
                        <Typography
                          variant="h4"
                          className={`font-bold ${themeClasses.brand.primary} mb-1`}
                        >
                          {selectedUniversity.studentCount}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          Students
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="text-center">
                        <Typography
                          variant="h4"
                          className={`font-bold ${themeClasses.brand.primary} mb-1`}
                        >
                          {selectedUniversity.tuition}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          Annual Fees
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Highlights */}
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        className={`font-semibold ${themeClasses.text.primary} mb-3`}
                      >
                        University Highlights
                      </Typography>
                      <Grid container spacing={2}>
                        {selectedUniversity.highlights.map(
                          (highlight, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <Box className="flex items-center">
                                <CheckCircle
                                  sx={{ color: "green", fontSize: 20, mr: 1 }}
                                />
                                <Typography
                                  variant="body2"
                                  className={themeClasses.text.primary}
                                >
                                  {highlight}
                                </Typography>
                              </Box>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Subjects/Departments */}
          <Typography
            variant="h5"
            className={`font-bold ${themeClasses.text.primary} mb-6`}
          >
            Departments & Programs
          </Typography>

          <Grid container spacing={4}>
            {selectedUniversity.subjects?.map((subject, index) => (
              <Grid item xs={12} lg={6} key={index}>
                <Card
                  className={`${componentStyles.card} h-full cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  sx={{ borderRadius: 3 }}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowReviews(true);
                  }}
                >
                  <CardContent className="p-6">
                    <Box className="flex items-start justify-between mb-4">
                      <Box className="flex-1">
                        <Typography
                          variant="h6"
                          className={`font-bold ${themeClasses.text.primary} mb-2`}
                        >
                          {subject.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={`${themeClasses.text.secondary} mb-3`}
                        >
                          {subject.overview}
                        </Typography>
                      </Box>
                      <ArrowForward
                        className={`${themeClasses.text.muted} ml-2`}
                      />
                    </Box>

                    {/* Quick Stats */}
                    <Grid container spacing={2} className="mb-4">
                      <Grid item xs={4}>
                        <Box className="text-center">
                          <Timeline color="primary" sx={{ fontSize: 24 }} />
                          <Typography
                            variant="body2"
                            className={`font-semibold ${themeClasses.text.primary}`}
                          >
                            {subject.duration}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={themeClasses.text.secondary}
                          >
                            Duration
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="text-center">
                          <Group color="primary" sx={{ fontSize: 24 }} />
                          <Typography
                            variant="body2"
                            className={`font-semibold ${themeClasses.text.primary}`}
                          >
                            {subject.seats}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={themeClasses.text.secondary}
                          >
                            Seats
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="text-center">
                          <Reviews color="primary" sx={{ fontSize: 24 }} />
                          <Typography
                            variant="body2"
                            className={`font-semibold ${themeClasses.text.primary}`}
                          >
                            {studentReviews[selectedUniversity.id]?.[
                              subject.name
                            ]?.length || 0}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={themeClasses.text.secondary}
                          >
                            Reviews
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Facilities */}
                    <Box className="mb-4">
                      <Typography
                        variant="body2"
                        className={`font-medium ${themeClasses.text.primary} mb-2`}
                      >
                        Key Facilities:
                      </Typography>
                      <Box className="flex flex-wrap gap-1">
                        {subject.facilities
                          ?.slice(0, 3)
                          .map((facility, fIndex) => (
                            <Chip
                              key={fIndex}
                              label={facility}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          ))}
                      </Box>
                    </Box>

                    {/* Career Prospects */}
                    <Box>
                      <Typography
                        variant="body2"
                        className={`font-medium ${themeClasses.text.primary} mb-2`}
                      >
                        Career Opportunities:
                      </Typography>
                      <Box className="flex flex-wrap gap-1">
                        {subject.careerProspects
                          ?.slice(0, 3)
                          .map((career, cIndex) => (
                            <Chip
                              key={cIndex}
                              label={career}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          ))}
                        {subject.careerProspects?.length > 3 && (
                          <Chip
                            label={`+${
                              subject.careerProspects.length - 3
                            } more`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      className="mt-4"
                      endIcon={<Reviews />}
                    >
                      View Student Reviews
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Admission Requirements */}
          <Card
            className={`${componentStyles.card} mt-8`}
            sx={{ borderRadius: 3 }}
          >
            <CardContent className="p-6">
              <Typography
                variant="h6"
                className={`font-bold ${themeClasses.text.primary} mb-4`}
              >
                Admission Requirements
              </Typography>
              <Grid container spacing={4}>
                {Object.entries(selectedUniversity.requirements).map(
                  ([key, value], index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box>
                        <Typography
                          variant="body2"
                          className={`font-medium ${themeClasses.text.primary} capitalize mb-1`}
                        >
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </Typography>
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Scholarships */}
          <Card
            className={`${componentStyles.card} mt-6`}
            sx={{ borderRadius: 3 }}
          >
            <CardContent className="p-6">
              <Typography
                variant="h6"
                className={`font-bold ${themeClasses.text.primary} mb-4`}
              >
                Available Scholarships
              </Typography>
              <Grid container spacing={2}>
                {selectedUniversity.scholarships.map((scholarship, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box className="flex items-center">
                      <Grade sx={{ color: "gold", fontSize: 20, mr: 1 }} />
                      <Typography
                        variant="body2"
                        className={themeClasses.text.primary}
                      >
                        {scholarship}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  };

  // Student Reviews Component
  const renderStudentReviews = () => {
    if (!selectedSubject || !showReviews) return null;

    const reviews =
      studentReviews[selectedUniversity.id]?.[selectedSubject.name] || [];

    return (
      <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
        <Container maxWidth="xl" className="py-8">
          {/* Header */}
          <Box className="flex items-center justify-between mb-8">
            <Button
              onClick={() => {
                setShowReviews(false);
                setSelectedSubject(null);
              }}
              startIcon={<ArrowBack />}
              className={componentStyles.button.secondary}
            >
              Back to Subjects
            </Button>
            <Box className="text-center">
              <Typography
                variant="h4"
                className={`font-bold ${themeClasses.text.primary}`}
              >
                {selectedSubject.name}
              </Typography>
              <Typography variant="h6" className={themeClasses.text.secondary}>
                {selectedUniversity.name} - Student Reviews
              </Typography>
            </Box>
            <Box /> {/* Spacer */}
          </Box>

          {/* Subject Overview */}
          <Card
            className={`${componentStyles.card} mb-6`}
            sx={{ borderRadius: 3 }}
          >
            <CardContent className="p-6">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h6"
                    className={`font-bold ${themeClasses.text.primary} mb-3`}
                  >
                    Program Overview
                  </Typography>
                  <Typography
                    variant="body1"
                    className={`${themeClasses.text.secondary} mb-4`}
                  >
                    {selectedSubject.overview}
                  </Typography>

                  <Box className="space-y-3">
                    <Box>
                      <Typography
                        variant="body2"
                        className={`font-medium ${themeClasses.text.primary} mb-2`}
                      >
                        Key Facilities:
                      </Typography>
                      <Box className="flex flex-wrap gap-2">
                        {selectedSubject.facilities?.map((facility, index) => (
                          <Chip
                            key={index}
                            label={facility}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        className={`font-medium ${themeClasses.text.primary} mb-2`}
                      >
                        Career Prospects:
                      </Typography>
                      <Box className="flex flex-wrap gap-2">
                        {selectedSubject.careerProspects?.map(
                          (career, index) => (
                            <Chip
                              key={index}
                              label={career}
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          )
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box className="space-y-4">
                    <Box className="text-center">
                      <Typography
                        variant="h4"
                        className={`font-bold ${themeClasses.brand.primary} mb-1`}
                      >
                        {reviews.length}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={themeClasses.text.secondary}
                      >
                        Student Reviews
                      </Typography>
                    </Box>

                    <Box className="text-center">
                      <Rating
                        value={
                          reviews.length > 0
                            ? reviews.reduce((sum, r) => sum + r.rating, 0) /
                              reviews.length
                            : 0
                        }
                        precision={0.1}
                        size="large"
                        readOnly
                      />
                      <Typography
                        variant="h6"
                        className={`font-bold ${themeClasses.text.primary} mt-1`}
                      >
                        {reviews.length > 0
                          ? (
                              reviews.reduce((sum, r) => sum + r.rating, 0) /
                              reviews.length
                            ).toFixed(1)
                          : "N/A"}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={themeClasses.text.secondary}
                      >
                        Average Rating
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="body2"
                        className={`font-medium ${themeClasses.text.primary} mb-2`}
                      >
                        Quick Stats:
                      </Typography>
                      <Box className="space-y-2">
                        <Box className="flex justify-between">
                          <Typography
                            variant="body2"
                            className={themeClasses.text.secondary}
                          >
                            Duration:
                          </Typography>
                          <Typography
                            variant="body2"
                            className={themeClasses.text.primary}
                          >
                            {selectedSubject.duration}
                          </Typography>
                        </Box>
                        <Box className="flex justify-between">
                          <Typography
                            variant="body2"
                            className={themeClasses.text.secondary}
                          >
                            Available Seats:
                          </Typography>
                          <Typography
                            variant="body2"
                            className={themeClasses.text.primary}
                          >
                            {selectedSubject.seats}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Typography
            variant="h5"
            className={`font-bold ${themeClasses.text.primary} mb-6`}
          >
            Student Reviews & Experiences
          </Typography>

          {reviews.length === 0 ? (
            <Card className={`${componentStyles.card} text-center py-12`}>
              <CardContent>
                <Reviews sx={{ fontSize: 64, color: "gray", mb: 2 }} />
                <Typography
                  variant="h6"
                  className={`${themeClasses.text.primary} mb-2`}
                >
                  No Reviews Yet
                </Typography>
                <Typography
                  variant="body1"
                  className={themeClasses.text.secondary}
                >
                  Be the first to share your experience with this program!
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Box className="space-y-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className={componentStyles.card}
                  sx={{ borderRadius: 3 }}
                >
                  <CardContent className="p-6">
                    {/* Review Header */}
                    <Box className="flex items-start justify-between mb-4">
                      <Box className="flex items-center gap-3">
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: selectedUniversity.color,
                            color: "white",
                          }}
                        >
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            className={`font-semibold ${themeClasses.text.primary}`}
                          >
                            {review.studentName}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={themeClasses.text.secondary}
                          >
                            {review.year} •{" "}
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="text-right">
                        <Rating
                          value={review.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          variant="h6"
                          className={`font-bold ${themeClasses.text.primary}`}
                        >
                          {review.rating}/5
                        </Typography>
                      </Box>
                    </Box>

                    {/* Review Content */}
                    <Typography
                      variant="body1"
                      className={`${themeClasses.text.primary} mb-4 leading-relaxed`}
                    >
                      {review.review}
                    </Typography>

                    {/* Pros and Cons */}
                    <Grid container spacing={4} className="mb-4">
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          className={`font-semibold ${themeClasses.text.primary} mb-2 flex items-center`}
                        >
                          <ThumbUp
                            sx={{ fontSize: 16, mr: 1, color: "green" }}
                          />
                          Pros:
                        </Typography>
                        <ul className="space-y-1 ml-4">
                          {review.pros.map((pro, index) => (
                            <li
                              key={index}
                              className={`text-sm ${themeClasses.text.secondary}`}
                            >
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          className={`font-semibold ${themeClasses.text.primary} mb-2 flex items-center`}
                        >
                          <ThumbDown
                            sx={{ fontSize: 16, mr: 1, color: "red" }}
                          />
                          Cons:
                        </Typography>
                        <ul className="space-y-1 ml-4">
                          {review.cons.map((con, index) => (
                            <li
                              key={index}
                              className={`text-sm ${themeClasses.text.secondary}`}
                            >
                              {con}
                            </li>
                          ))}
                        </ul>
                      </Grid>
                    </Grid>

                    {/* Footer */}
                    <Divider className="mb-3" />
                    <Box className="flex items-center justify-between">
                      <Box className="flex items-center gap-4">
                        <Chip
                          label={
                            review.wouldRecommend
                              ? "Recommends this program"
                              : "Doesn't recommend"
                          }
                          color={review.wouldRecommend ? "success" : "error"}
                          variant="outlined"
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          className={themeClasses.text.secondary}
                        >
                          {review.helpfulVotes} people found this helpful
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ThumbUp />}
                      >
                        Helpful
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    );
  };

  // Conditional rendering based on current view
  if (showReviews && selectedSubject) {
    return renderStudentReviews();
  }

  if (selectedUniversity) {
    return renderUniversityDetailView();
  }

  return (
    <Box className={`min-h-screen ${themeClasses.bg.primary}`}>
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/pre-university")}
            startIcon={<ArrowBack />}
            className={componentStyles.button.secondary}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            className={`font-bold ${themeClasses.text.primary}`}
          >
            University Choice Guide
          </Typography>
          <Box /> {/* Spacer */}
        </Box>

        {/* Search and Filters */}
        <Paper
          className={`p-6 mb-8 ${componentStyles.card}`}
          sx={{ borderRadius: 3 }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search universities, programs, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className={themeClasses.text.muted} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="body2"
                  className={`font-medium mb-2 ${themeClasses.text.primary}`}
                >
                  Filter by Field:
                </Typography>
                <Box className="flex flex-wrap gap-1">
                  {fields.slice(0, 4).map((field) => (
                    <Chip
                      key={field.id}
                      label={field.name}
                      clickable
                      variant={
                        selectedFilters.includes(field.id)
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        selectedFilters.includes(field.id)
                          ? "primary"
                          : "default"
                      }
                      onClick={() => handleFilterToggle(field.id)}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Box className="mb-6">
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Universities Grid */}
        {selectedTab === 0 && (
          <Box>
            <Box className="flex items-center justify-between mb-6">
              <Typography
                variant="h5"
                className={`font-semibold ${themeClasses.text.primary}`}
              >
                All Universities ({filteredUniversities.length})
              </Typography>
              {selectedFilters.length > 0 && (
                <Button
                  onClick={() => setSelectedFilters([])}
                  size="small"
                  variant="outlined"
                >
                  Clear Filters
                </Button>
              )}
            </Box>

            <Grid container spacing={4}>
              {filteredUniversities.map((university) => (
                <Grid item xs={12} md={6} lg={4} key={university.id}>
                  {renderUniversityCard(university)}
                </Grid>
              ))}
            </Grid>

            {filteredUniversities.length === 0 && (
              <Paper className={`p-8 text-center ${componentStyles.card}`}>
                <Typography
                  variant="h6"
                  className={`mb-4 ${themeClasses.text.primary}`}
                >
                  No universities found
                </Typography>
                <Typography
                  variant="body1"
                  className={themeClasses.text.secondary}
                >
                  Try adjusting your search terms or filters.
                </Typography>
              </Paper>
            )}
          </Box>
        )}

        {/* Top Ranked Tab */}
        {selectedTab === 1 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Top Ranked Universities
            </Typography>
            <Grid container spacing={4}>
              {universities
                .sort((a, b) => a.ranking - b.ranking)
                .slice(0, 6)
                .map((university) => (
                  <Grid item xs={12} md={6} lg={4} key={university.id}>
                    {renderUniversityCard(university)}
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {/* By Field Tab */}
        {selectedTab === 2 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Universities by Field
            </Typography>
            <Grid container spacing={3}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={field.id}>
                  <Card
                    className={`cursor-pointer ${componentStyles.card} hover:shadow-lg transition-all duration-300`}
                    onClick={() => {
                      setSelectedFilters([field.id]);
                      setSelectedTab(0);
                    }}
                    sx={{ borderRadius: 3 }}
                  >
                    <CardContent className="text-center p-4">
                      <Typography variant="h3" className="mb-2">
                        {field.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        className={`font-semibold ${themeClasses.text.primary}`}
                      >
                        {field.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={themeClasses.text.secondary}
                      >
                        {
                          universities.filter((uni) =>
                            uni.fields.includes(field.id)
                          ).length
                        }{" "}
                        universities
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Requirements Tab */}
        {selectedTab === 3 && (
          <Box>
            <Typography
              variant="h5"
              className={`font-semibold mb-6 ${themeClasses.text.primary}`}
            >
              Admission Requirements
            </Typography>
            <Grid container spacing={4}>
              {universities.slice(0, 3).map((university) => (
                <Grid item xs={12} md={6} lg={4} key={university.id}>
                  <Card
                    className={componentStyles.card}
                    sx={{ borderRadius: 3 }}
                  >
                    <CardContent className="p-6">
                      <Box className="flex items-center gap-3 mb-4">
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: university.color,
                            color: "white",
                          }}
                        >
                          {university.logo}
                        </Avatar>
                        <Typography
                          variant="h6"
                          className={`font-bold ${themeClasses.text.primary}`}
                        >
                          {university.name}
                        </Typography>
                      </Box>

                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="GPA Requirement"
                            secondary={university.requirements.gpa}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <School color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="SAT Score"
                            secondary={university.requirements.sat}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Language color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="TOEFL/IELTS"
                            secondary={university.requirements.toefl}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Action Buttons */}
        <Box className="text-center mt-12">
          <Button
            onClick={() => navigate("/pre-university/career-choice")}
            variant="outlined"
            size="large"
            className="mr-4"
          >
            Explore Careers
          </Button>
          <Button
            onClick={() => navigate("/pre-university")}
            variant="contained"
            size="large"
            className={componentStyles.button.primary}
          >
            Back to Overview
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UniversityChoice;
