package com.ewaste.ewaste_backend.controller;

import com.ewaste.ewaste_backend.model.PickupRequest;
import com.ewaste.ewaste_backend.model.User;
import com.ewaste.ewaste_backend.repository.PickupRequestRepository;
import com.ewaste.ewaste_backend.repository.UserRepository;
import com.ewaste.ewaste_backend.util.TableCreator;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/razorpay")
@CrossOrigin
public class RazorpayController {

    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @Autowired
    private PickupRequestRepository pickupRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TableCreator tableCreator;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/create-order")
    public String createOrder(@RequestBody Map<String, Object> data) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKey, razorpaySecret);
            int amount = 4000;
            if (data.containsKey("amount")) {
                amount = Integer.parseInt(data.get("amount").toString());
            }

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

            Order order = razorpay.orders.create(orderRequest);
            return order.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Order creation failed.\"}";
        }
    }

    @Transactional
    @PostMapping("/success")
    public String paymentSuccess(@RequestBody PickupRequest request) {
        try {
            request.setStatus("Pending");

            pickupRequestRepository.save(request);

            Long userId = Long.parseLong(request.getUserId());
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                tableCreator.createUserHistoryTable(user.getId(), user.getFullname());
                String tableName = tableCreator.getTableName(user.getId(), user.getFullname());

                String sql = "INSERT INTO " + tableName +
                        " (address, city, date, email, phone, pincode, scheduler_name, state, status, time, user_id, weight) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                jdbcTemplate.update(sql,
                        request.getAddress(),
                        request.getCity(),
                        request.getDate(),
                        request.getEmail(),
                        request.getPhone(),
                        request.getPincode(),
                        request.getSchedulerName(),
                        request.getState(),
                        "Pending",
                        request.getTime(),
                        request.getUserId(),
                        request.getWeight());
            }

            return "{\"status\": \"success\"}";

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}";
        }
    }
}
