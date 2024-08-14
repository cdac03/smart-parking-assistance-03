import React from "react";
import { Link } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import CarParking from "../../assets/Home.jpg";

const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-fixed font-roboto"
      style={{ backgroundImage: `url(${CarParking})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Navbar Component */}
      <NavbarHome />

      {/* Main Content */}
      <div className="relative z-10 text-center mt-12">
        {/* Highlighted Text */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-200 mb-20 leading-tight">
          <span className="block text-custom-red">Book Your</span>
          <span className="block text-custom-red">Parking Slot</span>
        </h1>

        {/* Large Button */}
        <Link
          to="/slots-layout"
          className="bg-[#2f4a73] text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:bg-[#1f2937] transition duration-300"
        >
          Reserve Now
        </Link>

        {/* Sliding Text */}
        <div className="mt-48 sm:mt-24">
          <div className="overflow-hidden relative h-24">
            <div className="animate-slide absolute whitespace-nowrap flex space-x-8">
              <span className=" font-semibold text-lg text-gray-300">
                Are you tired of finding the right spot for your vehicle?
              </span>
              <span className="font-semibold text-lg text-gray-300">
                Need a hassle-free parking solution?
              </span>
              <span className="font-semibold text-lg text-gray-300">
                Discover our easy parking options today!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
