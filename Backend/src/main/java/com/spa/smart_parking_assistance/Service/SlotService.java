package com.spa.smart_parking_assistance.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spa.smart_parking_assistance.Model.Slot;
import com.spa.smart_parking_assistance.Repository.SlotRepository;

import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    /**
     * Retrieves all slots from the repository.
     * @return List of all slots
     */
    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    /**
     * Retrieves available (empty) slots from the repository.
     * @return List of available slots
     */
    public List<Slot> getAvailableSlots() {
        return slotRepository.findByStatus(Slot.Status.EMPTY);
    }

    /**
     * Books a slot by updating its status.
     * @param slotName The name of the slot to book
     * @param status The new status for the slot (should be OCCUPIED)
     * @return The updated Slot if successful, null if the slot is already occupied or not found
     */
    public Slot bookSlot(String slotName, Slot.Status status) {
        // Find the slot by name
        Slot slot = slotRepository.findBySlotName(slotName);

        if (slot == null) {
            // Slot not found
            return null;
        }

        // Check if the slot is already occupied
        if (slot.getStatus() == Slot.Status.OCCUPIED) {
            return null;
        }

        // Update slot status to occupied
        slot.setStatus(status);

        // Save the updated slot
        return slotRepository.save(slot);
    }

    /**
     * Processes payment for a given user.
     * @param userId The ID of the user making the payment
     * @return true if the payment was successful, false otherwise
     */
    public boolean processPayment(Long userId) {
        // Implement your payment processing logic here.
        // For example, this could involve interacting with a payment gateway or service.
        // Return true if the payment was successful, otherwise return false.

        // Placeholder implementation:
        try {
            // Example payment processing logic
            // TODO: Replace with actual payment processing code
            // Simulate payment processing for the sake of example
            System.out.println("Processing payment for user: " + userId);
            return true; // Return true if payment is successful
        } catch (Exception e) {
            // Log and handle the exception
            e.printStackTrace();
            return false; // Return false if payment fails
        }
    }
}
