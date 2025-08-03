// ProfilePictureController.java
package CareerVision.controller;

import CareerVision.model.User;
import CareerVision.repository.UserRepository;
import CareerVision.service.SupabaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile-picture")
@CrossOrigin(origins = "*")
public class ProfilePictureController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupabaseStorageService supabaseStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {

        try {
            // Validate user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Validate file
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "File is empty"
                ));
            }

            // Check if it's an image
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Only image files allowed"
                ));
            }

            // Generate unique filename
            String fileName = "profile_" + userId + "_" + System.currentTimeMillis() +
                    getFileExtension(contentType);

            // Upload to Supabase (use a different bucket)
            String fileUrl = supabaseStorageService.uploadProfilePicture(
                    file.getBytes(),
                    fileName,
                    contentType
            );

            // Delete old profile picture if exists
            if (user.getProfilePictureUrl() != null) {
                try {
                    String oldFileName = user.getProfilePictureUrl()
                            .substring(user.getProfilePictureUrl().lastIndexOf("/") + 1);
                    supabaseStorageService.deleteProfilePicture(oldFileName);
                } catch (Exception e) {
                    // Log but don't fail the operation
                    System.err.println("Failed to delete old profile picture: " + e.getMessage());
                }
            }

            // Save URL to user profile
            user.setProfilePictureUrl(fileUrl);
            userRepository.save(user);

            return ResponseEntity.ok().body(Map.of(
                    "status", "success",
                    "message", "Profile picture uploaded successfully",
                    "url", fileUrl
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
    public ResponseEntity<?> getProfilePictureUrl(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    String profilePictureUrl = user.getProfilePictureUrl();
                    
                    // Check if profile picture URL is null or empty
                    if (profilePictureUrl == null || profilePictureUrl.trim().isEmpty()) {
                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "No profile picture uploaded",
                                "hasProfilePicture", false,
                                "profilePictureUrl", null
                        ));
                    }
                    
                    return ResponseEntity.ok().body(Map.of(
                            "status", "success",
                            "profilePictureUrl", profilePictureUrl,
                            "hasProfilePicture", true
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "User not found"
                )));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteProfilePicture(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    if (user.getProfilePictureUrl() == null) {
                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "No profile picture to delete"
                        ));
                    }

                    try {
                        // Delete from Supabase
                        String fileName = user.getProfilePictureUrl()
                                .substring(user.getProfilePictureUrl().lastIndexOf("/") + 1);
                        supabaseStorageService.deleteProfilePicture(fileName);

                        // Update user record
                        user.setProfilePictureUrl(null);
                        userRepository.save(user);

                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "Profile picture deleted successfully"
                        ));
                    } catch (Exception e) {
                        return ResponseEntity.internalServerError().body(Map.of(
                                "status", "error",
                                "message", "Failed to delete profile picture",
                                "error", e.getMessage()
                        ));
                    }
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "User not found"
                )));
    }

    // Helper method to get file extension
    private String getFileExtension(String contentType) {
        switch (contentType) {
            case "image/jpeg":
                return ".jpg";
            case "image/png":
                return ".png";
            case "image/gif":
                return ".gif";
            default:
                return ".jpg"; // default to jpg
        }
    }
}