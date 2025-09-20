import axios from './axiosConfig';

const SAVED_JOBS_API_BASE_URL = '/api/saved-jobs';

export const savedJobsService = {
    // Save a job for a user
    saveJob: async (userId, jobId) => {
        try {
            const response = await axios.post(`${SAVED_JOBS_API_BASE_URL}/save`, { 
                userId, 
                jobId 
            });
            return response.data;
        } catch (error) {
            console.error('Error saving job:', error);
            throw error;
        }
    },

    // Get saved jobs for a user
    getSavedJobs: async (userId) => {
        try {
            const response = await axios.get(`${SAVED_JOBS_API_BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching saved jobs:', error);
            throw error;
        }
    },

    // Unsave a job for a user
    unsaveJob: async (userId, jobId) => {
        try {
            const response = await axios.delete(`${SAVED_JOBS_API_BASE_URL}/unsave`, { 
                data: { 
                    userId, 
                    jobId 
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Error unsaving job:', error);
            throw error;
        }
    },

    // Check if a job is saved by a user
    isJobSaved: async (userId, jobId) => {
        try {
            const response = await axios.get(`${SAVED_JOBS_API_BASE_URL}/is-saved`, {
                params: { 
                    userId, 
                    jobId 
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking saved job status:', error);
            throw error;
        }
    },

    // Count saved jobs for a user
    countSavedJobs: async (userId) => {
        try {
            const response = await axios.get(`${SAVED_JOBS_API_BASE_URL}/count/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error counting saved jobs:', error);
            throw error;
        }
    }
};
