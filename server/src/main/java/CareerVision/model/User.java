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

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role;
    //registered, recruiter, admin

    private String resumePath;

    @Column(nullable = true)
    private String profilePictureUrl;

    private String location;

    private Float lat;

    private Float lon;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private CVData cvData;

}
