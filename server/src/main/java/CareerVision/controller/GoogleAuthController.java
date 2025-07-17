package CareerVision.controller;

import CareerVision.model.User;
import CareerVision.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/google-auth")
@CrossOrigin(origins = "*")
public class GoogleAuthController {

    private final UserRepository userRepository;

    private final String CLIENT_ID = "15095246296-lln11og32vlfg2tdej9majpql2iqsfum.apps.googleusercontent.com";

    @Autowired
    public GoogleAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Object googleLogin(@RequestBody String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");

                Optional<User> existingUser = userRepository.findByEmail(email);

                User user;
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                    user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    user.setRole("user");
                    user.setPassword("google-auth");
                    userRepository.save(user);
                }

                user.setPassword(null);
                return user;
            } else {
                return "Invalid ID token";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Google login failed: " + e.getMessage();
        }
    }
}
