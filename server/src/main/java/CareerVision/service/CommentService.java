package CareerVision.service;

import CareerVision.model.Comment;
import CareerVision.model.User;
import CareerVision.repository.CommentRepository;
import CareerVision.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new comment
    @Transactional
    public Comment createComment(Comment comment) {
        try {
            // Validate comment
            validateComment(comment);

            // Save the comment
            Comment savedComment = commentRepository.save(comment);
            
            logger.info("Comment created successfully: {}", savedComment);
            
            return savedComment;
        } catch (Exception e) {
            logger.error("Error creating comment", e);
            throw new RuntimeException("Failed to create comment", e);
        }
    }

    // Validate comment details
    private void validateComment(Comment comment) {
        if (comment == null) {
            throw new IllegalArgumentException("Comment cannot be null");
        }

        if (comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Comment content is required");
        }

        if (comment.getAuthor() == null) {
            throw new IllegalArgumentException("Comment author is required");
        }

        if (comment.getEntityType() == null || comment.getEntityType().trim().isEmpty()) {
            throw new IllegalArgumentException("Entity type is required");
        }

        if (comment.getEntityId() == null) {
            throw new IllegalArgumentException("Entity ID is required");
        }
    }

    // Get comments for a specific entity
    public List<Comment> getCommentsByEntity(String entityType, Long entityId) {
        return commentRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId);
    }

    // Get paginated comments for a specific entity
    public Page<Comment> getCommentsByEntity(String entityType, Long entityId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return commentRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId, pageable);
    }

    // Get top-level comments for an entity
    public List<Comment> getTopLevelComments(String entityType, Long entityId) {
        return commentRepository.findByEntityTypeAndEntityIdAndParentCommentIdIsNullOrderByCreatedAtDesc(entityType, entityId);
    }

    // Get replies to a specific comment
    public List<Comment> getReplies(String parentCommentId) {
        return commentRepository.findByParentCommentIdOrderByCreatedAtAsc(parentCommentId);
    }

    // Update a comment
    @Transactional
    public Comment updateComment(Long commentId, String newContent, Long userId) {
        try {
            // Find the comment
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Verify the user is the author
            if (!comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Only the author can edit this comment");
            }

            // Update content
            comment.setContent(newContent);

            // Save updated comment
            return commentRepository.save(comment);
        } catch (Exception e) {
            logger.error("Error updating comment", e);
            throw new RuntimeException("Failed to update comment", e);
        }
    }

    // Soft delete a comment
    @Transactional
    public void softDeleteComment(Long commentId, Long userId) {
        try {
            // Find the comment
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Verify the user is the author
            if (!comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Only the author can delete this comment");
            }

            // Soft delete
            comment.setDeleted(true);
            comment.setContent("This comment has been deleted.");

            commentRepository.save(comment);
        } catch (Exception e) {
            logger.error("Error soft deleting comment", e);
            throw new RuntimeException("Failed to delete comment", e);
        }
    }

    // Upvote a comment
    @Transactional
    public Comment upvoteComment(Long commentId, Long userId) {
        try {
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Prevent self-upvoting
            if (comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Cannot upvote your own comment");
            }

            comment.incrementUpvotes();
            return commentRepository.save(comment);
        } catch (Exception e) {
            logger.error("Error upvoting comment", e);
            throw new RuntimeException("Failed to upvote comment", e);
        }
    }

    // Downvote a comment
    @Transactional
    public Comment downvoteComment(Long commentId, Long userId) {
        try {
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Prevent self-downvoting
            if (comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Cannot downvote your own comment");
            }

            comment.incrementDownvotes();
            return commentRepository.save(comment);
        } catch (Exception e) {
            logger.error("Error downvoting comment", e);
            throw new RuntimeException("Failed to downvote comment", e);
        }
    }

    // Get most upvoted comments for an entity
    public List<Comment> getMostUpvotedComments(String entityType, Long entityId, int limit) {
        Pageable topN = PageRequest.of(0, limit);
        return commentRepository.findMostUpvotedComments(entityType, entityId, topN);
    }

    // Clean up old soft-deleted comments
    @Transactional
    public void cleanupOldDeletedComments() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(30);
        commentRepository.deleteOldSoftDeletedComments(cutoffDate);
    }
}
