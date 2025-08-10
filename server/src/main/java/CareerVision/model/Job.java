package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1200)
    private String description;
    private String company;

    @Column(nullable = true)
    private String location;

    @Column(length = 1200)
    private String responsibilities;
    @Column(length = 1200)
    private List<String> skills;
    @Column(length = 1200)
    private String qualifications;

}

