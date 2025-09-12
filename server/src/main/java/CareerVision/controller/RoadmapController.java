package CareerVision.controller;

import CareerVision.dto.RoadmapRequest;
import CareerVision.dto.RoadmapResponse;
import CareerVision.model.Roadmap;
import CareerVision.service.RoadmapService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "*")
public class RoadmapController {
    private static final Logger logger = LoggerFactory.getLogger(RoadmapController.class);

    @Autowired
    private RoadmapService roadmapService;

    @PostMapping("/generate")
    public ResponseEntity<RoadmapResponse> generateRoadmap(@RequestBody RoadmapRequest request) {
        try {
            // Log incoming request details
            logger.info("Received roadmap generation request");
            logger.debug("Request details: {}", request);

            // Validate required fields
            if (request.getUserId() == null) {
                logger.error("User ID is null");
                return ResponseEntity.badRequest()
                    .body(new RoadmapResponse(false, "User ID is required", "INVALID_USER_ID"));
            }

            // Validate primary goal
            if (request.getPrimaryGoal() == null || request.getPrimaryGoal().trim().isEmpty()) {
                logger.error("Primary goal is missing");
                return ResponseEntity.badRequest()
                    .body(new RoadmapResponse(false, "Primary goal is required", "INVALID_PRIMARY_GOAL"));
            }

            // Generate roadmap
            Roadmap roadmap = roadmapService.generateRoadmap(request);

            // Log successful roadmap generation
            logger.info("Successfully generated roadmap for user: {}", request.getUserId());
            logger.debug("Generated Roadmap Content: {}", roadmap.getGeneratedRoadmap());

            // Check if roadmap content is meaningful
            if (roadmap.getGeneratedRoadmap() == null || 
                roadmap.getGeneratedRoadmap().trim().isEmpty() || 
                roadmap.getGeneratedRoadmap().toLowerCase().contains("placeholder")) {
                logger.error("Roadmap generation failed: Received placeholder or empty content");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RoadmapResponse(false, "Failed to generate meaningful roadmap", "PLACEHOLDER_CONTENT"));
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RoadmapResponse(true, roadmap));
        } catch (Exception e) {
            // Log the full error
            logger.error("Error generating roadmap", e);

            // Return a detailed error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RoadmapResponse(
                        false, 
                        "Failed to generate roadmap", 
                        e.getMessage() != null ? e.getMessage() : "Unknown error occurred"
                    ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Roadmap>> getRoadmapsByUser(@PathVariable Long userId) {
        try {
            logger.info("Fetching roadmaps for user: {}", userId);
            List<Roadmap> roadmaps = roadmapService.getRoadmapsByUserId(userId);
            return ResponseEntity.ok(roadmaps);
        } catch (Exception e) {
            logger.error("Error fetching roadmaps for user: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> getRoadmapById(@PathVariable Long id) {
        try {
            logger.info("Fetching roadmap by ID: {}", id);
            Roadmap roadmap = roadmapService.getRoadmapById(id);
            return ResponseEntity.ok(roadmap);
        } catch (Exception e) {
            logger.error("Error fetching roadmap with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}