import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, onAccept }) => {
  const navigate = useNavigate();

  const handleAcceptClick = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      // User is not logged in, notify them and redirect to home page
      alert("Please log in to proceed.");
      navigate("/signin", { replace: true });
      return;
    }

    try {
      // Call the accept handler
      await onAccept();

      // Redirect to the ticket page after processing payment
      navigate("/ticket", { replace: true });
    } catch (error) {
      console.error("Error during acceptance or redirection:", error);
      // Optionally handle errors (e.g., show an error message)
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Payment to Book Your Slot
              </h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={onClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAcceptClick}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={onClose}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
