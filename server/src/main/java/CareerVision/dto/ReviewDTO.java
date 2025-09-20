package CareerVision.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class ReviewDTO {
    
    // Response DTO
    public static class ReviewResponse {
        private Long id;
        private String authorName;
        private String authorRole;
        private String comment;
        private Integer rating;
        private Integer likes;
        private Boolean helpful;
        private Long jobId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        // Constructors
        public ReviewResponse() {}

        public ReviewResponse(Long id, String authorName, String authorRole, String comment, 
                            Integer rating, Integer likes, Boolean helpful, Long jobId, 
                            LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.authorName = authorName;
            this.authorRole = authorRole;
            this.comment = comment;
            this.rating = rating;
            this.likes = likes;
            this.helpful = helpful;
            this.jobId = jobId;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }

        public String getAuthorRole() { return authorRole; }
        public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }

        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }

        public Integer getLikes() { return likes; }
        public void setLikes(Integer likes) { this.likes = likes; }

        public Boolean getHelpful() { return helpful; }
        public void setHelpful(Boolean helpful) { this.helpful = helpful; }

        public Long getJobId() { return jobId; }
        public void setJobId(Long jobId) { this.jobId = jobId; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    } 
    
}
