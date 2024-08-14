package com.spa.smart_parking_assistance.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.spa.smart_parking_assistance.Model.Slot;

import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByStatus(Slot.Status status);

    Slot findBySlotName(String slotName);
}
