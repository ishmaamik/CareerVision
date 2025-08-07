package CareerVision.repository;

import CareerVision.model.CareerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerProfileRepository extends JpaRepository<CareerProfile, Long> {

    // Find all career profiles that contain at least one matching interest tag
    List<CareerProfile> findByInterestTagsIn(List<String> interestTags);

    // Find by title
    CareerProfile findByCareerTitle(String careerTitle);
}
