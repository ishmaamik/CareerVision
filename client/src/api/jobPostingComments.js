import axios from './axiosConfig';

const JobPostingCommentsAPI = {
    // Add a comment to a job posting
    addComment: async (jobPostingId, content) => {
        try {
            const response = await axios.post(`/job-postings/${jobPostingId}/comments`, { content });
            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    },

    // Get comments for a job posting
    getComments: async (jobPostingId, page = 0, size = 20) => {
        try {
            const response = await axios.get(`/job-postings/${jobPostingId}/comments`, {
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    // Get top-level comments
    getTopLevelComments: async (jobPostingId) => {
        try {
            const response = await axios.get(`/job-postings/${jobPostingId}/comments/top-level`);
            return response.data;
        } catch (error) {
            console.error('Error fetching top-level comments:', error);
            throw error;
        }
    },

    // Count comments for a job posting
    countComments: async (jobPostingId) => {
        try {
            const response = await axios.get(`/job-postings/${jobPostingId}/comments/count`);
            return response.data;
        } catch (error) {
            console.error('Error counting comments:', error);
            throw error;
        }
    },

    // Update a comment
    updateComment: async (jobPostingId, commentId, content) => {
        try {
            const response = await axios.put(`/job-postings/${jobPostingId}/comments/${commentId}`, { content });
            return response.data;
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    },

    // Delete a comment
    deleteComment: async (jobPostingId, commentId) => {
        try {
            await axios.delete(`/job-postings/${jobPostingId}/comments/${commentId}`);
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    },

    // Upvote a comment
    upvoteComment: async (jobPostingId, commentId) => {
        try {
            const response = await axios.post(`/job-postings/${jobPostingId}/comments/${commentId}/upvote`);
            return response.data;
        } catch (error) {
            console.error('Error upvoting comment:', error);
            throw error;
        }
    },

    // Downvote a comment
    downvoteComment: async (jobPostingId, commentId) => {
        try {
            const response = await axios.post(`/job-postings/${jobPostingId}/comments/${commentId}/downvote`);
            return response.data;
        } catch (error) {
            console.error('Error downvoting comment:', error);
            throw error;
        }
    }
};

export default JobPostingCommentsAPI;
