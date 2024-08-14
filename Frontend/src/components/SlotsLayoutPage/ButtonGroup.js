import React from "react";

const ButtonGroup = ({ vehicle, handleButtonClick }) => {
  return (
    <div className="flex p-4 border-gray-300">
      <button
        className={`btn mr-2 p-3 flex items-center cursor-pointer text-white rounded transition-colors duration-300 ${
          vehicle === "car" ? "bg-[#6482AD]" : "bg-gray-600"
        }`}
        onClick={() => handleButtonClick("car")}
      >
        <i className="fas fa-car mr-2"></i>
        <span>CAR</span>
      </button>
      <button
        className={`btn p-3 flex items-center cursor-pointer text-white rounded transition-colors duration-300 ${
          vehicle === "bike" ? "bg-[#6482AD]" : "bg-gray-600"
        }`}
        onClick={() => handleButtonClick("bike")}
      >
        <i className="fas fa-motorcycle mr-2"></i>
        <span>BIKE</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
