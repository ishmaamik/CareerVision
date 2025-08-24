# Resume Matcher API 🎯

A powerful AI-driven resume matching service that analyzes resumes against job requirements and provides detailed compatibility scores. Built with Flask and spaCy for natural language processing.

## 🚀 Features

- **Intelligent Resume Matching**: Uses advanced NLP to match resumes with job requirements
- **Skill Analysis**: Identifies and compares technical skills between job requirements and resumes
- **Keyword Matching**: Analyzes relevant keywords and context
- **Experience Evaluation**: Considers years of experience in matching
- **Detailed Analytics**: Provides comprehensive analysis of match results
- **REST API**: Easy integration with web applications
- **CORS Support**: Ready for frontend integration

## 🛠️ Technology Stack

- **Framework**: Flask (Python web framework)
- **NLP**: spaCy with English language model
- **ML**: scikit-learn for matching algorithms
- **Validation**: Pydantic for data validation
- **CORS**: Flask-CORS for cross-origin requests

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## 🚀 Quick Start

### 1. Installation

```bash
# Navigate to the resume-matcher directory
cd resume-matcher

# Install dependencies
pip install -r requirements.txt

# Download spaCy English model
python -m spacy download en_core_web_sm
```

### 2. Run the Application

```bash
python main.py
```

The server will start on `http://localhost:5000`

### 3. Verify Installation

Visit `http://localhost:5000/api/v1/` in your browser to see the API information.

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api/v1/
```

### Endpoints

#### `GET /`

Returns service information and available endpoints.

**Response:**

```json
{
  "service": "Resume Matcher",
  "version": "1.0",
  "available_endpoints": [
    "/health - Health check endpoint",
    "/match - Resume matching endpoint (POST)"
  ]
}
```

#### `GET /health`

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "service": "Resume Matcher API",
  "model": "en_core_web_sm"
}
```

#### `POST /match`

Main resume matching endpoint.

**Request Body:**

```json
{
  "job": {
    "title": "Software Engineer",
    "description": "Seeking a skilled software engineer...",
    "company": "Tech Innovations Inc.",
    "location": "San Francisco, CA",
    "responsibilities": "Develop and maintain web applications...",
    "skills": ["Python", "JavaScript", "React", "Django"],
    "qualifications": "Bachelor's degree in Computer Science",
    "experience_years": 3
  },
  "resume": {
    "extracted_text": "Experienced software developer with Python...",
    "skills": ["Python", "Django", "JavaScript"],
    "experience_years": 2
  }
}
```

**Response:**

```json
{
  "match_percentage": 85.5,
  "matched_skills": ["Python", "JavaScript", "Django"],
  "missing_skills": ["React"],
  "keyword_matches": ["software", "developer", "web applications"],
  "analysis": {
    "skill_match_score": 0.75,
    "keyword_match_score": 0.9,
    "experience_match_score": 0.67,
    "overall_compatibility": "High"
  }
}
```

## 📊 Data Models

### JobRequirements

- `title` (str): Job title (1-200 chars)
- `description` (str): Job description (10-2000 chars)
- `company` (str): Company name (1-200 chars)
- `location` (str): Job location (1-200 chars)
- `responsibilities` (str, optional): Job responsibilities (max 2000 chars)
- `skills` (List[str]): Required skills
- `qualifications` (str, optional): Job qualifications (max 1000 chars)
- `experience_years` (int, optional): Required years of experience (0-50)

### CVData

- `extracted_text` (str): Resume text content (10-10000 chars)
- `skills` (List[str], optional): Skills from resume
- `experience_years` (int, optional): Years of experience (0-50)

### MatchResponse

- `match_percentage` (float): Overall match percentage (0-100)
- `matched_skills` (List[str]): Skills that matched
- `missing_skills` (List[str]): Skills missing from resume
- `keyword_matches` (List[str]): Relevant keyword matches
- `analysis` (dict): Detailed analysis breakdown

## 🧪 Testing

Run the test script to verify the API is working:

```bash
python test_match_endpoint.py
```

This will send a sample resume and job posting to the API and display the matching results.

## ⚙️ Configuration

The application can be configured via `app/config.py`:

```python
class Settings(BaseSettings):
    # Service Configuration
    APP_NAME: str = "Resume Matcher API"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # Matching Algorithm Weights
    SKILL_MATCH_WEIGHT: float = 0.4
    KEYWORD_MATCH_WEIGHT: float = 0.3
    EXPERIENCE_MATCH_WEIGHT: float = 0.3
    MIN_MATCH_PERCENTAGE: float = 0.7

    # NLP Configuration
    SPACY_MODEL: str = "en_core_web_sm"
    MAX_INPUT_LENGTH: int = 10000

    # CORS Configuration
    CORS_ENABLED: bool = True
    CORS_ORIGINS: list = [
        "http://localhost:8080",  # Spring Boot
        "http://localhost:5173"   # React
    ]
```

## 🔍 Algorithm Details

The matching algorithm considers three main factors:

1. **Skill Matching (40% weight)**

   - Exact skill matches
   - Skill variations and synonyms
   - Technical skill prioritization

2. **Keyword Matching (30% weight)**

   - Contextual keyword analysis
   - Job description relevance
   - Industry-specific terminology

3. **Experience Matching (30% weight)**
   - Years of experience comparison
   - Experience relevance scoring
   - Career progression analysis

## 📁 Project Structure

```
resume-matcher/
├── app/
│   ├── __init__.py
│   ├── api.py              # API endpoints
│   ├── config.py           # Configuration settings
│   ├── core.py             # Core matching logic
│   ├── schema_models.py    # Data models
│   └── skill_variants.py   # Skill synonyms and variations
├── main.py                 # Application entry point
├── requirements.txt        # Python dependencies
├── test_match_endpoint.py  # API test script
└── README.md              # This file
```

## 🚀 Integration with CareerVision

This resume matcher is designed to integrate with the CareerVision application:

- **Frontend**: React app communicates with this API
- **Backend**: Spring Boot server can proxy requests
- **CORS**: Pre-configured for local development

### Frontend Integration Example

```javascript
// React component example
const matchResume = async (jobData, resumeData) => {
  const response = await fetch("http://localhost:5000/api/v1/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job: jobData,
      resume: resumeData,
    }),
  });

  return await response.json();
};
```

## 🐛 Troubleshooting

### Common Issues

1. **spaCy model not found**

   ```bash
   python -m spacy download en_core_web_sm
   ```

2. **Port already in use**

   - Change port in `main.py` or kill existing process

3. **CORS errors**

   - Check `CORS_ORIGINS` in `config.py`
   - Add your frontend URL to allowed origins

4. **Memory issues with large texts**
   - Adjust `MAX_INPUT_LENGTH` in config
   - Optimize text preprocessing

## 🔒 Security Considerations

- Input validation with Pydantic models
- Text length limits to prevent DoS
- No file uploads (text-only processing)
- CORS restrictions for production

## 📈 Performance

- Optimized for typical resume/job posting sizes
- Efficient NLP processing with spaCy
- Caching for skill variants lookup
- Memory-efficient text processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## 📄 License

This project is part of the CareerVision application suite.

## 🆘 Support

For issues and questions:

- Check the troubleshooting section
- Review API documentation
- Test with the provided sample script

---

**Happy Matching! 🎯**
