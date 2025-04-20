package com.ewaste.ewaste_backend.repository;

import com.ewaste.ewaste_backend.model.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    // You can add custom query methods here if needed
}
