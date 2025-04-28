import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {otpVerification, resetAuthSlice} from '../store/slices/authSlice'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function OtpVerification() {
  const {email} = useParams();
  const [otp, setOtp] = useState(new Array(7).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);
  
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to next input
    if (index < 6) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    dispatch(otpVerification(email, enteredOtp));    
    // Send to server or validate here
  };
  useEffect(() => {
    if(message){
        toast.success(message)
        Navigate("/");
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
  }, [message, error, dispatch, isAuthenticated, loading]);

  if(isAuthenticated){
    return <Navigate to="/" replace={true} />
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-400 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-400"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Enter OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">We’ve sent an OTP to your registered email address</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                placeholder='X'
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 text-xl text-center border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 mb-5 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Verify OTP
          </motion.button>
        
          
        </form>
      </motion.div>
    </div>
  );
}
