package CareerVision.service;

import CareerVision.model.Comment;
import CareerVision.model.JobPosting;
import CareerVision.model.User;
import CareerVision.repository.CommentRepository;
import CareerVision.repository.JobPostingRepository;
import CareerVision.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobPostingService {
    private static final Logger logger = LoggerFactory.getLogger(JobPostingService.class);

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentService commentService;

    // Add comment to a job posting
    @Transactional
    public Comment addCommentToJobPosting(Long jobPostingId, User author, String content) {
        try {
            // Verify job posting exists
            JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

            // Create comment
            Comment comment = new Comment(
                content, 
                author, 
                "JOB_POSTING", 
                jobPostingId
            );

            // Save comment
            return commentService.createComment(comment);
        } catch (Exception e) {
            logger.error("Error adding comment to job posting", e);
            throw new RuntimeException("Failed to add comment to job posting", e);
        }
    }

    // Get comments for a job posting
    public Page<Comment> getJobPostingComments(Long jobPostingId, int page, int size) {
        try {
            // Verify job posting exists
            jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

            // Create pageable request
            Pageable pageable = PageRequest.of(page, size);

            // Fetch comments
            return commentRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(
                "JOB_POSTING", 
                jobPostingId, 
                pageable
            );
        } catch (Exception e) {
            logger.error("Error retrieving job posting comments", e);
            throw new RuntimeException("Failed to retrieve job posting comments", e);
        }
    }

    // Get top-level comments for a job posting
    public List<Comment> getTopLevelJobPostingComments(Long jobPostingId) {
        try {
            // Verify job posting exists
            jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

            // Fetch top-level comments
            return commentRepository.findByEntityTypeAndEntityIdAndParentCommentIdIsNullOrderByCreatedAtDesc(
                "JOB_POSTING", 
                jobPostingId
            );
        } catch (Exception e) {
            logger.error("Error retrieving top-level job posting comments", e);
            throw new RuntimeException("Failed to retrieve top-level job posting comments", e);
        }
    }

    // Count comments for a job posting
    public long countJobPostingComments(Long jobPostingId) {
        try {
            // Verify job posting exists
            jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

            // Count comments
            return commentRepository.countByEntityTypeAndEntityId("JOB_POSTING", jobPostingId);
        } catch (Exception e) {
            logger.error("Error counting job posting comments", e);
            throw new RuntimeException("Failed to count job posting comments", e);
        }
    }

    // Update a comment on a job posting
    @Transactional
    public Comment updateJobPostingComment(Long commentId, String newContent, Long userId) {
        try {
            // Verify comment exists and belongs to a job posting
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Verify the comment is for a job posting
            if (!"JOB_POSTING".equals(comment.getEntityType())) {
                throw new RuntimeException("Comment does not belong to a job posting");
            }

            // Verify user is the author
            if (!comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Only the author can edit this comment");
            }

            // Update comment
            return commentService.updateComment(commentId, newContent, userId);
        } catch (Exception e) {
            logger.error("Error updating job posting comment", e);
            throw new RuntimeException("Failed to update job posting comment", e);
        }
    }

    // Delete a comment on a job posting
    @Transactional
    public void deleteJobPostingComment(Long commentId, Long userId) {
        try {
            // Verify comment exists and belongs to a job posting
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

            // Verify the comment is for a job posting
            if (!"JOB_POSTING".equals(comment.getEntityType())) {
                throw new RuntimeException("Comment does not belong to a job posting");
            }

            // Verify user is the author
            if (!comment.getAuthor().getId().equals(userId)) {
                throw new RuntimeException("Only the author can delete this comment");
            }

            // Soft delete comment
            commentService.softDeleteComment(commentId, userId);
        } catch (Exception e) {
            logger.error("Error deleting job posting comment", e);
            throw new RuntimeException("Failed to delete job posting comment", e);
        }
    }
}
