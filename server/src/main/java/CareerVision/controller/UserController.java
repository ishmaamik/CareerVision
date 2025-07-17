package CareerVision.controller;

import CareerVision.model.User;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 🟡 User Registration
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already in use";
        }

        String role = user.getRole();
        if (role == null || role.isEmpty()) {
            user.setRole("user");
            //default set user
        } else {
            if (!List.of("user", "recruiter", "admin").contains(role.toLowerCase())) {
                return "Error: Invalid role";
            }
            user.setRole(role.toLowerCase());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Signup successful";
    }


    //it filters users by role
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole().equalsIgnoreCase(role))
                .peek(user -> user.setPassword(null)) // hide password
                .toList();
    }


    // 🔐 User Login
    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                        user.setPassword(null); // it wont expose tha password
                        return user;
                    } else {
                        return "Error: Invalid password";
                    }
                })
                .orElse("Error: User not found");
    }

}
