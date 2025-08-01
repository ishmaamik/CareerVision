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

    def _extract_skills(self, doc: spacy.tokens.Doc) -> List[str]:
        """
        Extract skills from the document using NER and custom logic
        """
        skills = []
        
        # Extract skills based on part-of-speech and named entities
        for ent in doc.ents:
            if ent.label_ in ['PRODUCT', 'ORG', 'WORK_OF_ART']:
                skills.append(ent.text)
        
        # Extract potential skills from nouns
        skills.extend([
            token.text for token in doc 
            if token.pos_ in ['NOUN', 'PROPN'] and len(token.text) > 2
        ])
        
        # Remove duplicates and clean
        return list(set(skill.strip() for skill in skills if skill.strip()))

    def calculate_match(self, job: JobRequirements, cv: CVData) -> MatchResponse:
        """
        Calculate resume match percentage
        """
        try:
            # Preprocess texts
            job_doc = self._preprocess_text(f"{job.title} {job.description} {job.responsibilities}")
            cv_doc = self._preprocess_text(cv.extracted_text)

            # Extract skills
            job_skills = set(job.skills)
            cv_skills = set(self._extract_skills(cv_doc))
            
            # Log extracted skills for debugging
            logger.debug(f"Job Skills: {job_skills}")
            logger.debug(f"CV Skills: {cv_skills}")

            # Calculate skill match
            matched_skills = list(job_skills.intersection(cv_skills))
            missing_skills = list(job_skills - cv_skills)

            # Calculate match percentage
            total_skills = len(job_skills)
            match_count = len(matched_skills)
            match_percentage = (match_count / total_skills * 100) if total_skills > 0 else 0

            # Keyword matching
            keyword_matches = []
            for skill in job_skills:
                if skill.lower() in cv_doc.text.lower():
                    keyword_matches.append(skill)

            # Detailed analysis
            analysis: Dict[str, Any] = {
                "total_job_skills": total_skills,
                "matched_skill_count": match_count,
                "skill_match_rate": f"{match_percentage:.2f}%",
                "experience_match": self._match_experience(job, cv)
            }

            # Create and return match response
            return MatchResponse(
                match_percentage=match_percentage,
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

    def _match_experience(self, job: JobRequirements, cv: CVData) -> Dict[str, Any]:
        """
        Compare job and resume experience
        """
        job_exp = job.experience_years
        cv_exp = cv.experience_years

        if job_exp is None or cv_exp is None:
            return {
                "job_experience_years": job_exp,
                "cv_experience_years": cv_exp,
                "experience_match": "Not specified"
            }

        exp_difference = cv_exp - job_exp
        exp_match_status = (
            "Exceeds" if exp_difference > 0 
            else "Meets" if exp_difference == 0 
            else "Insufficient"
        )

        return {
            "job_experience_years": job_exp,
            "cv_experience_years": cv_exp,
            "experience_difference": exp_difference,
            "experience_match": exp_match_status
        }