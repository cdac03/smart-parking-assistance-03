package com.spa.smart_parking_assistance.Controller;

import java.time.LocalDateTime;

public class SlotBookingRequest {
    private String slotName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Getters and setters
    public String getSlotName() {
        return slotName;
    }

    public void setSlotName(String slotName) {
        this.slotName = slotName;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}
