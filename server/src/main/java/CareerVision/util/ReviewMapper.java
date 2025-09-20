// UPDATED REVIEW MAPPER UTILITY
package CareerVision.util;

import CareerVision.model.Review;
import CareerVision.dto.ReviewResponse;
import CareerVision.dto.CreateReviewRequest;
import CareerVision.dto.UpdateReviewRequest;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public static ReviewResponse toResponseDTO(Review review) {
        if (review == null) {
            return null;
        }

        return new ReviewResponse(
            review.getId(),
            review.getAuthorName(),
            review.getAuthorRole(),
            review.getComment(),
            review.getRating(),
            review.getLikes(),
            review.getHelpful(),
            review.getJobId(),
            review.getCreatedAt(),
            review.getUpdatedAt()
        );
    }

    public static Review fromCreateRequest(CreateReviewRequest request) {
        if (request == null) {
            return null;
        }

        Review review = new Review();
        review.setAuthorName(request.getAuthorName());
        review.setAuthorRole(request.getAuthorRole());
        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setJobId(request.getJobId());
        
        return review;
    }

    public static void updateFromRequest(Review review, UpdateReviewRequest request) {
        if (review == null || request == null) {
            return;
        }

        if (request.getAuthorName() != null) {
            review.setAuthorName(request.getAuthorName());
        }
        if (request.getAuthorRole() != null) {
            review.setAuthorRole(request.getAuthorRole());
        }
        if (request.getComment() != null) {
            review.setComment(request.getComment());
        }
        if (request.getRating() != null) {
            review.setRating(request.getRating());
        }
    }
}