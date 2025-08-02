package CareerVision.controller;

import CareerVision.dto.JobDTO;
import CareerVision.model.Job;
import CareerVision.repository.JobRepository;
import CareerVision.service.JobSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobSearchService jobSearchService;

    @PostMapping("/create")
    public String createJob(@RequestBody Job job) {
        jobRepository.save(job);
        return "Job posted successfully";
    }

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobByID(@PathVariable Long id) {
        try {
            Optional<Job> job = jobRepository.findById(id);
            return ResponseEntity.ok(job);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body("Error: "+e.getMessage());
        }
    }

//    @GetMapping("/by/{email}")
//    public List<Job> getJobsByRecruiter(@PathVariable String email) {
//        return jobRepository.findByPostedBy(email);
//    }

    // return list of DTOs from Adzuna API
    @GetMapping("/external")
    public List<JobDTO> getExternalJobs(@RequestParam String keyword, @RequestParam String location) {
        return jobSearchService.searchJobs(keyword, location);
    }
}
