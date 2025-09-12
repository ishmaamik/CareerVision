package CareerVision.controller;

import CareerVision.dto.RoadmapRequest;
import CareerVision.dto.RoadmapResponse;
import CareerVision.model.Roadmap;
import CareerVision.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "*")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @PostMapping("/generate")
    public ResponseEntity<RoadmapResponse> generateRoadmap(@RequestBody RoadmapRequest request) {
        try {
            Roadmap roadmap = roadmapService.generateRoadmap(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RoadmapResponse(true, roadmap));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RoadmapResponse(false, "Failed to generate roadmap", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Roadmap>> getRoadmapsByUser(@PathVariable Long userId) {
        try {
            List<Roadmap> roadmaps = roadmapService.getRoadmapsByUserId(userId);
            return ResponseEntity.ok(roadmaps);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> getRoadmapById(@PathVariable Long id) {
        try {
            Roadmap roadmap = roadmapService.getRoadmapById(id);
            return ResponseEntity.ok(roadmap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}