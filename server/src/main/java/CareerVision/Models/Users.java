package CareerVision.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
