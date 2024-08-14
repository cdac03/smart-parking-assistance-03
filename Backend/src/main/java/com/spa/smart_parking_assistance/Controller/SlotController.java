package com.spa.smart_parking_assistance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spa.smart_parking_assistance.Model.Slot;
import com.spa.smart_parking_assistance.Service.SlotService;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {

    @Autowired
    private SlotService slotService;

    @GetMapping("/all")
    public ResponseEntity<List<Slot>> getAllSlots() {
        try {
            List<Slot> slots = slotService.getAllSlots();
            return ResponseEntity.ok(slots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<Slot>> getAvailableSlots() {
        try {
            List<Slot> slots = slotService.getAvailableSlots();
            return ResponseEntity.ok(slots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    @PostMapping("/book")
    public ResponseEntity<String> bookSlot(@RequestBody SlotBookingRequest request) {
        try {
            Slot.Status status;

            try {
                status = Slot.Status.valueOf(request.getStatus().toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                     .body("Invalid status value");
            }

            // Book the slot and update status
            Slot bookedSlot = slotService.bookSlot(request.getSlotName(), status);

            if (bookedSlot != null) {
                return ResponseEntity.ok("Slot booked successfully");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                                     .body("Slot is already occupied or not available");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Invalid input or error occurred");
        }
    }

    @GetMapping("/process-payment/{userId}")
    public ResponseEntity<String> processPayment(@PathVariable Long userId) {
        try {
            // Implement payment processing logic here
            boolean paymentSuccessful = slotService.processPayment(userId);

            if (paymentSuccessful) {
                return ResponseEntity.ok("Payment processed successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                     .body("Failed to process payment");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error occurred while processing payment");
        }
    }

    public static class SlotBookingRequest {
        private String slotName;
        private String status; // Add status field

        // Getters and setters
        public String getSlotName() {
            return slotName;
        }

        public void setSlotName(String slotName) {
            this.slotName = slotName;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
