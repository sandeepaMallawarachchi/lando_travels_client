import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiX } from "react-icons/hi";
import type { AdminDetails } from "../../types/AdminDetails";

interface EditProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  adminDetails: AdminDetails;
  onSave: (updatedData: AdminDetails) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ isOpen, onClose, adminDetails, onSave }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (adminDetails) {
      setEmail(adminDetails.email || "");
      setPhone(adminDetails.phone || "");
      setAddress(adminDetails.address || "");
    }
  }, [adminDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://lando-travels-api.vercel.app/admin/update/${adminDetails.adminID}`,
        { email, phone, address }
      );

      if (response.status === 200) {
        alert("Admin updated successfully");
        onSave(response.data.admin);
        onClose();
      } else {
        alert("Failed to update admin");
      }
    } catch (error: any) {
      console.error("Error updating admin:", error.message);
      alert("Error updating admin");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <HiX className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Edit Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Edit Phone
            </label>
            <input
              id="phone"
              type="text"
              placeholder="+94 xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Edit Address
            </label>
            <textarea
              id="address"
              placeholder="No 123"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;