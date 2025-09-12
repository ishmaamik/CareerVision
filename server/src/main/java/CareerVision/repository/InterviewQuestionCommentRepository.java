package CareerVision.repository;

import CareerVision.model.InterviewQuestionBank;
import CareerVision.model.InterviewQuestionComment;
import CareerVision.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionCommentRepository extends JpaRepository<InterviewQuestionComment, Long> {
    // Find top-level comments for a specific interview question
    List<InterviewQuestionComment> findByInterviewQuestionAndParentCommentIsNullOrderByCreatedAtDesc(InterviewQuestionBank interviewQuestion);

    // Find replies to a specific comment
    List<InterviewQuestionComment> findByParentCommentOrderByCreatedAtAsc(InterviewQuestionComment parentComment);

    // Count comments for a specific interview question
    long countByInterviewQuestion(InterviewQuestionBank interviewQuestion);

    // Find comments by user
    List<InterviewQuestionComment> findByUser(User user);

    // Find most liked comments
    @Query("SELECT c FROM InterviewQuestionComment c ORDER BY c.likes DESC")
    List<InterviewQuestionComment> findMostLikedComments();
}
