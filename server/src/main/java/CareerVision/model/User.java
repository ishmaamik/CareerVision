package CareerVision.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String name;

    @Column(unique = true, nullable=true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = true)
    private String role;
    //registered, recruiter, admin

    @Column(nullable = true)
    private String resumePath;

    @Column(nullable = true)
    private String profilePictureUrl;

    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private Float lat;

    @Column(nullable = true)
    private Float lon;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private CVData cvData;

}
