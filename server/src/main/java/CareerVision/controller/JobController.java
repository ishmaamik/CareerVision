package CareerVision.controller;

import CareerVision.model.Job;
import CareerVision.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/create")
    public String createJob(@RequestBody Job job) {
        jobRepository.save(job);
        return "Job posted successfully";
    }

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/by/{email}")
    public List<Job> getJobsByRecruiter(@PathVariable String email) {
        return jobRepository.findByPostedBy(email);
    }
}
