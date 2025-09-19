package CareerVision.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String entityType; // e.g., "INTERVIEW_QUESTION", "JOB_POSTING", "COMPANY"

    @Column(nullable = false)
    private Long entityId; // ID of the related entity

    @Column(nullable = true, length = 500)
    private String parentCommentId; // For nested comments/replies

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private boolean isDeleted = false;

    @Column(nullable = false)
    private int upvotes = 0;

    @Column(nullable = false)
    private int downvotes = 0;

    // Constructors
    public Comment() {}

    public Comment(String content, User author, String entityType, Long entityId) {
        this.content = content;
        this.author = author;
        this.entityType = entityType;
        this.entityId = entityId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }

    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }

    public String getParentCommentId() { return parentCommentId; }
    public void setParentCommentId(String parentCommentId) { this.parentCommentId = parentCommentId; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public boolean isDeleted() { return isDeleted; }
    public void setDeleted(boolean deleted) { isDeleted = deleted; }

    public int getUpvotes() { return upvotes; }
    public void setUpvotes(int upvotes) { this.upvotes = upvotes; }

    public int getDownvotes() { return downvotes; }
    public void setDownvotes(int downvotes) { this.downvotes = downvotes; }

    // Utility methods
    public void incrementUpvotes() { this.upvotes++; }
    public void decrementUpvotes() { this.upvotes = Math.max(0, this.upvotes - 1); }

    public void incrementDownvotes() { this.downvotes++; }
    public void decrementDownvotes() { this.downvotes = Math.max(0, this.downvotes - 1); }

    @Override
    public String toString() {
        return "Comment{" +
               "id=" + id +
               ", content='" + content + '\'' +
               ", author=" + (author != null ? author.getName() : "N/A") +
               ", entityType='" + entityType + '\'' +
               ", entityId=" + entityId +
               ", createdAt=" + createdAt +
               '}';
    }
}
