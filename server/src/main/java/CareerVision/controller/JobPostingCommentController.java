package CareerVision.controller;

import CareerVision.model.Comment;
import CareerVision.model.User;
import CareerVision.service.JobPostingService;
import CareerVision.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-postings/{jobPostingId}/comments")
@Tag(name = "Job Posting Comments", description = "APIs for managing comments on job postings")
public class JobPostingCommentController {
    private static final Logger logger = LoggerFactory.getLogger(JobPostingCommentController.class);

    @Autowired
    private JobPostingService jobPostingService;

    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(summary = "Add a comment to a job posting", description = "Allows adding a comment to a specific job posting")
    public ResponseEntity<?> addComment(
        @PathVariable Long jobPostingId,
        @RequestBody CommentRequest commentRequest,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Add comment to job posting
            Comment savedComment = jobPostingService.addCommentToJobPosting(
                jobPostingId, 
                currentUser, 
                commentRequest.content
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
        } catch (Exception e) {
            logger.error("Error adding comment to job posting", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Creation Error", e.getMessage()));
        }
    }

    @GetMapping
    @Operation(summary = "Get comments for a job posting", description = "Retrieves paginated comments for a specific job posting")
    public ResponseEntity<?> getComments(
        @PathVariable Long jobPostingId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Page<Comment> comments = jobPostingService.getJobPostingComments(jobPostingId, page, size);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error retrieving job posting comments", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Comment Retrieval Error", e.getMessage()));
        }
    }

    @GetMapping("/top-level")
    @Operation(summary = "Get top-level comments", description = "Retrieves top-level comments for a job posting")
    public ResponseEntity<?> getTopLevelComments(
        @PathVariable Long jobPostingId
    ) {
        try {
            List<Comment> comments = jobPostingService.getTopLevelJobPostingComments(jobPostingId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error retrieving top-level job posting comments", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Top-Level Comment Retrieval Error", e.getMessage()));
        }
    }

    @GetMapping("/count")
    @Operation(summary = "Count comments", description = "Retrieves the total number of comments for a job posting")
    public ResponseEntity<?> countComments(
        @PathVariable Long jobPostingId
    ) {
        try {
            long commentCount = jobPostingService.countJobPostingComments(jobPostingId);
            return ResponseEntity.ok(commentCount);
        } catch (Exception e) {
            logger.error("Error counting job posting comments", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Comment Count Error", e.getMessage()));
        }
    }

    @PutMapping("/{commentId}")
    @Operation(summary = "Update a comment", description = "Allows updating a comment on a job posting")
    public ResponseEntity<?> updateComment(
        @PathVariable Long jobPostingId,
        @PathVariable Long commentId,
        @RequestBody UpdateCommentRequest updateRequest,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Update comment
            Comment updatedComment = jobPostingService.updateJobPostingComment(
                commentId, 
                updateRequest.content, 
                currentUser.getId()
            );

            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            logger.error("Error updating job posting comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Update Error", e.getMessage()));
        }
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "Delete a comment", description = "Allows deleting a comment on a job posting")
    public ResponseEntity<?> deleteComment(
        @PathVariable Long jobPostingId,
        @PathVariable Long commentId,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Delete comment
            jobPostingService.deleteJobPostingComment(commentId, currentUser.getId());

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting job posting comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Deletion Error", e.getMessage()));
        }
    }

    // Request DTOs
    public static class CommentRequest {
        public String content;
    }

    public static class UpdateCommentRequest {
        public String content;
    }

    // Error response class
    public static class ErrorResponse {
        public String status;
        public String message;

        public ErrorResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
