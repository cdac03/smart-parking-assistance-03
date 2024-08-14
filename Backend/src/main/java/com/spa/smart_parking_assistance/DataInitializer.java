package com.spa.smart_parking_assistance;

import com.spa.smart_parking_assistance.Model.Slot;
import com.spa.smart_parking_assistance.Repository.SlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(SlotRepository slotRepository) {
        return args -> {
            for (int i = 1; i <= 24; i++) {
                String slotName = "a" + i;
                if (slotRepository.findBySlotName(slotName) == null) {
                    Slot slot = new Slot();
                    slot.setSlotName(slotName);
                    slot.setStatus(Slot.Status.EMPTY);
                    slotRepository.save(slot);
                }
            }
        };
    }
}
