package CareerVision.controller;

import CareerVision.model.InterviewQuestion;
import CareerVision.repository.InterviewQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class InterviewQuestionController {

    @Autowired
    private InterviewQuestionRepository interviewQuestionRepository;

    // 🔹 Upload a question
    @PostMapping("/upload")
    public ResponseEntity<?> uploadQuestion(@RequestBody InterviewQuestion question) {
        interviewQuestionRepository.save(question);
        return ResponseEntity.ok("Question uploaded successfully.");
    }

    // 🔹 Get all questions
    @GetMapping("/all")
    public ResponseEntity<?> getAllQuestions() {
        List<InterviewQuestion> questions = interviewQuestionRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    // 🔹 Get questions by company
    @GetMapping("/company/{company}")
    public ResponseEntity<?> getQuestionsByCompany(@PathVariable String company) {
        List<InterviewQuestion> questions = interviewQuestionRepository.findByCompanyIgnoreCase(company);
        return ResponseEntity.ok(questions);
    }

    // 🔹 Get questions by role
    @GetMapping("/role/{role}")
    public ResponseEntity<?> getQuestionsByRole(@PathVariable String role) {
        List<InterviewQuestion> questions = interviewQuestionRepository.findByRoleIgnoreCase(role);
        return ResponseEntity.ok(questions);
    }

    // 🔹 Get questions by category
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getQuestionsByCategory(@PathVariable String category) {
        List<InterviewQuestion> questions = interviewQuestionRepository.findByCategoryIgnoreCase(category);
        return ResponseEntity.ok(questions);
    }
}
