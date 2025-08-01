import spacy
import logging
from typing import List, Dict, Any
from .schema_models import JobRequirements, CVData, MatchResponse

# Configure logging
logger = logging.getLogger(__name__)

class ResumeMatcher:
    def __init__(self):
        # Load spaCy model
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.error("SpaCy model 'en_core_web_sm' not found. Please download it using 'python -m spacy download en_core_web_sm'")
            raise

    def _preprocess_text(self, text: str) -> spacy.tokens.Doc:
        """
        Preprocess text using spaCy for NLP analysis
        """
        try:
            return self.nlp(text.lower())
        except Exception as e:
            logger.error(f"Error preprocessing text: {e}")
            return self.nlp("")

    def _extract_skills(self, doc: spacy.tokens.Doc, job_skills: List[str]) -> List[str]:
        """
        Extract skills from the document using NER, custom logic, and job skills
        """
        skills = []
        
        # Normalize job skills for comparison
        job_skills_norm = [skill.lower() for skill in job_skills]
        
        # Extract skills based on job skills
        for skill in job_skills_norm:
            # Check if skill is in the document
            if skill in doc.text.lower():
                skills.append(skill)
        
        # Additional skill extraction from document
        for token in doc:
            # Check if token is a potential skill
            if (token.pos_ in ['NOUN', 'PROPN'] and len(token.text) > 2 and 
                token.text.lower() not in skills):
                skills.append(token.text.lower())
        
        # Remove duplicates and clean
        return list(set(skills))

    def calculate_match(self, job: JobRequirements, cv: CVData) -> MatchResponse:
        """
        Calculate comprehensive resume match percentage
        """
        try:
            # Preprocess texts
            job_doc = self._preprocess_text(f"{job.title} {job.description} {job.responsibilities}")
            cv_doc = self._preprocess_text(cv.extracted_text)

            # Extract skills
            job_skills = set(skill.lower() for skill in job.skills)
            cv_skills = set(self._extract_skills(cv_doc, list(job.skills)))
            
            # Calculate skill match
            matched_skills = list(job_skills.intersection(cv_skills))
            missing_skills = list(job_skills - cv_skills)
            
            # Skill match percentage
            skill_match_percentage = (len(matched_skills) / len(job_skills) * 100) if job_skills else 0

            # Keyword matching
            keyword_matches = [
                token.text for token in cv_doc 
                if token.text.lower() in job_doc.text.lower()
            ]
            keyword_match_percentage = (len(keyword_matches) / len(job_doc) * 100)

            # Experience and project evaluation
            project_keywords = ['project', 'developed', 'created', 'built', 'implemented', 'hackathon']
            project_mentions = sum(1 for token in cv_doc if token.text.lower() in project_keywords)
            project_experience_percentage = min(project_mentions * 10, 30)

            # Comprehensive match calculation
            match_percentage = (
                skill_match_percentage * 0.4 +  # Skills weight
                keyword_match_percentage * 0.3 +  # Keywords weight
                project_experience_percentage * 0.3  # Project experience weight
            )

            # Ensure match percentage is between 0 and 100
            match_percentage = max(0, min(match_percentage, 100))

            # Detailed analysis
            analysis = {
                'skill_match': {
                    'total_skills': len(job_skills),
                    'matched_skills': matched_skills,
                    'match_percentage': skill_match_percentage
                },
                'keyword_match': {
                    'total_keywords': len(job_doc),
                    'matched_keywords': keyword_matches,
                    'match_percentage': keyword_match_percentage
                },
                'project_experience': {
                    'project_mentions': project_mentions,
                    'match_percentage': project_experience_percentage
                }
            }

            # Create and return match response
            return MatchResponse(
                match_percentage=round(match_percentage, 2),
                matched_skills=matched_skills,
                missing_skills=missing_skills,
                keyword_matches=keyword_matches,
                analysis=analysis
            )

        except Exception as e:
            logger.error(f"Error in match calculation: {e}", exc_info=True)
            # Return a default match response in case of error
            return MatchResponse(
                match_percentage=0,
                matched_skills=[],
                missing_skills=list(job.skills),
                keyword_matches=[],
                analysis={"error": str(e)}
            )