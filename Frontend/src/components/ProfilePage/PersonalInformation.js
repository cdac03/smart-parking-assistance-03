import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../HomePage/NavbarHome";

const PersonalInformation = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    password: "",
    vehiclePlate: "",
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
  );
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://192.168.5.119:8080/api/users/${userId}`
        );

        setFormData({
          name: `${response.data.firstName} ${response.data.lastName}`,
          address: response.data.address,
          contactNumber: response.data.contactNo,
          email: response.data.email,
          password: response.data.password || "", // Ensure password is set
          vehiclePlate: response.data.vehiclePlateNumber,
        });
        setOriginalData({
          name: `${response.data.firstName} ${response.data.lastName}`,
          address: response.data.address,
          contactNumber: response.data.contactNo,
          email: response.data.email,
          password: response.data.password || "", // Ensure password is set
          vehiclePlate: response.data.vehiclePlateNumber,
        });

        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setOriginalData({ ...formData });
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const payload = {
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ")[1],
        address: formData.address,
        contactNo: parseInt(formData.contactNumber, 10),
        password: formData.password, // Send updated password
        vehiclePlateNumber: formData.vehiclePlate,
        // Email is not included in the payload
      };

      await axios.put(`http://192.168.5.119:8080/api/users/${userId}`, payload);

      setEditing(false);
      setNotification("Changes saved successfully!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification("Failed to save changes. Please try again.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleCancelClick = () => {
    setFormData({ ...originalData });
    setEditing(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
          `http://192.168.5.119:8080/api/users/${userId}/upload-image`,
          formData
        );
        setProfileImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setNotification("Failed to upload image. Please try again.");
        setTimeout(() => setNotification(""), 3000);
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    navigate("/"); // Redirect to the sign out or login page
  };

  return (
    <>
      <NavbarHome />
      <div className="w-4/5 max-w-screen-lg p-5 m-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center border-b pb-3">
          <h1 className="text-xl font-bold">Your Account</h1>
          <div>
            <button
              onClick={handleEditClick}
              className="bg-[#1f2937] text-white py-2 px-4 rounded hover:bg-[#0f172a] mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleSignOut}
              className="bg-[#1f2937] text-white py-2 px-4 rounded hover:bg-[#0f172a]"
            >
              Sign out
            </button>
          </div>
        </header>

        {notification && (
          <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
            {notification}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start mt-5">
          <div className="flex flex-col items-center p-5">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
                title="Change profile picture"
              />
            </div>
            <div className="w-48 text-center">
              <h2 className="text-lg truncate">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
            </div>
          </div>

          <div className="mt-5 pt-5">
            <h2 className="text-lg mb-3 font-bold">Personal information</h2>
            <p className="mb-5">
              Manage your personal information, including phone numbers and
              email addresses where you can be contacted.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "name",
                "address",
                "contactNumber",
                "email", // Include the email field in the map
                "password",
                "vehiclePlate",
              ].map((field, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-5 border border-gray-300 rounded relative text-left"
                >
                  <h3 className="text-md font-semibold capitalize">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  {field === "email" ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      readOnly
                      className="mt-2 w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
                      title="Email cannot be edited"
                    />
                  ) : editing ? (
                    <div>
                      <input
                        type={field === "password" ? "text" : "text"} // Show password as text when editing
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                      />
                      {field === "password" && (
                        <p className="text-gray-500 text-sm mt-1">
                          {formData.password === originalData.password
                            ? ""
                            : "Password will be updated."}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p>
                      {field === "password"
                        ? "*".repeat(formData[field].length)
                        : formData[field]}
                    </p>
                  )}
                </div>
              ))}

              {editing && (
                <div className="flex justify-end mt-4 col-span-2">
                  <button
                    onClick={handleSaveClick}
                    className="bg-[#1f2937] text-white py-1 px-3 rounded hover:bg-[#0f172a] mr-2"
                    title="Save changes"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                    title="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
