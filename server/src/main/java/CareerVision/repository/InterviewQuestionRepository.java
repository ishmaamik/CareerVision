package CareerVision.repository;

import CareerVision.model.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findByCompanyIgnoreCase(String company);
    List<InterviewQuestion> findByRoleIgnoreCase(String role);
    List<InterviewQuestion> findByCategoryIgnoreCase(String category);
}
