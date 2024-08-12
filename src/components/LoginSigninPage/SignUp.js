import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavbarHome from "./../HomePage/NavbarHome";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
    vehiclePlateNumber: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await axios.post(
        "http://192.168.5.119:8080/api/users/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          contactNo: parseInt(formData.contactNumber, 10), // Keep this for contact number
          vehiclePlateNumber: formData.vehiclePlateNumber, // Keep this as a string
        }
      );

      setSuccessMessage("User registered successfully!"); // Set success message

      setTimeout(() => {
        setLoading(false); // Stop loading before redirect
        navigate("/signin"); // Redirect after a few seconds
      }, 2000); // Adjust the timeout duration (2000ms = 2 seconds)

    } catch (error) {
      console.error("There was an error!", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <>
      <NavbarHome />
      <section className="h-screen flex flex-col md:flex-row justify-center items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img src={logo} alt="Smart Parking" className="w-full" />
        </div>
        <form
          className="md:w-1/3 max-w-sm flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <label className="text-lg font-bold">Sign Up</label>
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="number"
            placeholder="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Vehicle Plate Number"
            name="vehiclePlateNumber"
            value={formData.vehiclePlateNumber}
            onChange={handleChange}
            required
          />
          <div className="text-center mt-4">
            <button
              className="bg-[#1f2937] hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider flex items-center justify-center"
              type="submit"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" /> // Loading spinner icon
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline hover:underline-offset-4"
            >
              Sign In
            </Link>
          </div>
        </form>

        {/* Success message display */}
        {successMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
            {successMessage}
          </div>
        )}
      </section>
    </>
  );
};

export default SignUp;
