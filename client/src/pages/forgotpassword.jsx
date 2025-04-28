import React, { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { resetAuthSlice } from '../store/slices/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error, message, user, isAuthenticated} = useSelector((state) => state.auth);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast(message);
      dispatch(resetAuthSlice());
    }
    if (error) {    
      if (Array.isArray(error)) {
        error.forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(error);
      }
    
      dispatch(resetAuthSlice());
    }
    
    
  }, [error, message, user, dispatch, navigate, email, isAuthenticated]);
  
  if(isAuthenticated){
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-zinc-500 w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-400 to-gray-800 px-4">
      <div className="w-screen h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" rounded-2xl shadow-xl p-8 w-screen max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-300 mb-6">Forgot Password</h2>
        <p className="text-white text-center mb-6 text-sm">
          Enter your registered email address. We'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-100 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading ? true : false}
          >
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
      </div>
    </div>
  );
}

export default ForgotPassword;
