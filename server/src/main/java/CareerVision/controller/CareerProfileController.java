package CareerVision.controller;

import CareerVision.model.CareerProfile;
import CareerVision.repository.CareerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/careers")
@RequiredArgsConstructor
public class CareerProfileController {

    private final CareerProfileRepository repository;

    // ✅ Create
    @PostMapping
    public ResponseEntity<String> createCareer(@RequestBody CareerProfile careerProfile) {
        repository.save(careerProfile);
        return ResponseEntity.ok("Career profile saved successfully!");
    }

    // ✅ Read All
    @GetMapping
    public ResponseEntity<List<CareerProfile>> getAllCareers() {
        return ResponseEntity.ok(repository.findAll());
    }

    // ✅ Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<CareerProfile> getCareerById(@PathVariable Long id) {
        Optional<CareerProfile> career = repository.findById(id);
        return career.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCareer(@PathVariable Long id, @RequestBody CareerProfile updated) {
        return repository.findById(id).map(existing -> {
            updated.setId(id); // ensure ID consistency
            repository.save(updated);
            return ResponseEntity.ok("Career profile updated successfully!");
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCareer(@PathVariable Long id) {
        return repository.findById(id).map(existing -> {
            repository.deleteById(id);
            return ResponseEntity.ok("Career profile deleted successfully!");
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
