import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Grid from "./Grid";
import Footer from "./Footer";
import Modal from "../PaymentModal/Modal";
import NavbarHome from "../HomePage/NavbarHome";

const SlotsLayout = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://192.168.5.119:8080/api/slots/all");
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots", error);
      }
    };

    fetchSlots();
  }, []);

  const handleSave = () => {
    setIsModalOpen(true); // Open the modal on save
  };

  const handleAccept = async () => {
    const userId = parseInt(localStorage.getItem("userId"), 10);

    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      // Save the parking slot first
      await axios.post("http://192.168.5.119:8080/api/slots/book", {
        user: { id: userId },
        slotName: activeItem,
        status: "OCCUPIED",
      });

      // Update the slot status locally
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.slotName === activeItem
            ? { ...slot, status: "OCCUPIED" }
            : slot
        )
      );

      // Process the payment after saving the parking slot
      const paymentResponse = await axios.get(
        `http://192.168.5.119:8080/api/slots/process-payment/${userId}`
      );

      if (paymentResponse.status === 200) {
        // Redirect to the ticket page if the payment is successful
        window.location.href = "/ticket";
      } else {
        alert("Failed to process payment.");
      }
    } catch (error) {
      alert(
        `Failed to save data. ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 mt-[-16px]">
        <div className="flex-grow flex flex-col bg-white">
          <Header
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            hours={hours}
            setHours={setHours}
            vehicle={vehicle}
            handleButtonClick={setVehicle}
          />
          <Grid
            vehicle={vehicle}
            activeItem={activeItem}
            handleGridItemClick={setActiveItem}
            slots={slots}
          />
          <Footer onSave={handleSave} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAccept={handleAccept}
        />
      </div>
    </>
  );
};

export default SlotsLayout;