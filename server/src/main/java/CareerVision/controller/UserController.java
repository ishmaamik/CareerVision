package CareerVision.controller;

import CareerVision.model.User;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("user"); // default
        userRepository.save(user);
        return "Signup successful";
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
