// CREATE REVIEW REQUEST DTO
package CareerVision.dto;

import jakarta.validation.constraints.*;

public class CreateReviewRequest {
    @NotBlank(message = "Author name cannot be blank")
    @Size(max = 255, message = "Author name cannot exceed 255 characters")
    private String authorName;

    @Size(max = 100, message = "Author role cannot exceed 100 characters")
    private String authorRole;

    @NotBlank(message = "Comment cannot be blank")
    @Size(min = 10, max = 1000, message = "Comment must be between 10 and 1000 characters")
    private String comment;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    private Long jobId;

    // Constructors
    public CreateReviewRequest() {}

    public CreateReviewRequest(String authorName, String authorRole, String comment, Integer rating, Long jobId) {
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.comment = comment;
        this.rating = rating;
        this.jobId = jobId;
    }

    // Getters and Setters
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
}