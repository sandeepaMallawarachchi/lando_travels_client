import React, { useState } from "react";
import axios from "axios";
import { HiMail, HiLockClosed, HiX } from "react-icons/hi";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminPasswordReset from "./AdminPasswordReset";
import toast from "react-hot-toast";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const navigate = useNavigate();

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://lando-travels-api.vercel.app/admin/login", {
        email,
        password,
      });

      const adminID = res.data.admin.adminID;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminID", adminID);
      onClose()
      navigate("/admin/admindashboard");
    } catch (error: any) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error("Login failed! Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    setIsResetOpen(true);
  }
  const closeResetPopup = () => setIsResetOpen(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40 shadow-lg"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <HiX className="w-6 h-6" />
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

          {/* Form */}
          <form onSubmit={sendData} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <HiMail className="text-gray-400 mr-2" />
                <input
                  id="email"
                  type="email"
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="you@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <HiLockClosed className="text-gray-400 mr-2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button aria-label="Button"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <button aria-label="Button"
                type="button"
                className="text-blue-600 hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button aria-label="Button"
              type="submit"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200 text-sm"
            >
              Login
            </button>
          </form>
        </motion.div>

        {/* Password Reset Modal */}
        {isResetOpen && <AdminPasswordReset isOpen={isResetOpen} onClose={closeResetPopup} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
