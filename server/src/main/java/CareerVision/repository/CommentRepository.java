package CareerVision.repository;

import CareerVision.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Find comments for a specific entity
    List<Comment> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, Long entityId);

    // Find comments for a specific entity with pagination
    Page<Comment> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, Long entityId, Pageable pageable);

    // Find top-level comments (without parent comment)
    List<Comment> findByEntityTypeAndEntityIdAndParentCommentIdIsNullOrderByCreatedAtDesc(String entityType, Long entityId);

    // Find replies to a specific comment
    List<Comment> findByParentCommentIdOrderByCreatedAtAsc(String parentCommentId);

    // Count comments for a specific entity
    long countByEntityTypeAndEntityId(String entityType, Long entityId);

    // Find comments by a specific user
    List<Comment> findByAuthorIdOrderByCreatedAtDesc(Long authorId);

    // Find comments with most upvotes for a specific entity
    @Query("SELECT c FROM Comment c WHERE c.entityType = :entityType AND c.entityId = :entityId ORDER BY c.upvotes DESC")
    List<Comment> findMostUpvotedComments(
        @Param("entityType") String entityType, 
        @Param("entityId") Long entityId, 
        Pageable pageable
    );

    // Delete soft-deleted comments older than a certain date
    @Query("DELETE FROM Comment c WHERE c.isDeleted = true AND c.updatedAt < :cutoffDate")
    void deleteOldSoftDeletedComments(@Param("cutoffDate") java.time.LocalDateTime cutoffDate);
}
