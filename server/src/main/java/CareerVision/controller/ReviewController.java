// ENHANCED REVIEW CONTROLLER
package CareerVision.controller;

import CareerVision.model.Review;
import CareerVision.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"*"})
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = reviewService.getAllReviews();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Review>> getReviewsByJobId(@PathVariable Long jobId) {
        try {
            List<Review> reviews = reviewService.getReviewsByJobId(jobId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/average-rating")
    public ResponseEntity<Double> getAverageRating(@RequestParam(required = false) Long jobId) {
        try {
            double averageRating = jobId != null 
                ? reviewService.getAverageRatingByJobId(jobId) 
                : 0.0;
            return ResponseEntity.ok(averageRating);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        try {
            // Validate input
            if (review == null || review.getComment() == null || review.getComment().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Comment cannot be empty");
            }

            // Validate comment length
            if (review.getComment().trim().length() < 10) {
                return ResponseEntity.badRequest().body("Review must be at least 10 characters long");
            }

            if (review.getComment().trim().length() > 1000) {
                return ResponseEntity.badRequest().body("Review cannot exceed 1000 characters");
            }

            // Validate rating
            if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
                return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
            }

            Review createdReview = reviewService.createReview(review);
            return ResponseEntity.ok(createdReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating review: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/like")
    public ResponseEntity<Review> likeReview(@PathVariable Long id) {
        try {
            Review likedReview = reviewService.likeReview(id);
            return ResponseEntity.ok(likedReview);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}