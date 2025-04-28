import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import Home from './components/home';
import LoginHome from './components/loginhome';
import Updatepassword from './pages/updatepassword';
import Forgotpassword from './pages/forgotpassword';
import EmailOtp from './pages/emailcodeotp';
import ResetPassword from './pages/resetpassword';
import {ToastContainer} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from './store/slices/authSlice';



function App() {
  const {user, isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-Login-Page" element={<RegisterPage />} />
        <Route path="/Login-register-Page" element={<LoginPage />} />
        <Route path="/loginhome" element={<LoginHome />} />
        <Route path="/login-update-password" element={<Updatepassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/Verify-otp/email-otp/:email" element={<EmailOtp />} />
        <Route path="/forgot-password/email-otp/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme='dark' />
    </Router>
  );
}

export default App;
