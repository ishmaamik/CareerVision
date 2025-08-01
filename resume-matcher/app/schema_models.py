from pydantic import BaseModel
from typing import List, Optional

class JobRequirements(BaseModel):
    title: str
    description: str
    company: str
    location: str
    responsibilities: str
    skills: List[str]
    qualifications: str
    experience_years: Optional[int] = None

class CVData(BaseModel):
    extracted_text: str
    skills: Optional[List[str]] = None
    experience_years: Optional[int] = None

class MatchResponse(BaseModel):
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
    keyword_matches: List[str]
    analysis: dict