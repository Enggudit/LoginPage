import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword, resetAuthSlice } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';


export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, user, isAuthenticated} = useSelector((state) => state.auth);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", newPassword);
    formData.append("confirmPassword", confirmPassword); 
    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  useEffect(() => {
  if (isAuthenticated) {
    toast.success("Password Change Sucessfully");

    setTimeout(() => {
      navigate("/");
      dispatch(resetAuthSlice());
    }, 1000); // wait 1 second before navigating
  }

  if (error) {    
    if (Array.isArray(error)) {
      error.forEach((errMsg) => toast.error(errMsg));
    } else {
      toast.error(error);
    }
    dispatch(resetAuthSlice());
  }
}, [error, message, user, dispatch, navigate]);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-400 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
