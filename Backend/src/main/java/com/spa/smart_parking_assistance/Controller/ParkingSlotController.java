package com.spa.smart_parking_assistance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spa.smart_parking_assistance.Model.ParkingSlot;
import com.spa.smart_parking_assistance.Model.Payment;
import com.spa.smart_parking_assistance.Model.User;
import com.spa.smart_parking_assistance.Service.ParkingSlotService;

import java.util.Map;

@RestController
@RequestMapping("/api/parking-slots")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    @Autowired
    public ParkingSlotController(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    @PostMapping
    public ResponseEntity<?> saveParkingSlot(@RequestBody ParkingSlot parkingSlot) {
        if (parkingSlot.getUser() == null || parkingSlot.getUser().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID cannot be null");
        }

        User user = parkingSlotService.findUserById(parkingSlot.getUser().getId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        parkingSlot.setUser(user);
        ParkingSlot savedParkingSlot = parkingSlotService.saveParkingSlot(parkingSlot);
        return ResponseEntity.ok(savedParkingSlot);
    }

    @PutMapping("/update-user/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        try {
            User user = parkingSlotService.updateUserDetails(userId, updatedUser);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
    }

    @GetMapping("/process-payment/{userId}")
    public ResponseEntity<?> processPayment(@PathVariable Long userId) {
        try {
            Payment payment = parkingSlotService.processPayment(userId);
            if (payment == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No parking slot found for the user");
            }
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment: " + e.getMessage());
        }
    }

    @GetMapping("/tickets/{userId}")
    public ResponseEntity<?> getTicket(@PathVariable Long userId) {
        try {
            Payment payment = parkingSlotService.findLatestPaymentByUserId(userId);
            if (payment == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
            }

            ParkingSlot parkingSlot = payment.getParkingSlot();
            if (parkingSlot == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parking slot details not found");
            }

            Map<String, Object> ticketDetails = Map.of(
                "timeSlot", parkingSlot.getTimeSlot(),
                "hours", parkingSlot.getHours(),
                "slot", parkingSlot.getSlot(),
                "vehicleType", parkingSlot.getVehicleType(),
                "amount", payment.getAmount(),
                "token", payment.getToken()
            );

            return ResponseEntity.ok(ticketDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving ticket: " + e.getMessage());
        }
    }
}
