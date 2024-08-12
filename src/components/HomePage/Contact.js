// Contact.js FIle

import React from 'react';
import NavbarHome from './NavbarHome';
import ContactImg from '../../assets/contactImg.png';

const Contact = () => {
  return (
    <>
      <NavbarHome />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
        {/* Left Container with Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4 hidden md:block">
          <img 
            src={ContactImg} 
            alt="Contact Illustration"
            className="w-full h-auto max-w-sm md:max-w-full"
          />
        </div>
        {/* Right Container with Contact Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl my-3 font-semibold text-center text-gray-800">Contact Us</h2>
          <p className="text-center my-1 text-gray-600 mb-4">We'd love to hear from you! Please fill out the form below.</p>
          <form className="space-y-4 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-[#1f2937] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
