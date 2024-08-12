
import React, { useEffect, useState } from "react";
import ParkingImage from "../../assets/Parking.png";
import QRCode from "qrcode.react";
import axios from "axios";
import NavbarHome from "../HomePage/NavbarHome";

const TicketPage = () => {
  const [ticketData, setTicketData] = useState({
    time: "",
    hours: "",
    slot: "",
    vehicleType: "",
    amount: "",
    token: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is not available in localStorage");
        }
        const response = await axios.get(
          `http://192.168.5.119:8080/api/parking-slots/tickets/${userId}`
        );

        console.log("API Response:", response.data);

        // Map the ticket data
        setTicketData({
          time: response.data.timeSlot || "",
          hours: response.data.hours || "",
          slot: response.data.slot || "",
          vehicleType: response.data.vehicleType || "",
          amount: response.data.amount || "",
          token: response.data.token || "",
        });
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchTicketData();
  }, []);

  const qrCodeValue = `https://example.com/booking/${ticketData.token}`;

  return (
    <>
    <NavbarHome />
    <div className="flex flex-col md:flex-row h-screen text-[#403533]">
      <div className="flex-1 hidden md:flex items-center justify-center">
        <img
          src={ParkingImage}
          alt="Parking Ticket"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="bg-[#E2DAD6] p-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="text-center">
            <p className="mb-4 text-2xl font-bold text-[#403533]">THANK YOU!</p>
            <div className="p-4 rounded-lg my-5 flex justify-center items-center">
              <QRCode
                value={qrCodeValue}
                size={150}
                className="w-full h-full max-w-[150px] max-h-[150px]"
              />
            </div>
            <p className="font-bold my-2 text-[#403533]">
              Date: {getCurrentDate()}
            </p>
            <div className="my-1">
              <p>Time Slot: {ticketData.time}</p>
              <p>Duration: {ticketData.hours} hours</p>
              <p>Slot: {ticketData.slot}</p>
              <p>Vehicle Type: {ticketData.vehicleType}</p>
            </div>
            <p className="font-bold my-2 text-[#403533]">
              Amount: Rs. {ticketData.amount}
            </p>
            <p className="mt-5 text-2xl text-[#403533]">
              Token: {ticketData.token}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TicketPage;