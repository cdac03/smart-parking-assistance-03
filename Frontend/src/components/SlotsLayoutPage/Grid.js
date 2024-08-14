import React from "react";

const Grid = ({ vehicle, activeItem, handleGridItemClick, slots }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 flex-grow overflow-auto bg-white">
      {slots.map((slot, index) => (
        <div
          key={slot.slotName}
          className={`flex items-center justify-center p-4 border border-dotted cursor-pointer transition-colors duration-300 flex-1 min-w-[100px]
            ${
              vehicle
                ? activeItem === slot.slotName
                  ? "bg-[#06D001] border-gray-300"
                  : slot.status === "OCCUPIED"
                  ? "bg-black border-gray-300"
                  : "bg-gray-400 border-gray-300 hover:bg-gray-500"
                : "bg-gray-400 border-gray-300 cursor-not-allowed rounded"
            }`}
          onClick={() => vehicle && slot.status !== "OCCUPIED" && handleGridItemClick(slot.slotName)}
        >
          <div className="flex items-center justify-center text-lg">
            {vehicle === "car" && <i className="fas fa-car mr-2"></i>}
            {vehicle === "bike" && <i className="fas fa-motorcycle mr-2"></i>}
            <span>{slot.slotName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;