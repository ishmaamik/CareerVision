package CareerVision.controller;

import CareerVision.model.User;
import CareerVision.repository.UserRepository;
import CareerVision.service.PDFExtractorService;
import CareerVision.service.SupabaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private UserRepository userRepository;

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
                return ResponseEntity.badRequest().body("File is empty");
            }

            if (!"application/pdf".equals(file.getContentType())) {
                return ResponseEntity.badRequest().body("Only PDF files allowed");
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

            return ResponseEntity.ok().body(Map.of(
                    "status", "success",
                    "message", "Resume uploaded successfully",
                    "url", fileUrl,
                    "fileName", fileName
            ));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Upload failed",
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getResumeUrl(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok().body(Map.of(
                        "status", "success",
                        "resumeUrl", user.getResumePath()
                )))
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "User not found"
                )));
    }

    @Autowired
    private PDFExtractorService pdfExtractorService;

    @GetMapping("/extract/{userId}")
    public ResponseEntity<?> extractResumeText(@PathVariable Long userId) {
        return userRepository.findById(userId).map(user -> {
            String fileUrl = user.getResumePath();
            if (fileUrl == null || fileUrl.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "No resume uploaded for this user"
                ));
            }

            try {
                String extractedText = pdfExtractorService.extractTextFromUrl(fileUrl);
                return ResponseEntity.ok(Map.of(
                        "status", "success",
                        "text", extractedText
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

}