// NavbarHome.js File

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavbarHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    console.log("Sign out button clicked");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="p-3 mb-3 border-b border-gray-200 bg-white relative pl-10 sm:pl-3 md:pl-3">
      <div className="container mx-auto flex items-center justify-between">
        <button
          className="lg:hidden absolute left-3 flex items-center text-gray-900 hover:text-gray-700"
          onClick={toggleMenu}
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
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <Link
          to="/"
          className="flex items-center text-gray-900 hover:text-gray-700"
        >
          <img src={logo} alt="Logo" className="w-20 h-10" />
        </Link>

        <ul className="hidden lg:flex lg:space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-2 py-1"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-2 py-1"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 px-2 py-1"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center text-gray-900 hover:text-gray-700"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="User"
                  width="32"
                  height="32"
                  className="rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-lg z-30">
                  <Link className="block px-4 py-2 hover:bg-gray-100" to="/pid">
                    Profile
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 p-4 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-20`}
      >
        <button
          className="absolute top-4 right-4 text-gray-900 hover:text-gray-700"
          onClick={toggleMenu}
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
        <ul className="flex flex-col space-y-4 mt-10">
          <li>
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavbarHome;
