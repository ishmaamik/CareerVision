package CareerVision.repository;

import CareerVision.model.Social;
import CareerVision.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialRepository extends JpaRepository<Social, Long> {
    List<Social> findByPostedBy(User user);
}
