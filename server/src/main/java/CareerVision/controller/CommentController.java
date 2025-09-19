package CareerVision.controller;

import CareerVision.model.Comment;
import CareerVision.model.User;
import CareerVision.service.CommentService;
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
@RequestMapping("/api/comments")
@Tag(name = "Comment Management", description = "APIs for managing comments across different entities")
public class CommentController {
    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(summary = "Create a new comment", description = "Allows creating a comment for a specific entity")
    public ResponseEntity<?> createComment(
        @RequestBody CommentRequest commentRequest,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Create comment object
            Comment comment = new Comment(
                commentRequest.content, 
                currentUser, 
                commentRequest.entityType, 
                commentRequest.entityId
            );

            // Set parent comment if provided
            if (commentRequest.parentCommentId != null) {
                comment.setParentCommentId(commentRequest.parentCommentId);
            }

            // Save comment
            Comment savedComment = commentService.createComment(comment);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
        } catch (Exception e) {
            logger.error("Error creating comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Creation Error", e.getMessage()));
        }
    }

    @GetMapping("/entity")
    @Operation(summary = "Get comments for a specific entity", description = "Retrieves comments for a given entity type and ID")
    public ResponseEntity<?> getCommentsByEntity(
        @RequestParam String entityType,
        @RequestParam Long entityId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Page<Comment> comments = commentService.getCommentsByEntity(entityType, entityId, page, size);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error retrieving comments", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Comment Retrieval Error", e.getMessage()));
        }
    }

    @GetMapping("/top-level")
    @Operation(summary = "Get top-level comments", description = "Retrieves top-level comments for a specific entity")
    public ResponseEntity<?> getTopLevelComments(
        @RequestParam String entityType,
        @RequestParam Long entityId
    ) {
        try {
            List<Comment> comments = commentService.getTopLevelComments(entityType, entityId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error retrieving top-level comments", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Comment Retrieval Error", e.getMessage()));
        }
    }

    @GetMapping("/replies")
    @Operation(summary = "Get replies to a comment", description = "Retrieves replies to a specific comment")
    public ResponseEntity<?> getReplies(
        @RequestParam String parentCommentId
    ) {
        try {
            List<Comment> replies = commentService.getReplies(parentCommentId);
            return ResponseEntity.ok(replies);
        } catch (Exception e) {
            logger.error("Error retrieving comment replies", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Replies Retrieval Error", e.getMessage()));
        }
    }

    @PutMapping("/{commentId}")
    @Operation(summary = "Update a comment", description = "Allows updating the content of a comment")
    public ResponseEntity<?> updateComment(
        @PathVariable Long commentId,
        @RequestBody UpdateCommentRequest updateRequest,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Update comment
            Comment updatedComment = commentService.updateComment(commentId, updateRequest.content, currentUser.getId());

            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            logger.error("Error updating comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Update Error", e.getMessage()));
        }
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "Soft delete a comment", description = "Soft deletes a comment")
    public ResponseEntity<?> softDeleteComment(
        @PathVariable Long commentId,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Soft delete comment
            commentService.softDeleteComment(commentId, currentUser.getId());

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Comment Deletion Error", e.getMessage()));
        }
    }

    @PostMapping("/{commentId}/upvote")
    @Operation(summary = "Upvote a comment", description = "Allows upvoting a comment")
    public ResponseEntity<?> upvoteComment(
        @PathVariable Long commentId,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Upvote comment
            Comment updatedComment = commentService.upvoteComment(commentId, currentUser.getId());

            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            logger.error("Error upvoting comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Upvote Error", e.getMessage()));
        }
    }

    @PostMapping("/{commentId}/downvote")
    @Operation(summary = "Downvote a comment", description = "Allows downvoting a comment")
    public ResponseEntity<?> downvoteComment(
        @PathVariable Long commentId,
        @RequestHeader("Authorization") String token
    ) {
        try {
            // Authenticate and get user
            User currentUser = userService.getUserFromToken(token);

            // Downvote comment
            Comment updatedComment = commentService.downvoteComment(commentId, currentUser.getId());

            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            logger.error("Error downvoting comment", e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Downvote Error", e.getMessage()));
        }
    }

    // Request DTOs
    public static class CommentRequest {
        public String content;
        public String entityType;
        public Long entityId;
        public String parentCommentId;
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
