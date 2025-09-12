package CareerVision.repository;

import CareerVision.model.Company;
import CareerVision.model.InterviewQuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionBankRepository extends JpaRepository<InterviewQuestionBank, Long> {
    // Find questions by company
    List<InterviewQuestionBank> findByCompany(Company company);

    // Find questions by difficulty
    List<InterviewQuestionBank> findByDifficulty(String difficulty);

    // Find questions by category
    List<InterviewQuestionBank> findByCategory(String category);

    // Find questions by company and category
    List<InterviewQuestionBank> findByCompanyAndCategory(Company company, String category);

    // Custom query to find top-rated questions
    @Query("SELECT q FROM InterviewQuestionBank q ORDER BY (q.upvotes - q.downvotes) DESC")
    List<InterviewQuestionBank> findTopRatedQuestions();

    // Find questions submitted by a user
    List<InterviewQuestionBank> findBySubmittedBy(String submittedBy);
}
