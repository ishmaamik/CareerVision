package CareerVision.service;

import CareerVision.model.Review;
import CareerVision.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Review> getReviewsByJobId(Long jobId) {
        return reviewRepository.findByJobId(jobId);
    }

    @Transactional
    public Review createReview(Review review) {
        // Validate and set default values
        if (review.getAuthorName() == null || review.getAuthorName().trim().isEmpty()) {
            review.setAuthorName("Anonymous");
        }

        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
            review.setRating(3); // Default to 3 if invalid
        }

        // Set default values
        review.setLikes(0);
        review.setHelpful(false);

        return reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    @Transactional
    public Review likeReview(Long id) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        
        review.setLikes(review.getLikes() + 1);
        review.setHelpful(!review.getHelpful());
        
        return reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public double getAverageRatingByJobId(Long jobId) {
        Double averageRating = reviewRepository.findAverageRatingByJobId(jobId);
        return averageRating != null ? averageRating : 0.0;
    }
}
