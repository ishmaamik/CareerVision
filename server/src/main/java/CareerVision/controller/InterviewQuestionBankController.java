package CareerVision.controller;

import CareerVision.model.Company;
import CareerVision.model.InterviewQuestionBank;
import CareerVision.repository.CompanyRepository;
import CareerVision.repository.InterviewQuestionBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/interview-questions")
public class InterviewQuestionBankController {

    @Autowired
    private InterviewQuestionBankRepository questionBankRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // Upload PDF resource for interview questions
    @PostMapping("/upload-pdf/{companyId}")
    public ResponseEntity<String> uploadPDF(
        @PathVariable Long companyId, 
        @RequestParam("file") MultipartFile file,
        @RequestParam("questionId") Long questionId
    ) {
        try {
            // Validate company
            Optional<Company> company = companyRepository.findById(companyId);
            if (company.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid Company");
            }

            // Validate question
            Optional<InterviewQuestionBank> question = questionBankRepository.findById(questionId);
            if (question.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid Question");
            }

            // Generate unique filename
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/interview-pdfs");
            
            // Create directory if not exists
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            // Save file
            Path filePath = uploadDir.resolve(filename);
            Files.write(filePath, file.getBytes());

            // Update question with PDF URL
            InterviewQuestionBank updatedQuestion = question.get();
            updatedQuestion.setPdfResourceUrl("/uploads/interview-pdfs/" + filename);
            questionBankRepository.save(updatedQuestion);

            return ResponseEntity.ok("PDF uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to upload PDF: " + e.getMessage());
        }
    }

    // Add new interview question
    @PostMapping("/add/{companyId}")
    public ResponseEntity<InterviewQuestionBank> addInterviewQuestion(
        @PathVariable Long companyId,
        @RequestBody InterviewQuestionBank questionBank
    ) {
        // Validate company
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Set company and timestamp
        questionBank.setCompany(company.get());
        questionBank.setSubmittedAt(LocalDateTime.now());

        // Save question
        InterviewQuestionBank savedQuestion = questionBankRepository.save(questionBank);
        return ResponseEntity.ok(savedQuestion);
    }

    // Get interview questions for a specific company
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<InterviewQuestionBank>> getCompanyInterviewQuestions(
        @PathVariable Long companyId,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String difficulty
    ) {
        // Validate company
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Fetch questions based on optional filters
        List<InterviewQuestionBank> questions;
        if (category != null && difficulty != null) {
            questions = questionBankRepository.findByCompanyAndCategory(company.get(), category);
        } else if (category != null) {
            questions = questionBankRepository.findByCategory(category);
        } else if (difficulty != null) {
            questions = questionBankRepository.findByDifficulty(difficulty);
        } else {
            questions = questionBankRepository.findByCompany(company.get());
        }

        return ResponseEntity.ok(questions);
    }

    // Upvote/Downvote a question
    @PostMapping("/vote/{questionId}")
    public ResponseEntity<InterviewQuestionBank> voteQuestion(
        @PathVariable Long questionId,
        @RequestParam String voteType
    ) {
        Optional<InterviewQuestionBank> questionOpt = questionBankRepository.findById(questionId);
        
        if (questionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        InterviewQuestionBank question = questionOpt.get();
        
        if ("upvote".equals(voteType)) {
            question.setUpvotes(question.getUpvotes() + 1);
        } else if ("downvote".equals(voteType)) {
            question.setDownvotes(question.getDownvotes() + 1);
        } else {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(questionBankRepository.save(question));
    }

    // Get top-rated questions
    @GetMapping("/top-rated")
    public ResponseEntity<List<InterviewQuestionBank>> getTopRatedQuestions() {
        List<InterviewQuestionBank> topQuestions = questionBankRepository.findTopRatedQuestions();
        return ResponseEntity.ok(topQuestions);
    }
}
