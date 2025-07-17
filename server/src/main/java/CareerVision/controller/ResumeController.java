package CareerVision.controller;

import CareerVision.model.CVData;
import CareerVision.model.User;
import CareerVision.repository.CVDataRepository;
import CareerVision.repository.UserRepository;
import CareerVision.service.PDFExtractorService;
import CareerVision.service.SupabaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVDataRepository cvDataRepository;

    @Autowired
    private PDFExtractorService pdfExtractorService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {

        try {
            // Validate user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "File is empty"
                ));
            }

            if (!"application/pdf".equals(file.getContentType())) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Only PDF files allowed"
                ));
            }

            // Generate unique filename
            String fileName = "resume_" + userId + "_" + System.currentTimeMillis() + ".pdf";

            // Upload to Supabase
            String fileUrl = SupabaseStorageService.uploadFile(
                    file.getBytes(),
                    fileName,
                    file.getContentType()
            );

            // Save URL to user profile
            user.setResumePath(fileUrl);
            userRepository.save(user);

            // Extract and save text
            String extractedText = pdfExtractorService.extractTextFromUrl(fileUrl);
            saveCVData(user, extractedText);

            return ResponseEntity.ok().body(Map.of(
                    "status", "success",
                    "message", "Resume uploaded and processed successfully",
                    "url", fileUrl,
                    "fileName", fileName
            ));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Upload failed",
                    "error", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Processing failed",
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getResumeUrl(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    if (user.getResumePath() == null || user.getResumePath().isEmpty()) {
                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "No resume uploaded",
                                "hasResume", false
                        ));
                    }
                    return ResponseEntity.ok().body(Map.of(
                            "status", "success",
                            "resumeUrl", user.getResumePath(),
                            "downloadUrl", user.getResumePath() + "?download=true",
                            "hasResume", true
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "User not found"
                )));
    }

    @GetMapping("/extract/{userId}")
    public ResponseEntity<?> extractResumeText(@PathVariable Long userId) {
        return userRepository.findById(userId).map(user -> {
            if (user.getResumePath() == null || user.getResumePath().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "No resume uploaded for this user"
                ));
            }

            Optional<CVData> cvDataOpt = cvDataRepository.findByUser(user);
            if (cvDataOpt.isPresent()) {
                return ResponseEntity.ok(Map.of(
                        "status", "success",
                        "text", cvDataOpt.get().getExtractedText(),
                        "source", "database"
                ));
            }

            try {
                String extractedText = pdfExtractorService.extractTextFromUrl(user.getResumePath());
                saveCVData(user, extractedText);
                return ResponseEntity.ok(Map.of(
                        "status", "success",
                        "text", extractedText,
                        "source", "new-extraction"
                ));
            } catch (Exception e) {
                return ResponseEntity.internalServerError().body(Map.of(
                        "status", "error",
                        "message", "Failed to extract text",
                        "error", e.getMessage()
                ));
            }

        }).orElse(ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "User not found"
        )));
    }

    private void saveCVData(User user, String extractedText) {
        CVData cvData = cvDataRepository.findByUser(user)
                .orElse(new CVData());
        cvData.setUser(user);
        cvData.setExtractedText(extractedText);
        cvDataRepository.save(cvData);
    }
}