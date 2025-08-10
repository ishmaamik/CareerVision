from fastapi import FastAPI, Query
from typing import List
import requests

app = FastAPI()

# Config – change to your backend URL
SPRING_BOOT_API_BASE = "http://localhost:8080/api/applications/job"

@app.get("/match-top-candidates")
def get_top_candidates(job_id: int):
    """
    Fetch job applications for a given job_id from Spring Boot,
    calculate suitability score, and return top 10 candidates.
    """

    # Get applications from backend
    resp = requests.get(f"{SPRING_BOOT_API_BASE}/{job_id}")
    if resp.status_code != 200:
        return {"error": "Failed to fetch applications from backend"}

    applications = resp.json()

    # Ensure we have applications
    if not applications:
        return {"message": "No applications found"}

    scored_candidates = []

    # Normalization factors for distance
    max_distance = max((app.get("distance", 0) or 0) for app in applications) or 1

    for app in applications:
        match_percentage = app.get("matchPercentage", 0) or 0
        distance = app.get("distance", 0) or 0

        # Normalize distance score (closer = higher score)
        distance_score = 100 - (distance / max_distance * 100)
        distance_score = max(0, distance_score)  # No negatives

        # Weighted final score
        final_score = (match_percentage * 0.8) + (distance_score * 0.2)

        scored_candidates.append({
            "applicationId": app.get("id"),
            "userId": app["applicant"]["id"] if app.get("applicant") else None,
            "userName": app["applicant"]["name"] if app.get("applicant") else "Unknown",
            "matchPercentage": match_percentage,
            "distance": distance,
            "finalScore": round(final_score, 2)
        })

    # Sort by final score
    top_candidates = sorted(scored_candidates, key=lambda x: x["finalScore"], reverse=True)[:10]

    return {"jobId": job_id, "topCandidates": top_candidates}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5002)