import axios from "axios";

export const fetchTopCandidates = async (jobId) => {
    try {
        const res = await fetch(`http://localhost:5002/match-top-candidates?job_id=${jobId}`);
        const data = await res.json();
        return data.topCandidates || [];
      } catch (err) {
        console.error("Error fetching top candidates:", err);
        return [];
      }
};

export const fetchFilteredApplications = async (jobId, options = {}) => {
  const params = {
    jobId: jobId, // ← MISSING! This is the key fix
    filterType: options.filterType || 'all',
    locationThreshold: options.locationThreshold ?? undefined,
    percentageThreshold: options.percentageThreshold ?? undefined,
    search: options.search || '',
    sortBy: options.sortBy || 'percentage',
    limit: options.limit || 10
  };

  // Remove undefined values from params
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });

  console.log('Calling filtered endpoint with params:', params); // Debug log

  const res = await axios.get(`/api/applications/filtered`, { params });
  return res.data;
};