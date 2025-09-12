package CareerVision.repository;

import CareerVision.model.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByUserId(Long userId);

    @Query("SELECT r FROM Roadmap r JOIN FETCH r.languages WHERE r.user.id = :userId")
    List<Roadmap> findByUserIdWithLanguages(@Param("userId") Long userId);

    @Query("SELECT r FROM Roadmap r JOIN FETCH r.languages WHERE r.id = :id")
    Optional<Roadmap> findByIdWithLanguages(@Param("id") Long id);
}