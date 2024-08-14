package com.spa.smart_parking_assistance.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spa.smart_parking_assistance.Model.Payment;
import com.spa.smart_parking_assistance.Model.ParkingSlot;
import com.spa.smart_parking_assistance.Model.User;
import com.spa.smart_parking_assistance.Repository.PaymentRepository;
import com.spa.smart_parking_assistance.Repository.ParkingSlotRepository;
import com.spa.smart_parking_assistance.Repository.UserRepository;

import java.util.Optional;
import java.util.Random;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository parkingSlotRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public ParkingSlotService(ParkingSlotRepository parkingSlotRepository, UserRepository userRepository, PaymentRepository paymentRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }

    public ParkingSlot saveParkingSlot(ParkingSlot parkingSlot) {
        return parkingSlotRepository.save(parkingSlot);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUserDetails(Long userId, User updatedUser) {
        User existingUser = findUserById(userId);
        if (existingUser != null) {
            if (!existingUser.getEmail().equals(updatedUser.getEmail())) {
                throw new IllegalArgumentException("Email cannot be updated.");
            }
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setContactNo(updatedUser.getContactNo());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setVehiclePlateNumber(updatedUser.getVehiclePlateNumber());
            return userRepository.save(existingUser);
        }
        return null;
    }

    public Payment processPayment(Long userId) {
        User user = findUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found for ID: " + userId);
        }

        Optional<ParkingSlot> parkingSlotOpt = parkingSlotRepository.findFirstByUserOrderByIdDesc(user);
        if (parkingSlotOpt.isEmpty()) {
            throw new RuntimeException("No parking slot found for user ID: " + userId);
        }

        ParkingSlot parkingSlot = parkingSlotOpt.get();
        double amount = parkingSlot.getHours() * 50.0; 
        String token = generateToken(parkingSlot.getSlot());

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setParkingSlot(parkingSlot);
        payment.setToken(token);
        payment.setAmount(amount);

        return paymentRepository.save(payment);
    }

    public Payment findLatestPaymentByUserId(Long userId) {
        return paymentRepository.findFirstByUserIdOrderByIdDesc(userId).orElse(null);
    }

    public Payment findPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    private String generateToken(String slot) {
        Random random = new Random();
        int randomNumber = 1000 + random.nextInt(9000); 
        return slot + randomNumber; 
    }
}
