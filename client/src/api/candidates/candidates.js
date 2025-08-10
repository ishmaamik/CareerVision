import axios from "axios";

export const fetchTopCandidates = async (jobId, topN) => {
    try {
        const res = await fetch(`http://localhost:5002/match-top-candidates?job_id=${jobId}&top_n=${topN}`);
        const data = await res.json();
        return data.topCandidates || [];
      } catch (err) {
        console.error("Error fetching top candidates:", err);
        return [];
      }
};