import React from "react";
import ButtonGroup from "./ButtonGroup";

const Header = ({ timeSlot, setTimeSlot, hours, setHours, vehicle, handleButtonClick }) => {
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${ampm}`;
  });

  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setHours(value);
    }
  };

  return (
    <div className="header flex flex-col sm:flex-row justify-between items-center border-b p-2 border-[#ccc] bg-gray-800 sm:px-0 sm:p-0">
      {/* Time Slot on the left */}
      <div className="time-slot flex items-center mb-2 sm:mb-0 m">
        <label htmlFor="time-slot" className="text-sm sm:text-base text-slate-100">Time Slot</label>
        <select
          className="ml-2.5 p-1 border border-[#ccc] rounded bg-white text-sm sm:text-base"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          {timeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* ButtonGroup centered */}
      <div className="flex justify-center w-full sm:w-auto mb-2 sm:mb-0">
        <ButtonGroup vehicle={vehicle} handleButtonClick={handleButtonClick} />
      </div>

      {/* Hours on the right */}
      <div className="hours flex items-center">
        <label htmlFor="hours" className="text-sm sm:text-base text-slate-100">Hours</label>
        <input
          className="ml-2.5 p-1 border border-[#ccc] rounded w-[60px] bg-white text-sm sm:text-base"
          type="number"
          value={hours}
          onChange={handleHoursChange}
        />
      </div>
    </div>
  );
};

export default Header;
