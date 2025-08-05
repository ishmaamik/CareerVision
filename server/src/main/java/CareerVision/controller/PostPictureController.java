// ProfilePictureController.java
package CareerVision.controller;

import CareerVision.model.Social;
import CareerVision.model.User;
import CareerVision.repository.SocialRepository;
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
@RequestMapping("/api/post-picture")
public class PostPictureController {

    @Autowired
    private SocialRepository socialRepository;

    @Autowired
    private SupabaseStorageService supabaseStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPostPicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("postId") Long postId) { // Now expects postId

        try {
            // Verify the post exists
            Social post = socialRepository.findById(postId)
                    .orElseThrow(() -> new IllegalArgumentException("Post not found"));

            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "File is empty"
                ));
            }

            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Only image files allowed"
                ));
            }

            // Generate filename with post ID
            String fileName = "post_" + postId + "_" + System.currentTimeMillis() + getFileExtension(file.getContentType());

            // Upload to Supabase
            String fileUrl = SupabaseStorageService.uploadPostPhoto(
                    file.getBytes(),
                    fileName,
                    file.getContentType()
            );

            // Update the post with image URL
            post.setImageUrl(fileUrl);
            socialRepository.save(post);

            return ResponseEntity.ok().body(Map.of(
                    "status", "success",
                    "message", "Post picture uploaded successfully",
                    "url", fileUrl
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Processing failed: " + e.getMessage()
            ));
        }
    }

    // Add this endpoint to update post image
    @PatchMapping("/{postId}/image")
    public ResponseEntity<?> updatePostImage(
            @PathVariable Long postId,
            @RequestBody Map<String, String> request) {

        Social post = socialRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        post.setImageUrl(request.get("imageUrl"));
        socialRepository.save(post);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getImageUrl(@PathVariable Long userId) {
        return socialRepository.findById(userId)
                .map(social -> {
                    if (social.getImageUrl() == null || social.getImageUrl().isEmpty()) {
                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "No profile picture uploaded",
                                "hasProfilePicture", false
                        ));
                    }
                    return ResponseEntity.ok().body(Map.of(
                            "status", "success",
                            "profilePictureUrl", social.getImageUrl(),
                            "hasProfilePicture", true
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "User not found"
                )));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> deleteProfilePicture(@PathVariable Long postId) {
        return socialRepository.findById(postId)
                .map(social -> {
                    if (social.getImageUrl() == null) {
                        return ResponseEntity.ok().body(Map.of(
                                "status", "success",
                                "message", "No profile picture to delete"
                        ));
                    }
                    try {
                        // Delete from Supabase
                        String fileName = social.getImageUrl()
                                .substring(social.getImageUrl().lastIndexOf("/") + 1);
                        SupabaseStorageService.deleteProfilePicture(fileName);
                        // Update user record
                        social.setImageUrl(null);
                        socialRepository.save(social);
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