import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProfilePopup from "./EditProfilePopup";
import AdminPasswordReset from "./AdminPasswordReset";
import {
  FaUserPlus,
  FaUsers,
  FaNewspaper,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { AdminDetails } from "../../types/AdminDetails";
import OnlineUsers from "./OnlineUsers";

const AdminDashboard: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    adminID: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const adminID = localStorage.getItem("adminID");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [onlineUserGraph, setOnlineUserGraph] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `https://lando-travels-api.vercel.app/admin/getAdmin/${adminID}`
        );
        setAdminDetails(res.data);
      } catch (err: any) {
        console.error("Error fetching admin details:", err.message);
      } finally {
        setLoading(false)
      }
    };
    fetchAdminDetails();

    const fetchTotalUsers = async () => {
      setLoading(true)
      try {
        const res = await axios.get("https://lando-travels-api.vercel.app/admin/getAll");
        setTotalUsers(res.data.length);
      } catch (err: any) {
        console.error("Error fetching total users:", err.message);
      } finally {
        setLoading(false)
      }
    };
    fetchTotalUsers();

    const fetchTotalPosts = async () => {
      setLoading(true)
      try {
        const res = await axios.get("https://lando-travels-api.vercel.app/admin/getcards");
        setTotalPosts(res.data.length);
      } catch (err: any) {
        console.error("Error fetching total posts:", err.message);
      } finally {
        setLoading(false)
      }
    };
    fetchTotalPosts();
  }, [adminID]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const res = await fetch("https://lando-travels-api.vercel.app/admin/online-users");
        const data = await res.json();
        setOnlineUsers(data.count);

        setOnlineUserGraph((prev) => {
          const newPoint = { time: new Date().toLocaleTimeString(), value: data.count };
          return [...prev.slice(-4), newPoint];
        });
      } catch (err) {
        console.error("Error fetching online users:", err);
      }
    };

    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEditProfileClick = () => setIsEditProfileOpen(true);
  const handlePasswordResetClick = () => setIsPasswordResetOpen(true);
  const handleClosePopup = () => {
    setIsEditProfileOpen(false);
    setIsPasswordResetOpen(false);
  };
  const handleSaveProfile = (updatedData: Partial<AdminDetails>) => {
    setAdminDetails((prev) => ({ ...prev, ...updatedData }));
  };

  const quickNavigate = (path: string) => navigate(path);

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {/* Profile Skeleton */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-48 h-4 bg-gray-200 rounded" />
          <div className="w-36 h-4 bg-gray-200 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>

        {/* Quick Access Skeleton */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <div className="w-32 h-6 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-14 h-14 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>

        {/* Summary Skeleton */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <div className="w-32 h-6 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-20 bg-gray-200 rounded-xl" />
            <div className="w-full h-20 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 flex sm:flex-row flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="sm:w-2/3 w-full">
        {/* Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <SummaryCard title="Total Users" value={totalUsers} />
            <SummaryCard title="News Blogs" value={totalPosts} />
          </div>
          <OnlineUsers title="Online Users" value={onlineUsers} showGraph graphData={onlineUserGraph} />
        </div>
      </div>

      <div className="flex flex-col sm:w-1/3 w-full justify-around gap-5">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center">
          <img
            src={'/user.svg'}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h3 className="text-xl font-bold">
            {adminDetails.firstname} {adminDetails.lastname}
          </h3>
          <p className="text-sm text-gray-500">{adminDetails.email}</p>
          <p className="text-sm text-gray-500">{adminDetails.phone}</p>
          <p className="text-sm text-gray-500 mb-4">{adminDetails.address}</p>
          <div className="w-full flex flex-col gap-3">
            <button
              className="w-full py-2 rounded cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </button>
            <button
              className="w-full py-2 rounded cursor-pointer bg-red-400 text-white hover:bg-red-500"
              onClick={handlePasswordResetClick}
            >
              Reset Password
            </button>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-3 gap-4">
            <IconButton icon={<FaUserPlus />} onClick={() => quickNavigate("/admin/adminregister")} />
            <IconButton icon={<FaUsers />} onClick={() => quickNavigate("/admin/allUsers")} />
            <IconButton icon={<FaNewspaper />} onClick={() => quickNavigate("/admin/adminCards")} />
            <IconButton icon={<FaFacebook className="text-blue-600" />} href="https://www.facebook.com" />
            <IconButton icon={<FaInstagram className="text-pink-500" />} href="https://www.instagram.com" />
            <IconButton icon={<FaTwitter className="text-blue-400" />} href="https://twitter.com" />
          </div>
        </div>
      </div>

      <EditProfilePopup
        isOpen={isEditProfileOpen}
        onClose={handleClosePopup}
        adminDetails={adminDetails}
        onSave={handleSaveProfile}
      />

      <AdminPasswordReset isOpen={isPasswordResetOpen} onClose={handleClosePopup} />
    </motion.div>
  );
};

const IconButton: React.FC<{ icon: React.ReactNode; onClick?: () => void; href?: string }> = ({ icon, onClick, href }) => {
  const content = (
    <div className="flex justify-center items-center bg-gradient-to-br from-white to-gray-100 shadow-lg p-4 hover:scale-105 cursor-pointer rounded-full transition">
      {icon}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <button onClick={onClick}>{content}</button>
  );
};

const SummaryCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-4 hover:shadow-xl transition-all duration-300">
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;