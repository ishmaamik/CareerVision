// FRONTEND - Enhanced Review Component
import React, { useState, useEffect } from 'react'
import { Star, Calendar, MessageCircle, ThumbsUp, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { reviewService } from '../../../api/review';

const Review = ({ isMounted, jobId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        name: '',
        role: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchReviews();
        fetchAverageRating();
    }, [jobId]);

    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const fetchedReviews = await reviewService.getAllReviews(jobId);
            setReviews(fetchedReviews);
            setError(null);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to load reviews. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const rating = await reviewService.getAverageRating(jobId);
            setAverageRating(rating || 0);
        } catch (err) {
            console.error('Error fetching average rating:', err);
            // Don't show error for average rating as it's not critical
        }
    };

    const handleSubmitReview = async () => {
        // Validate review
        if (!newReview.comment.trim()) {
            setError('Please write a review comment');
            return;
        }

        if (newReview.comment.trim().length < 10) {
            setError('Review must be at least 10 characters long');
            return;
        }

        if (newReview.rating < 1 || newReview.rating > 5) {
            setError('Please select a rating between 1 and 5 stars');
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const review = {
                authorName: newReview.name.trim() || 'Anonymous',
                authorRole: newReview.role.trim() || '',
                rating: newReview.rating,
                comment: newReview.comment.trim(),
                jobId: jobId
            };

            const createdReview = await reviewService.createReview(review);
            
            // Update reviews list
            setReviews([createdReview, ...reviews]);
            
            // Reset form
            setNewReview({ rating: 5, comment: '', name: '', role: '' });
            setShowForm(false);
            setSuccess('Review submitted successfully!');

            // Refresh average rating
            fetchAverageRating();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error submitting review:', err);
            setError(err.response?.data?.message || err.message || 'Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (id) => {
        try {
            const updatedReview = await reviewService.likeReview(id);
            setReviews(reviews.map(review => 
                review.id === id ? updatedReview : review
            ));
        } catch (err) {
            console.error('Error liking review:', err);
            setError('Failed to like review. Please try again.');
        }
    };

    const StarRating = ({ rating, interactive = false, onChange, size = 'w-5 h-5' }) => (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${size} transition-all duration-200 ${
                        interactive 
                            ? 'cursor-pointer hover:scale-110 hover:text-yellow-400' 
                            : ''
                    } ${
                        star <= rating
                            ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                            : 'text-gray-300 hover:text-gray-400'
                    } ${interactive && star <= rating ? 'animate-pulse' : ''}`}
                    onClick={interactive ? () => onChange(star) : undefined}
                    onMouseEnter={interactive ? (e) => {
                        e.target.style.transform = 'scale(1.2)';
                    } : undefined}
                    onMouseLeave={interactive ? (e) => {
                        e.target.style.transform = 'scale(1)';
                    } : undefined}
                />
            ))}
            {interactive && (
                <span className="ml-2 text-sm font-medium text-gray-600">
                    ({rating} star{rating !== 1 ? 's' : ''})
                </span>
            )}
        </div>
    );

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    if (isLoading) {
        return (
            <div className={`transform transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="ml-4 text-gray-600">Loading reviews...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`transform transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Success Message */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-t-2xl flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>{success}</span>
                        <button onClick={clearMessages} className="ml-auto text-green-700 hover:text-green-900">×</button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-t-2xl flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span>{error}</span>
                        <button onClick={clearMessages} className="ml-auto text-red-700 hover:text-red-900">×</button>
                    </div>
                )}

                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center">
                                <MessageCircle className="w-6 h-6 mr-2" />
                                Company Reviews
                            </h1>
                            <p className="opacity-90 mt-1">What employees are saying</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                                <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                            </div>
                            <p className="text-sm opacity-90">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Write Review Button - More Prominent */}
                    <div className="mb-8 flex flex-col items-center space-y-4">
                        <button
                            onClick={() => {
                                setShowForm(!showForm);
                                clearMessages();
                            }}
                            className={`${showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:transform-none`}
                            disabled={isSubmitting}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>{showForm ? 'Cancel Review' : 'Write a Review'}</span>
                        </button>

                        {/* Quick Rating - Only show when form is hidden */}
                        {!showForm && (
                            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-sm text-gray-600 mb-2 text-center">Or quickly rate this company:</p>
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-sm font-medium">Quick Rate:</span>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={`quick-${star}`}
                                                className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 text-gray-300 hover:text-yellow-400"
                                                onClick={() => {
                                                    setNewReview({...newReview, rating: star});
                                                    setShowForm(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">(Click to start review)</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Review Form */}
                    {showForm && (
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name (optional)"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        maxLength={255}
                                        disabled={isSubmitting}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Your Role (optional)"
                                        value={newReview.role}
                                        onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        maxLength={100}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                                    <label className="block text-lg font-semibold mb-3 text-gray-800">
                                        ⭐ Rate Your Experience <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-col items-center space-y-2">
                                        <StarRating 
                                            rating={newReview.rating} 
                                            interactive={!isSubmitting} 
                                            onChange={(rating) => setNewReview({...newReview, rating})}
                                            size="w-10 h-10"
                                        />
                                        <p className="text-sm text-gray-600">
                                            Click stars to rate (1 = Poor, 5 = Excellent)
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Review <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your review... (minimum 10 characters)"
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                                        maxLength={1000}
                                        disabled={isSubmitting}
                                    />
                                    <div className="text-sm text-gray-500 mt-1">
                                        {newReview.comment.length}/1000 characters
                                        {newReview.comment.length < 10 && newReview.comment.length > 0 && (
                                            <span className="text-red-500 ml-2">
                                                (Need {10 - newReview.comment.length} more characters)
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-3 pt-4">
                                    <button
                                        onClick={handleSubmitReview}
                                        disabled={isSubmitting || !newReview.comment.trim() || newReview.comment.length < 10}
                                        className="bg-gradient-to-r from-green-600 to-blue-600 text-black px-8 py-3 rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Submitting Review...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Submit Review</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowForm(false);
                                            clearMessages();
                                            setNewReview({ rating: 5, comment: '', name: '', role: '' });
                                        }}
                                        disabled={isSubmitting}
                                        className="bg-gray-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                            <p className="text-gray-500">Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                {review.authorName || 'Anonymous'}
                                            </h4>
                                            {review.authorRole && (
                                                <p className="text-sm text-gray-600">{review.authorRole}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <StarRating rating={review.rating} />
                                            <p className="text-sm text-gray-500 mt-1 flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleLike(review.id)}
                                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                                                review.helpful
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                        >
                                            <ThumbsUp className="w-3 h-3" />
                                            <span>Helpful ({review.likes || 0})</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;