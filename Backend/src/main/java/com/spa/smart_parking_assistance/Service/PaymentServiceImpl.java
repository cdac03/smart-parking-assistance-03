package com.spa.smart_parking_assistance.Service;

import com.spa.smart_parking_assistance.Model.Payment;
import com.spa.smart_parking_assistance.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentServiceImpl {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment getPaymentDetails(Long userId) {
        // Fetch the most recent payment details from the repository
        Optional<Payment> payment = paymentRepository.findFirstByUserIdOrderByIdDesc(userId);
        return payment.orElse(null); // Return null if no payment found
    }
}
