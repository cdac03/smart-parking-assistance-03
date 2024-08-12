import React from "react";

const Footer = ({ onSave }) => {
  return (
    <div className="footer mt-auto flex justify-center items-center p-[10px_20px] bg-gray-800 text-white">
      <div
        className="save flex items-center bg-gray-600 text-white rounded p-[5px_10px] cursor-pointer transition duration-300 ease-in-out "
        onClick={onSave} // Call onSave when clicked
      >
        <span>Save & Pay</span>
        <i className="fas fa-save ml-2.5"></i>
      </div>
    </div>
  );
};

export default Footer;
