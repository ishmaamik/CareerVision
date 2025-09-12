package CareerVision.controller;

import CareerVision.model.InterviewQuestionBank;
import CareerVision.model.InterviewQuestionComment;
import CareerVision.model.User;
import CareerVision.repository.InterviewQuestionBankRepository;
import CareerVision.repository.InterviewQuestionCommentRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interview-questions/comments")
public class InterviewQuestionCommentController {

    @Autowired
    private InterviewQuestionCommentRepository commentRepository;

    @Autowired
    private InterviewQuestionBankRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    // Add a new comment
    @PostMapping("/add")
    public ResponseEntity<InterviewQuestionComment> addComment(
        @RequestParam Long questionId,
        @RequestParam Long userId,
        @RequestParam String content,
        @RequestParam(required = false) Long parentCommentId,
        @RequestParam(defaultValue = "false") Boolean isAnonymous
    ) {
        // Validate question
        Optional<InterviewQuestionBank> question = questionRepository.findById(questionId);
        if (question.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Validate user
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Create comment
        InterviewQuestionComment comment = new InterviewQuestionComment();
        comment.setInterviewQuestion(question.get());
        comment.setUser(user.get());
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setIsAnonymous(isAnonymous);

        // Set parent comment if it's a reply
        if (parentCommentId != null) {
            Optional<InterviewQuestionComment> parentComment = commentRepository.findById(parentCommentId);
            parentComment.ifPresent(comment::setParentComment);
        }

        // Save comment
        InterviewQuestionComment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    // Get comments for a specific interview question
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<InterviewQuestionComment>> getQuestionComments(
        @PathVariable Long questionId
    ) {
        // Validate question
        Optional<InterviewQuestionBank> question = questionRepository.findById(questionId);
        if (question.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Fetch top-level comments
        List<InterviewQuestionComment> comments = commentRepository
            .findByInterviewQuestionAndParentCommentIsNullOrderByCreatedAtDesc(question.get());

        return ResponseEntity.ok(comments);
    }

    // Get replies to a specific comment
    @GetMapping("/replies/{commentId}")
    public ResponseEntity<List<InterviewQuestionComment>> getCommentReplies(
        @PathVariable Long commentId
    ) {
        // Validate parent comment
        Optional<InterviewQuestionComment> parentComment = commentRepository.findById(commentId);
        if (parentComment.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Fetch replies
        List<InterviewQuestionComment> replies = commentRepository
            .findByParentCommentOrderByCreatedAtAsc(parentComment.get());

        return ResponseEntity.ok(replies);
    }

    // Like/Dislike a comment
    @PostMapping("/vote/{commentId}")
    public ResponseEntity<InterviewQuestionComment> voteComment(
        @PathVariable Long commentId,
        @RequestParam String voteType
    ) {
        Optional<InterviewQuestionComment> commentOpt = commentRepository.findById(commentId);
        
        if (commentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        InterviewQuestionComment comment = commentOpt.get();
        
        if ("like".equals(voteType)) {
            comment.setLikes(comment.getLikes() + 1);
        } else if ("dislike".equals(voteType)) {
            comment.setDislikes(comment.getDislikes() + 1);
        } else {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(commentRepository.save(comment));
    }

    // Get most liked comments across all interview questions
    @GetMapping("/top-liked")
    public ResponseEntity<List<InterviewQuestionComment>> getTopLikedComments() {
        List<InterviewQuestionComment> topComments = commentRepository.findMostLikedComments();
        return ResponseEntity.ok(topComments);
    }
}
