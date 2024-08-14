package com.spa.smart_parking_assistance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.spa.smart_parking_assistance.Model.Payment;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Custom method to find the most recent payment by user ID
    Optional<Payment> findFirstByUserIdOrderByIdDesc(Long userId);
}
