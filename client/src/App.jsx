import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import Home from './components/home';
import LoginHome from './components/loginhome';
import Updatepassword from './pages/updatepassword';
import EditProfile from './pages/editprofile';
import Forgotpassword from './pages/forgotpassword';
import EmailOtp from './pages/emailcodeotp';
import ResetPassword from './pages/resetpassword';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-Login-Page" element={<RegisterPage />} />
        <Route path="/Login-register-Page" element={<LoginPage />} />
        <Route path="/loginhome" element={<LoginHome />} />
        <Route path="/login-update-password" element={<Updatepassword />} />
        <Route path="/login-update-profile" element={<EditProfile />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/Verify-otp/email-otp/:email" element={<EmailOtp />} />
        <Route path="/forgot-password/email-otp/reset-password" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme='dark' />
    </Router>
  );
}

export default App;
