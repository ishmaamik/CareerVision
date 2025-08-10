package CareerVision.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1200)
    private String overview;
    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private Float lat;

    @Column(nullable = true)
    private Float lon;
    @Column(length = 1200)
    private String commitment;
}