package CareerVision.service;

import CareerVision.model.ChatMessage;
import CareerVision.model.User;
import CareerVision.repository.ChatMessageRepository;
import CareerVision.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ChatService {
    
    private static final Logger logger = LoggerFactory.getLogger(ChatService.class);
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GeminiService geminiService;
    
    public ChatMessage sendMessage(Long userId, String message, String conversationId) {
        logger.info("Processing chat message for user: {}", userId);
        
        try {
            // Find user
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new RuntimeException("User not found with id: " + userId);
            }
            
            User user = userOpt.get();
            
            // Generate conversation ID if not provided
            if (conversationId == null || conversationId.isEmpty()) {
                conversationId = generateConversationId();
            }
            
            // Get user context for better responses
            String userContext = buildUserContext(user);
            
            // Get AI response from Gemini
            String botResponse = geminiService.generateCareerAdvice(message, userContext);
            
            // Save the chat message
            ChatMessage chatMessage = new ChatMessage(user, message, botResponse, conversationId);
            chatMessage.setMessageType(determineMessageType(message));
            
            ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
            logger.info("Chat message saved with ID: {}", savedMessage.getId());
            
            return savedMessage;
            
        } catch (Exception e) {
            logger.error("Error processing chat message: ", e);
            throw new RuntimeException("Failed to process chat message: " + e.getMessage());
        }
    }
    
    public List<ChatMessage> getChatHistory(Long userId, int limit) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        Pageable pageable = PageRequest.of(0, limit);
        Page<ChatMessage> messages = chatMessageRepository.findByUserOrderByCreatedAtDesc(userOpt.get(), pageable);
        
        // Reverse the list to show chronological order
        List<ChatMessage> result = messages.getContent();
        java.util.Collections.reverse(result);
        
        return result;
    }
    
    public List<ChatMessage> getConversation(String conversationId) {
        return chatMessageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
    
    public List<String> getUserConversations(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return chatMessageRepository.findConversationIdsByUser(userOpt.get());
    }
    
    public List<ChatMessage> searchMessages(Long userId, String searchTerm) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return chatMessageRepository.searchMessagesByContent(userOpt.get(), searchTerm);
    }
    
    public long getMessageCount(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return 0;
        }
        
        return chatMessageRepository.countByUser(userOpt.get());
    }
    
    private String generateConversationId() {
        return "conv_" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }
    
    private String buildUserContext(User user) {
        StringBuilder context = new StringBuilder();
        
        if (user.getName() != null) {
            context.append("Name: ").append(user.getName()).append(". ");
        }
        
        if (user.getEmail() != null) {
            context.append("Email: ").append(user.getEmail()).append(". ");
        }
        
        context.append("This user is seeking career guidance.");
        
        return context.toString();
    }
    
    private ChatMessage.MessageType determineMessageType(String message) {
        String lowerMessage = message.toLowerCase();
        
        if (lowerMessage.contains("interview") || lowerMessage.contains("interview preparation")) {
            return ChatMessage.MessageType.INTERVIEW_PREP;
        } else if (lowerMessage.contains("resume") || lowerMessage.contains("cv")) {
            return ChatMessage.MessageType.RESUME_HELP;
        } else if (lowerMessage.contains("job search") || lowerMessage.contains("finding job")) {
            return ChatMessage.MessageType.JOB_SEARCH;
        } else if (lowerMessage.contains("skill") || lowerMessage.contains("learn") || lowerMessage.contains("training")) {
            return ChatMessage.MessageType.SKILL_DEVELOPMENT;
        } else if (lowerMessage.contains("career")) {
            return ChatMessage.MessageType.CAREER_ADVICE;
        } else {
            return ChatMessage.MessageType.GENERAL;
        }
    }
}
