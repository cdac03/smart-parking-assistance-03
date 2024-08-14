package com.spa.smart_parking_assistance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spa.smart_parking_assistance.Model.ParkingSlot;
import com.spa.smart_parking_assistance.Model.User;

import java.util.Optional;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    // Custom query method to find the most recent ParkingSlot by userId
	Optional<ParkingSlot> findFirstByUserOrderByIdDesc(User user);

}
