import requests
import json

# Endpoint URL
url = 'http://localhost:5000/api/v1/match'

# Sample payload
payload = {
    "job": {
        "title": "Software Engineer",
        "description": "Seeking a skilled software engineer with experience in Python and web development",
        "company": "Tech Innovations Inc.",
        "location": "San Francisco, CA",
        "responsibilities": "Develop and maintain web applications using modern technologies",
        "skills": ["Python", "JavaScript", "React", "Django", "REST API"],
        "qualifications": "Bachelor's degree in Computer Science or related field",
        "experience_years": 3
    },
    "resume": {
        "extracted_text": "Experienced software developer with a strong background in Python programming. Developed multiple web applications using Django and React. Proficient in creating REST APIs and working with JavaScript.",
        "skills": ["Python", "Django", "JavaScript", "SQL"],
        "experience_years": 2
    }
}

# Send POST request
response = requests.post(url, json=payload)

# Print response
print("Status Code:", response.status_code)
print("Response:")
print(json.dumps(response.json(), indent=2)) 