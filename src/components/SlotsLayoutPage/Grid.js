import React from "react";

const Grid = ({ vehicle, activeItem, handleGridItemClick }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 flex-grow overflow-auto bg-white">
      {Array.from({ length: 24 }, (_, index) => (
        <div
          key={index}
          className={`flex items-center justify-center p-4 border border-dotted cursor-pointer transition-colors duration-300 flex-1 min-w-[100px]
            ${
              vehicle
                ? activeItem === `A${index + 1}`
                  ? "bg-[#6482AD] border-gray-300"
                  : "bg-gray-400 border-gray-300 hover:bg-gray-500"
                : "bg-gray-400 border-gray-300 cursor-not-allowed rounded"
            }`}
          onClick={() => vehicle && handleGridItemClick(`A${index + 1}`)}
        >
          <div className="flex items-center justify-center text-lg">
            {vehicle === "car" && <i className="fas fa-car mr-2"></i>}
            {vehicle === "bike" && <i className="fas fa-motorcycle mr-2"></i>}
            <span>{`A${index + 1}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
