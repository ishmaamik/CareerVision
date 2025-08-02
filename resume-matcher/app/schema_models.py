from pydantic import BaseModel, Field, validator
from typing import List, Optional

class JobRequirements(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Job title")
    description: str = Field(..., min_length=10, max_length=2000, description="Job description")
    company: str = Field(..., min_length=1, max_length=200, description="Company name")
    location: str = Field(..., min_length=1, max_length=200, description="Job location")
    responsibilities: Optional[str] = Field(None, max_length=2000, description="Job responsibilities")
    skills: List[str] = Field(default_factory=list, description="Required skills")
    qualifications: Optional[str] = Field(None, max_length=1000, description="Job qualifications")
    experience_years: Optional[int] = Field(None, ge=0, le=50, description="Years of experience")

    @validator('skills')
    def validate_skills(cls, skills):
        # Ensure skills are unique and not empty strings
        skills = list(set(skill.strip() for skill in skills if skill.strip()))
        return skills

class CVData(BaseModel):
    extracted_text: str = Field(..., min_length=10, max_length=10000, description="Extracted resume text")
    skills: Optional[List[str]] = Field(default_factory=list, description="Skills from the resume")
    experience_years: Optional[int] = Field(None, ge=0, le=50, description="Years of experience")

    @validator('skills')
    def validate_skills(cls, skills):
        # Ensure skills are unique and not empty strings
        skills = list(set(skill.strip() for skill in skills if skill.strip()))
        return skills

class MatchResponse(BaseModel):
    match_percentage: float = Field(..., ge=0, le=100, description="Percentage match")
    matched_skills: List[str] = Field(default_factory=list, description="Skills that matched")
    missing_skills: List[str] = Field(default_factory=list, description="Skills not found in resume")
    keyword_matches: List[str] = Field(default_factory=list, description="Keyword matches")
    analysis: dict = Field(default_factory=dict, description="Detailed match analysis")