# CareerVision API Documentation 📋

A comprehensive REST API for the CareerVision career platform built with Spring Boot. This API provides endpoints for user management, job postings, applications, company profiles, career guidance, and more.

## 🚀 Base URL

```
http://localhost:8080/api
```

## 🔐 Authentication

Most endpoints use basic authentication or Google OAuth integration. User roles include:

- `user` - Regular job seekers
- `recruiter` - Company recruiters
- `admin` - System administrators

---

## 📚 API Endpoints

### 👤 User Management

#### `POST /users/signup`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

#### `POST /users/login`

Login with email and password.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### `GET /users/role/{role}`

Get users by role (user, recruiter, admin).

---

### 🔑 Google Authentication

#### `POST /google-auth/login`

Login using Google OAuth token.

**Request Body:**

```json
"eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkYzBiOTk..."
```

---

### 💼 Job Management

#### `POST /jobs/create`

Create a new job posting.

**Request Body:**

```json
{
  "title": "Senior Software Engineer",
  "description": "We are looking for an experienced software engineer...",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "salary": "$120,000 - $150,000",
  "requirements": "5+ years experience in Java, Spring Boot",
  "postedBy": "recruiter@techcorp.com"
}
```

#### `GET /jobs/all`

Get all job postings.

#### `GET /jobs/{id}`

Get job by ID.

#### `GET /jobs/external?keyword={keyword}&location={location}`

Search external job listings from Adzuna API.

---

### 📝 Job Applications

#### `POST /applications/apply`

Apply to a job.

**Request Body:**

```json
{
  "userId": 1,
  "jobId": 5
}
```

#### `GET /applications/user/{userId}`

Get all applications by user.

#### `GET /applications/job/{jobId}`

Get all applications for a job.

#### `GET /applications/filtered`

Get filtered applications with query parameters:

- `jobId` - Job ID (required)
- `filterType` - all/qualified/location (default: all)
- `locationThreshold` - Distance threshold in km (default: 10)
- `percentageThreshold` - Match percentage threshold (default: 80)
- `search` - Search term
- `sortBy` - percentage/name/date (default: percentage)
- `limit` - Result limit

#### `PUT /applications/{applicationId}/status?status={status}`

Update application status.

#### `POST /applications/{applicationId}/match-percentage?percentage={percentage}`

Update match percentage.

---

### 💾 Saved Jobs

#### `POST /saved-jobs/save?userId={userId}&jobId={jobId}`

Save a job for later.

#### `GET /saved-jobs/user/{userId}`

Get saved jobs for user.

#### `DELETE /saved-jobs/remove?userId={userId}&jobId={jobId}`

Remove saved job.

---

### 🏢 Company Management

#### `POST /companies/create`

Create a new company profile.

**Request Body:**

```json
{
  "name": "Tech Innovations Inc.",
  "description": "Leading technology company...",
  "industry": "Technology",
  "website": "https://techinnovations.com",
  "size": "100-500 employees"
}
```

#### `GET /companies/getCompany/{name}`

Get company by name.

#### `GET /companies/getAllCompanies`

Get all companies.

---

### 📍 Location Services

#### `POST /location/user/{userId}`

Update user location.

**Request Body:**

