import React, { useState } from 'react';
import axios from 'axios';
import { HiX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface AdminPasswordResetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPasswordReset: React.FC<AdminPasswordResetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    if (name === 'email') newErrors.email = value.includes('@') ? '' : 'Invalid email.';
    if (name === 'password') newErrors.password = passwordRegex.test(value)
      ? ''
      : 'Password too weak.';
    if (name === 'confirmPassword') newErrors.confirmPassword = value === password
      ? ''
      : 'Passwords do not match.';
    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'resetCode') setResetCode(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    validateField(name, value);
  };

  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://lando-travels-api.vercel.app/admin/passwordEmail', { email });
      setStep(2);
    } catch {
      toast.error('Failed to send code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some(Boolean)) return;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://lando-travels-api.vercel.app/admin/passwordReset', {
        email,
        resetCode,
        newPassword: password
      });
      toast.success('Password updated.');
      navigate('/');
    } catch {
      toast.success('Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <HiX className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
            {step === 1 ? 'Request Reset Code' : 'Reset Password'}
          </h2>

          <form onSubmit={step === 1 ? handleRequestResetCode : handleResetPassword} className="space-y-4">
            {step === 1 ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full text-gray-700 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'}`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reset Code</label>
                  <input
                    name="resetCode"
                    type="text"
                    required
                    value={resetCode}
                    onChange={handleChange}
                    placeholder="123456"
                    className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full text-gray-700 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'}`}
                  />
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full text-gray-700 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'}`}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              {loading ? 'Processing...' : step === 1 ? 'Send Code' : 'Reset Password'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPasswordReset;
