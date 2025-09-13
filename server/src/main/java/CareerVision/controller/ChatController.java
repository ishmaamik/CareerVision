package CareerVision.controller;

import CareerVision.model.ChatMessage;
import CareerVision.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    
    @Autowired
    private ChatService chatService;
    
    @PostMapping("/message")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessageRequest request) {
        try {
            logger.info("Received chat message from user: {}", request.getUserId());
            
            ChatMessage response = chatService.sendMessage(
                request.getUserId(), 
                request.getMessage(), 
                request.getConversationId()
            );
            
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("id", response.getId());
            responseMap.put("userMessage", response.getUserMessage());
            responseMap.put("botResponse", response.getBotResponse());
            responseMap.put("conversationId", response.getConversationId());
            responseMap.put("timestamp", response.getCreatedAt());
            responseMap.put("messageType", response.getMessageType());
            responseMap.put("status", "success");
            
            return ResponseEntity.ok(responseMap);
            
        } catch (Exception e) {
            logger.error("Error processing chat message: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to process your message. Please try again.");
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/history/{userId}")
    public ResponseEntity<?> getChatHistory(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "50") int limit) {
        try {
            List<ChatMessage> history = chatService.getChatHistory(userId, limit);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("messages", history);
            response.put("totalCount", chatService.getMessageCount(userId));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching chat history: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch chat history");
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<?> getConversation(@PathVariable String conversationId) {
        try {
            List<ChatMessage> conversation = chatService.getConversation(conversationId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("messages", conversation);
            response.put("conversationId", conversationId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching conversation: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch conversation");
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/conversations/{userId}")
    public ResponseEntity<?> getUserConversations(@PathVariable Long userId) {
        try {
            List<String> conversations = chatService.getUserConversations(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("conversations", conversations);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching user conversations: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch conversations");
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/search/{userId}")
    public ResponseEntity<?> searchMessages(
            @PathVariable Long userId,
            @RequestParam String query) {
        try {
            List<ChatMessage> results = chatService.searchMessages(userId, query);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("results", results);
            response.put("query", query);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error searching messages: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to search messages");
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping("/stats/{userId}")
    public ResponseEntity<?> getChatStats(@PathVariable Long userId) {
        try {
            long messageCount = chatService.getMessageCount(userId);
            List<String> conversations = chatService.getUserConversations(userId);
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalMessages", messageCount);
            stats.put("totalConversations", conversations.size());
            stats.put("averageMessagesPerConversation", 
                     conversations.size() > 0 ? (double) messageCount / conversations.size() : 0);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("stats", stats);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error fetching chat stats: ", e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch chat statistics");
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Request DTO
    public static class ChatMessageRequest {
        private Long userId;
        private String message;
        private String conversationId;
        
        // Getters and setters
        public Long getUserId() {
            return userId;
        }
        
        public void setUserId(Long userId) {
            this.userId = userId;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
        
        public String getConversationId() {
            return conversationId;
        }
        
        public void setConversationId(String conversationId) {
            this.conversationId = conversationId;
        }
    }
}
