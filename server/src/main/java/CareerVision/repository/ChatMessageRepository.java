package CareerVision.repository;

import CareerVision.model.ChatMessage;
import CareerVision.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    // Find all messages for a specific user ordered by creation time
    List<ChatMessage> findByUserOrderByCreatedAtAsc(User user);
    
    // Find messages by conversation ID
    List<ChatMessage> findByConversationIdOrderByCreatedAtAsc(String conversationId);
    
    // Find recent messages for a user (paginated)
    Page<ChatMessage> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    
    // Find messages by user and date range
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.user = :user AND cm.createdAt BETWEEN :startDate AND :endDate ORDER BY cm.createdAt ASC")
    List<ChatMessage> findByUserAndDateRange(@Param("user") User user, 
                                           @Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);
    
    // Find all conversation IDs for a user
    @Query("SELECT DISTINCT cm.conversationId FROM ChatMessage cm WHERE cm.user = :user ORDER BY MAX(cm.createdAt) DESC")
    List<String> findConversationIdsByUser(@Param("user") User user);
    
    // Count total messages for a user
    long countByUser(User user);
    
    // Find messages by message type
    List<ChatMessage> findByUserAndMessageTypeOrderByCreatedAtDesc(User user, ChatMessage.MessageType messageType);
    
    // Search messages by content
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.user = :user AND (LOWER(cm.userMessage) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(cm.botResponse) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) ORDER BY cm.createdAt DESC")
    List<ChatMessage> searchMessagesByContent(@Param("user") User user, @Param("searchTerm") String searchTerm);
}
