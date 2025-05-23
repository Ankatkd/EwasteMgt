package com.ewaste.ewaste_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // 🔥 disables CSRF for testing
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // allows all endpoints
            );

        return http.build();
    }
}
