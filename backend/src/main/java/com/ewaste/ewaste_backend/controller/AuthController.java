package com.ewaste.ewaste_backend.controller;
import java.util.Map;

import com.ewaste.ewaste_backend.model.User;
import com.ewaste.ewaste_backend.repository.UserRepository;
import com.ewaste.ewaste_backend.util.TableCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TableCreator tableCreator;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
    Optional<User> userOptional = userRepository.findById(id);
    return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        tableCreator.createUserHistoryTable(savedUser.getId(), savedUser.getFullname());
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String identifier = payload.get("identifier");
        String password = payload.get("password");
    
        Optional<User> userOpt;
    
        if (identifier.contains("@")) {
            userOpt = userRepository.findByEmail(identifier);
        } else {
            userOpt = userRepository.findByPhone(identifier);
        }
    
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return ResponseEntity.ok(new LoginResponse("Login successful", user.getId()));
            } else {
                return ResponseEntity.status(401).body(new LoginResponse("Invalid password", null));
            }
        } else {
            return ResponseEntity.status(404).body(new LoginResponse("User not found", null));
        }
    }

    // Helper class
    static class LoginResponse {
        public String message;
        public Long userId;

        public LoginResponse(String message, Long userId) {
            this.message = message;
            this.userId = userId;
        }
    }
}
