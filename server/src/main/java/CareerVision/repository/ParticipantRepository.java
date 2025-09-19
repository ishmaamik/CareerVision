package CareerVision.repository;

import CareerVision.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    // Find participants by event ID
    List<Participant> findByEventId(Long eventId);

    // Find participants by user ID
    List<Participant> findByUserId(Long userId);

    // Find a specific participant by event and user
    @Query("SELECT p FROM Participant p WHERE p.event.id = :eventId AND p.user.id = :userId")
    Optional<Participant> findByEventIdAndUserId(
        @Param("eventId") Long eventId, 
        @Param("userId") Long userId
    );

    // Count participants for a specific event
    long countByEventId(Long eventId);

    // Find participants with a specific registration status
    List<Participant> findByStatus(Participant.RegistrationStatus status);
}
