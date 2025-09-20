// Enhanced reviewService.js
import axios from './axiosConfig';

const REVIEW_API_BASE_URL = '/reviews';

export const reviewService = {
    getAllReviews: async (jobId) => {
        try {
            const url = jobId ? `${REVIEW_API_BASE_URL}?jobId=${jobId}` : REVIEW_API_BASE_URL;
            const response = await axios.get(url, {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Detailed error fetching reviews:', error);
            
            if (error.response) {
                throw new Error(`Failed to fetch reviews: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection.');
            } else {
                throw new Error('Error setting up review request');
            }
        }
    },

    getAverageRating: async (jobId) => {
        try {
            const url = jobId ? `${REVIEW_API_BASE_URL}/average-rating?jobId=${jobId}` : `${REVIEW_API_BASE_URL}/average-rating`;
            const response = await axios.get(url, {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching average rating:', error);
            return 0; // Return 0 instead of throwing error
        }
    },

    createReview: async (reviewData) => {
        try {
            // Validate data on frontend as well
            if (!reviewData.comment || reviewData.comment.trim().length < 10) {
                throw new Error('Review comment must be at least 10 characters long');
            }

            if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
                throw new Error('Rating must be between 1 and 5 stars');
            }

            const payload = {
                authorName: reviewData.authorName || 'Anonymous',
                authorRole: reviewData.authorRole || '',
                comment: reviewData.comment.trim(),
                rating: reviewData.rating,
                jobId: reviewData.jobId
            };

            const response = await axios.post(REVIEW_API_BASE_URL, payload, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Detailed error creating review:', error);
            
            if (error.response) {
                const errorMessage = error.response.data?.message || error.response.data || `Server error: ${error.response.status}`;
                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection.');
            } else {
                throw new Error(error.message || 'Error creating review');
            }
        }
    },

    likeReview: async (reviewId) => {
        try {
            const response = await axios.patch(`${REVIEW_API_BASE_URL}/${reviewId}/like`, {}, {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Detailed error liking review:', error);
            
            if (error.response) {
                throw new Error(`Failed to like review: ${error.response.status}`);
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection.');
            } else {
                throw new Error('Error liking review');
            }
        }
    },

    updateReview: async (reviewId, reviewData) => {
        try {
            const response = await axios.put(`${REVIEW_API_BASE_URL}/${reviewId}`, reviewData, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        try {
            await axios.delete(`${REVIEW_API_BASE_URL}/${reviewId}`, {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    }
};