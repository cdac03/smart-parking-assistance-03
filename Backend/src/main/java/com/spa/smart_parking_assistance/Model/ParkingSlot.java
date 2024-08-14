package com.spa.smart_parking_assistance.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String timeSlot;

    @Column(nullable = false)
    private Integer hours;

    @Column(nullable = false)
    private String vehicleType;

    @Column(nullable = false)
    private String slot;

    // Constructors
    public ParkingSlot() {
    }

    public ParkingSlot(User user, String timeSlot, Integer hours, String vehicleType, String slot) {
        this.user = user;
        this.timeSlot = timeSlot;
        this.hours = hours;
        this.vehicleType = vehicleType;
        this.slot = slot;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    @Override
    public String toString() {
        return "ParkingSlot{" +
                "id=" + id +
                ", user=" + user +
                ", timeSlot='" + timeSlot + '\'' +
                ", hours=" + hours +
                ", vehicleType='" + vehicleType + '\'' +
                ", slot='" + slot + '\'' +
                '}';
    }
}
