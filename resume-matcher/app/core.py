import spacy
import string
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .config import settings
from typing import List
from .schema_models import JobRequirements, CVData, MatchResponse

nlp = spacy.load(settings.SPACY_MODEL)

class ResumeMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),
            max_features=500
        )

    def preprocess_text(self, text: str) -> str:
        """Clean and normalize text"""
        text = text.lower()
        text = ''.join([char for char in text if char not in string.punctuation])
        return ' '.join(text.split())

    def extract_keywords(self, text: str) -> List[str]:
        """Extract important keywords using spaCy"""
        doc = nlp(text)
        return [
            token.lemma_ for token in doc
            if not token.is_stop and token.is_alpha
        ]

    def calculate_match(self, job: JobRequirements, cv: CVData) -> MatchResponse:
        """Core matching algorithm"""
        # 1. Skill Matching
        job_skills = set(skill.lower() for skill in job.skills)
        cv_skills = set(skill.lower() for skill in (cv.skills or []))
        
        matched_skills = list(job_skills & cv_skills)
        missing_skills = list(job_skills - cv_skills)
        skill_score = len(matched_skills) / len(job_skills) if job_skills else 0

        # 2. Keyword Matching
        job_text = self.preprocess_text(
            f"{job.title} {job.description} {job.responsibilities} {job.qualifications}"
        )
        cv_text = self.preprocess_text(cv.extracted_text)
        
        # Train on job text, transform CV
        job_vector = self.vectorizer.fit_transform([job_text])
        cv_vector = self.vectorizer.transform([cv_text])
        keyword_score = cosine_similarity(job_vector, cv_vector)[0][0]

        # 3. Experience Matching (if available)
        exp_score = 1.0 if (
            job.experience_years and 
            cv.experience_years and 
            cv.experience_years >= job.experience_years
        ) else 0

        # Calculate weighted score
        total_score = (
            (skill_score * settings.SKILL_MATCH_WEIGHT) +
            (keyword_score * settings.KEYWORD_MATCH_WEIGHT) +
            (exp_score * settings.EXPERIENCE_MATCH_WEIGHT)
        ) * 100  # Convert to percentage

        return MatchResponse(
            match_percentage=round(total_score, 2),
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            keyword_matches=self.extract_keywords(cv_text)[:10],
            analysis={
                "skill_score": skill_score,
                "keyword_score": keyword_score,
                "exp_score": exp_score,
                "weights": {
                    "skills": settings.SKILL_MATCH_WEIGHT,
                    "keywords": settings.KEYWORD_MATCH_WEIGHT,
                    "experience": settings.EXPERIENCE_MATCH_WEIGHT
                }
            }
        )