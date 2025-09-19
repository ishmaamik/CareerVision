
package CareerVision.dto;

import jakarta.validation.constraints.*;

public class UpdateReviewRequest {
    @Size(max = 255, message = "Author name cannot exceed 255 characters")
    private String authorName;

    @Size(max = 100, message = "Author role cannot exceed 100 characters")
    private String authorRole;

    @Size(min = 10, max = 1000, message = "Comment must be between 10 and 1000 characters")
    private String comment;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    // Constructors
    public UpdateReviewRequest() {}

    // Getters and Setters
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}