```json
{
  "location": "New York, NY",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

#### `POST /location/company/{companyId}`

Update company location.

**Request Body:**

```json
{
  "location": "San Francisco, CA",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

---

### 🎯 Career Guidance

#### `POST /careers`

Create a career profile.

**Request Body:**

```json
{
  "title": "Software Engineer",
  "description": "Design and develop software applications...",
  "averageSalary": "$95,000",
  "requiredSkills": ["Java", "Spring Boot", "React"],
  "interestTags": ["technology", "programming", "software"],
  "growthRate": "22%",
  "workEnvironment": "Office/Remote"
}
```

#### `GET /careers`

Get all career profiles.

#### `GET /careers/{id}`

Get career profile by ID.

#### `PUT /careers/{id}`

Update career profile.

#### `DELETE /careers/{id}`

Delete career profile.

---

### 🤖 Career Chatbot

#### `POST /chatbot/career`

Get AI-powered career suggestions.

**Request Body:**

```json
{
  "userMessage": "I'm interested in technology and programming"
}
```

---

### 📰 Blog Management

#### `POST /blogs/blog`

Create a new blog post.

**Request Body:**

```json
{
  "title": "Top 10 Programming Languages in 2025",
  "content": "In this comprehensive guide, we'll explore...",
  "author": "Jane Smith",
  "tags": ["programming", "technology", "career"],
  "summary": "A detailed look at the most in-demand programming languages"
}
```

#### `GET /blogs/all`

Get all blog posts.

#### `GET /blogs/{id}`

Get blog post by ID.

---

### 🌐 Social Features

#### `POST /posts`

Create a social media post.

**Request Body (multipart/form-data):**

```json
{
  "content": "Just landed my dream job! Excited to start this new journey.",
  "postedBy": {
    "id": 1,
    "name": "John Doe"
  },
  "postType": "text"
}
```

#### `GET /posts/user/{userId}`

Get posts by user.

---

### 📄 Resume Management

#### `POST /resume/upload`

Upload resume PDF (multipart/form-data).

#### `GET /resume/user/{userId}`

Get resume URL for user.

#### `GET /resume/extract/{userId}`

Extract text from uploaded resume.

#### `DELETE /resume/delete/{userId}`

Delete user's resume.

#### `PUT /resume/update`

Update resume (multipart/form-data).

---

### 🖼️ Profile Picture Management

#### `POST /profile-picture/upload`

Upload profile picture (multipart/form-data).

#### `GET /profile-picture/user/{userId}`

Get profile picture URL.

#### `DELETE /profile-picture/delete/{userId}`

Delete profile picture.

---

### ❓ Interview Questions

#### `POST /questions/upload`

Upload interview question.

**Request Body:**

```json
{
  "question": "What is the difference between Abstract class and Interface?",
  "company": "Google",
  "role": "Software Engineer",
  "category": "Java",
  "difficulty": "Medium",
  "answer": "Abstract classes can have concrete methods..."
}
```

#### `GET /questions/all`

Get all interview questions.

#### `GET /questions/company/{company}`

Get questions by company.

#### `GET /questions/role/{role}`

Get questions by role.

#### `GET /questions/category/{category}`

Get questions by category.

---

### 🎭 Emotion Detection

#### `POST /emotion/analyze`

Analyze emotion from text.

**Request Body:**

```json
{
  "text": "I'm feeling excited about this new opportunity!"
}
```

---

### 🎉 Events Management

#### `POST /events/create`

Create a new event.

**Request Body:**

```json
{
  "title": "Tech Career Fair 2025",
  "description": "Annual career fair featuring top tech companies",
  "eventDate": "2025-09-15T10:00:00",
  "location": "Convention Center, San Francisco",
  "organizer": "Career Services"
}
```

#### `GET /events/all`

Get all events.

#### `POST /events/register?userId={userId}&eventId={eventId}`

Register user for event.

#### `GET /events/{eventId}/participants`

Get event participants.

---

## 📊 Response Formats

### Success Response

```json
{
  "status": "success",
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "details": "Additional error details"
}
```

---

## 🔧 Configuration

### CORS Configuration

The API is configured with CORS enabled for:

- Frontend: `http://localhost:5173` (React)
- All origins: `*` (for development)

### File Upload Limits

- Resume files: PDF only, max 10MB
- Profile pictures: Images only, max 5MB
- Post images: Images only, max 5MB

---

## 🗄️ Database Models

### User

- id, name, email, password, role, location, lat, lon
- profilePictureUrl, resumeUrl, createdAt

### Job

- id, title, description, company, location, salary
- requirements, postedBy, createdAt

### JobApplication

- id, user, job, appliedAt, status, matchPercentage
- coverLetter, resumeUrl

### Company

- id, name, description, industry, website
- size, location, lat, lon

### CareerProfile

- id, title, description, averageSalary
- requiredSkills, interestTags, growthRate

---

## 🚀 Getting Started

1. **Start the Spring Boot server:**

   ```bash
   cd server
   ./mvnw spring-boot:run
   ```

2. **Access the API:**

   ```
   http://localhost:8080/api
   ```

3. **Test endpoints using:**
   - Postman
   - cURL
   - Frontend React application

---

## 🧪 Testing Examples

### Create User

```bash
curl -X POST http://localhost:8080/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"user"}'
```

### Get All Jobs

```bash
curl -X GET http://localhost:8080/api/jobs/all
```

### Apply to Job

```bash
curl -X POST http://localhost:8080/api/applications/apply \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"jobId":5}'
```

---

## 🔍 Integration Services

### External APIs

- **Adzuna API**: External job search
- **Google OAuth**: Authentication
- **Supabase**: File storage
- **Gemini AI**: Career analysis

### Python Microservices

- **Resume Matcher**: `http://localhost:5000` - AI resume matching
- **Emotion Detector**: `http://localhost:5001` - Emotion analysis
- **Suitable Matcher**: `http://localhost:5002` - Suitability analysis

---

## 🛡️ Security Features

- Password encryption with BCrypt
- Input validation and sanitization
- File type validation for uploads
- CORS protection
- SQL injection prevention

---

## 📈 Performance Considerations

- Database query optimization
- File upload size limits
- Response caching where appropriate
- Pagination for large datasets

---

## 🤝 Contributing

1. Follow REST API best practices
2. Add proper error handling
3. Include request/response validation
4. Document new endpoints
5. Test thoroughly before deployment

---

**Happy Coding! 🚀**
