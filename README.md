# 🚀 CareerVision

> **AI-Powered Career Guidance & Job Portal Platform**

CareerVision bridges the gap between career seekers across all sectors with personalized guidance, AI-powered tools, and comprehensive job portal features.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://www.python.org/)

## 📋 Table of Contents

- [🌟 Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [⚡ Quick Start](#-quick-start)
- [� Core APIs](#-core-apis)
- [🔌 Microservices](#-microservices)
- [� Environment Setup](#-environment-setup)

## 🌟 Key Features

### � Core Capabilities
- **AI Career Guidance**: Personalized recommendations using Google Gemini AI
- **Smart Job Matching**: AI-powered resume-job compatibility analysis
- **Interview System**: Mock interviews with video calls and emotion detection
- **Real-time Chat**: Career guidance chatbot with intelligent responses
- **Job Portal**: Comprehensive job search with external API integration

### 🤖 AI-Powered Tools
- **Resume Matcher**: Intelligent CV-job description analysis
- **Emotion Detection**: Real-time emotion analysis during interviews
- **Career Chatbot**: 24/7 career guidance and suggestions
- **Roadmap Generator**: Personalized career path planning

### 👥 Multi-User Platform
- **Students**: Career guidance, job applications, interview preparation
- **Recruiters**: Job posting, candidate evaluation, application management
- **Professionals**: Career advancement, networking, skill assessment

## 🛠️ Technology Stack

**Frontend**: React 19.1.0, Material-UI, Tailwind CSS, Redux Toolkit  
**Backend**: Spring Boot 3.5.3, Java 17, PostgreSQL, JWT Authentication  
**Microservices**: Python Flask/FastAPI, spaCy NLP, DeepFace, TensorFlow  
**AI Integration**: Google Gemini, Groq API, YouTube API  
**External APIs**: Adzuna Jobs, Mapbox, Google OAuth 2.0  
**Storage**: Supabase (Database & File Storage)

## ⚡ Quick Start

### Prerequisites
- Java 17+, Node.js 16+, Python 3.8+, PostgreSQL

### 1. Clone & Setup Environment
```bash
git clone https://github.com/ishmaamik/CareerVision.git
cd CareerVision

# Copy and configure environment files
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### 2. Start Services
```bash
# Backend (Terminal 1)
cd server && ./mvnw spring-boot:run

# Frontend (Terminal 2)
cd client && npm install && npm run dev

# Microservices (Terminals 3-5)
cd resume-matcher && pip install -r requirements.txt && python main.py
cd emotion-detector && pip install -r requirements.txt && python app.py
cd suitable-matcher && pip install -r requirements.txt && python app.py
```

### 3. Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **Microservices**: Ports 5000-5005

### Required API Keys

| Service       | Variable                          | Purpose             |
| ------------- | --------------------------------- | ------------------- |
| Google Gemini | `VITE_GEMINI_API_KEY`             | AI career analysis  |
| Groq          | `VITE_GROQ_API_KEY`               | Language processing |
| Google OAuth  | `VITE_GOOGLE_CLIENT_ID`           | Authentication      |
| Supabase      | `SUPABASE_ANON_KEY`               | Database & storage  |
| Adzuna        | `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` | Job listings        |


## � Core APIs

### 🔐 Authentication & Users
```http
POST /api/auth/google              # Google OAuth login
POST /api/users                    # User registration
GET  /api/users/{id}               # Get user profile
```

### 💼 Jobs & Applications
```http
GET  /api/jobs/all                 # List all jobs
POST /api/jobs/create              # Create job posting
POST /api/applications/apply       # Apply for job
GET  /api/applications/user/{id}   # User's applications
```

### 🤖 AI Services
```http
POST /api/chatbot/career           # Career guidance chat
POST /api/roadmap/generate         # Generate career roadmap
POST /api/resume/analyze           # Analyze resume
```

### 🏢 Company & Career
```http
GET  /api/companies/getAllCompanies # List companies
POST /api/careers                  # Create career path
GET  /api/questions/company/{id}   # Interview questions
```

## 🔌 Microservices

### 🎯 Resume Matcher Service

**Purpose**: Intelligent resume-job matching using NLP

- **Technology**: Flask + spaCy + scikit-learn
- **Port**: 5000
- **Features**:
  - Skill extraction and matching
  - Keyword relevance analysis
  - Experience level comparison
  - Compatibility scoring

### 😊 Emotion Detection Service

**Purpose**: Real-time emotion analysis for interviews

- **Technology**: Flask + DeepFace + TensorFlow
- **Port**: 5001
- **Features**:
  - Facial emotion recognition
  - Confidence scoring
  - Analysis history tracking
  - Real-time processing

### 🎯 Suitable Matcher Service

**Purpose**: Find top candidate matches for job postings

- **Technology**: FastAPI
- **Port**: 5002
- **Features**:
  - Candidate ranking algorithms
  - Skills compatibility analysis
  - Experience weighting
  - Top-K candidate selection

## 👥 User Roles

### 🔓 Anonymous User

- Browse general career resources
- View public blog posts and articles
- Access basic career information
- **Limitations**: Cannot apply for jobs or access personalized features

### 👤 Registered User (Students/Job Seekers)

- **Career Guidance**: Receive personalized recommendations
- **Job Applications**: Apply for positions and track progress
- **Interview Preparation**: Access mock interviews and question banks
- **CV Analysis**: Get AI-powered resume feedback
- **Networking**: Participate in events and community discussions

### 🏢 Recruiter

- **Job Management**: Post and manage job openings
- **Candidate Search**: Use AI-powered candidate matching
- **Application Review**: Evaluate applicants and manage pipeline
- **Event Hosting**: Organize career events and webinars

### ⭐ Admin

- **User Management**: Manage user accounts and permissions
- **Content Moderation**: Review and approve user-generated content
- **Platform Analytics**: Monitor system usage and performance
- **System Configuration**: Manage platform settings and features

## 🎯 Use Cases

### 🎓 Pre-University Students

1. **Career Discovery**: Take assessments to identify suitable career paths
2. **Academic Planning**: Get recommendations for university subjects
3. **Roadmap Creation**: Generate personalized learning roadmaps
4. **Market Research**: Understand job market trends and requirements

### 🎯 University Students

1. **Specialization Guidance**: Explore career domains within their field
2. **Interview Preparation**: Practice with mock interviews and question banks
3. **Job Search**: Find relevant internships and entry-level positions
4. **Skill Development**: Identify and bridge skill gaps

### 💼 Professionals

1. **Career Advancement**: Discover growth opportunities
2. **Skill Assessment**: Evaluate current competencies
3. **Network Building**: Connect with industry peers
4. **Job Transition**: Find new opportunities and assess fit

### 🏢 Recruiters

1. **Talent Acquisition**: Find qualified candidates efficiently
2. **Skills Matching**: Use AI to match resumes with job requirements
3. **Pipeline Management**: Track candidates through hiring process
4. **Employer Branding**: Host events and showcase company culture

## 🛡️ Security

### Authentication & Authorization

- **OAuth 2.0** integration with Google
- **JWT tokens** for session management
- **Role-based access control** (RBAC)
- **API rate limiting** and throttling

### Data Protection

- **Environment variables** for sensitive configuration
- **Input validation** and sanitization
- **CORS policies** for cross-origin requests
- **File upload restrictions** and validation

### API Security

- **HTTPS enforcement** in production
- **Request/response logging** for audit trails
- **Error handling** without information leakage
- **Database connection encryption**

## 🧪 Testing

### Backend Testing

```bash
cd server
./mvnw test
```

### Frontend Testing

```bash
cd client
npm test
```

### Microservice Testing

```bash
# Test Resume Matcher
cd resume-matcher
python test_match_endpoint.py

# Test Emotion Detector
cd emotion-detector
python -m pytest tests/

# Test Suitable Matcher
cd suitable-matcher
python -m pytest tests/
```

### API Testing

Use the provided Postman collection or test scripts:

```bash
# Install testing dependencies
npm install -g newman

# Run API tests
newman run CareerVision_API_Tests.postman_collection.json
```

## 🐳 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual services
docker build -t careervision-frontend ./client
docker build -t careervision-backend ./server
docker build -t careervision-resume-matcher ./resume-matcher
```

### Production Deployment

1. **Frontend**: Deploy to Vercel, Netlify, or AWS S3
2. **Backend**: Deploy to AWS EC2, Heroku, or Google Cloud
3. **Database**: Use Supabase, AWS RDS, or managed PostgreSQL
4. **Microservices**: Deploy to Docker containers or serverless functions

### Environment Variables for Production

```bash
# Update production environment files
NODE_ENV=production
SPRING_PROFILES_ACTIVE=production

# Configure production database URLs
DATABASE_URL=your_production_database_url
REDIS_URL=your_redis_url
```

## 🤝 Contributing

We welcome contributions to CareerVision! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- **Java**: Follow Google Java Style Guide
- **React**: Use ESLint and Prettier configurations
- **Python**: Follow PEP 8 style guidelines
- **Commit Messages**: Use conventional commit format

### Pull Request Process

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the README if needed
5. Request review from maintainers

## 📞 Support

### Documentation

- **API Docs**: Available at `/swagger-ui` when running locally
- **Setup Guide**: See [ENV_SETUP.md](ENV_SETUP.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/ishmaamik/CareerVision/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ishmaamik/CareerVision/discussions)
- **Email**: support@careervision.com

### Reporting Bugs

When reporting bugs, please include:

- Operating system and version
- Node.js and Java versions
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** team for the excellent framework
- **React** team for the powerful frontend library
- **spaCy** team for natural language processing capabilities
- **DeepFace** team for emotion detection technology
- **Material-UI** team for beautiful React components
- **Open Source Community** for all the amazing libraries and tools

---
