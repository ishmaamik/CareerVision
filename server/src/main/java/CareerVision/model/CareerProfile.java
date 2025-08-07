package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "career_profiles")
public class CareerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String careerTitle;

    @Column(length = 1000)
    private String summary;

    @Column(length = 5000)
    private String detailedDescription;

    @ElementCollection
    @CollectionTable(name = "career_interest_tags", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "tag")
    private List<String> interestTags;

    @ElementCollection
    @CollectionTable(name = "career_subdomains", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "sub_domain")
    private List<String> subDomains;

    @Column(length = 2000)
    private String benefits;

    @Column(length = 2000)
    private String idealCandidates;

    @Column(length = 2000)
    private String unsuitableFor;

    @Column(length = 2000)
    private String futureOpportunities;

    @ElementCollection
    @CollectionTable(name = "career_subjects", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "subject")
    private List<String> recommendedSubjects;

    @ElementCollection
    @CollectionTable(name = "career_majors", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "major")
    private List<String> universityMajors;

    @ElementCollection
    @CollectionTable(name = "career_roles", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "job_title")
    private List<String> jobTitles;

    @ElementCollection
    @CollectionTable(name = "career_industries", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "industry")
    private List<String> industries;

    @ElementCollection
    @CollectionTable(name = "career_resources", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "resource")
    private List<String> recommendedResources;
}
