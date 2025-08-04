package CareerVision.controller;

import CareerVision.model.Social;
import CareerVision.model.User;
import CareerVision.repository.SocialRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/post")
public class SocialController {

    @Autowired
    SocialRepository social;

    @Autowired
    UserRepository user;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPost(@RequestBody Social socialPost){
        try{
            Social s= social.save(socialPost);
            return ResponseEntity.ok(s);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPostsOfUser(@PathVariable Long userId){
        try{
            Optional<User> s= user.findById(userId);
            if (s.isPresent()) {
                List<Social> userPosts = social.findByPostedBy(s.get());
                return ResponseEntity.ok(userPosts);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        }
        catch(Exception e){
           return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }




}
