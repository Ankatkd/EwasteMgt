package com.ewaste.ewaste_backend.repository;

import com.ewaste.ewaste_backend.model.UserProfileData;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileDataRepository extends JpaRepository<UserProfileData, Long> {
    List<UserProfileData> findByUserId(Long userId);
}
