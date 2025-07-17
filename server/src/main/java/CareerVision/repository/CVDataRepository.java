package CareerVision.repository;

import CareerVision.model.CVData;
import CareerVision.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CVDataRepository extends JpaRepository<CVData, Long> {
    Optional<CVData> findByUser(User user);
}
