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

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class SocialController {

    @Autowired
    private SocialRepository socialRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupabaseStorageService supabaseStorageService;

    // Create a new post (with or without image)
    @PostMapping
    public ResponseEntity<?> createPost(
            @RequestPart("postData") Social postData,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            // Save the post first
            Social createdPost = socialRepository.save(postData);

            // If there's an image, handle it
            if (file != null && !file.isEmpty()) {
                String imageUrl = handleImageUpload(file, createdPost.getId());
                createdPost.setImageUrl(imageUrl);
                socialRepository.save(createdPost);
            }

            return ResponseEntity.ok(createdPost);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    // Get all posts for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPostsByUser(@PathVariable Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                List<Social> userPosts = socialRepository.findByPostedBy(user.get());
                return ResponseEntity.ok(userPosts);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    // Helper method for image upload
    private String handleImageUpload(MultipartFile file, Long postId) throws Exception {
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only image files allowed");
        }

        String fileName = "post_" + postId + "_" + System.currentTimeMillis() +
                getFileExtension(file.getContentType());

        return supabaseStorageService.uploadPostPhoto(
                file.getBytes(),
                fileName,
                file.getContentType()
        );
    }

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