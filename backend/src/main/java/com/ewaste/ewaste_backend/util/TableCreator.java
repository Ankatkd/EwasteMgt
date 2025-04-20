package com.ewaste.ewaste_backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class TableCreator {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createUserHistoryTable(Long userId, String fullName) {
        String sanitized = fullName.trim().replaceAll("[^a-zA-Z0-9]", "_");
        String tableName = "history_" + userId + "_" + sanitized;

        String sql = "CREATE TABLE IF NOT EXISTS " + tableName + " (" +
                "id SERIAL PRIMARY KEY," +
                "date VARCHAR(50)," +
                "time VARCHAR(50)," +
                "address TEXT," +
                "pincode VARCHAR(10)," +
                "city VARCHAR(100)," +
                "state VARCHAR(100)," +
                "scheduler_name VARCHAR(100)," +
                "phone VARCHAR(20)," +
                "email VARCHAR(100)," +
                "weight VARCHAR(10)," +
                "status VARCHAR(20)," +
                "user_id VARCHAR(50)" +
                ")";
        jdbcTemplate.execute(sql);
    }

    public String getTableName(Long userId, String fullName) {
        return "history_" + userId + "_" + fullName.trim().replaceAll("[^a-zA-Z0-9]", "_");
    }
}
