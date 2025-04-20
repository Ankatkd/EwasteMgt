package com.ewaste.ewaste_backend.controller;

import com.ewaste.ewaste_backend.model.User;
import com.ewaste.ewaste_backend.repository.UserRepository;
import com.ewaste.ewaste_backend.util.TableCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TableCreator tableCreator;

    @GetMapping("/profile/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @PutMapping("/user/update")
    public String updateUser(@RequestBody User user) {
        Optional<User> existing = userRepository.findById(user.getId());
        if (existing.isPresent()) {
            userRepository.save(user);
            return "Profile updated successfully!";
        }
        return "User not found!";
    }

    @GetMapping("/pickups/{id}")
    public List<Map<String, Object>> getPickupHistory(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) return Collections.emptyList();

        String tableName = tableCreator.getTableName(user.get().getId(), user.get().getFullname());

        try {
            return jdbcTemplate.queryForList("SELECT * FROM " + tableName);
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
