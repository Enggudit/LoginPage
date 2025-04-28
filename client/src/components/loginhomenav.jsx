import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAuthSlice } from '../store/slices/authSlice'; // You forgot to import these actions!
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
function LoginHome() {
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const tl = useRef();

  const dispatch = useDispatch();
  
  // These were missing: get them from your auth slice
  const { error, message, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const menu = menuRef.current;
    const avatar = avatarRef.current;

    if (!menu || !avatar) return; // safety check

    // Set menu initially hidden
    gsap.set(menu, { autoAlpha: 0, y: -20, display: 'none' });

    tl.current = gsap.timeline({ paused: true });
    tl.current.to(menu, { autoAlpha: 1, y: 0, display: 'block', duration: 0.4, ease: 'power2.out' });

    const handleClick = () => {
      if (tl.current.reversed()) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    };

    avatar.addEventListener('click', handleClick);

    return () => {
      avatar.removeEventListener('click', handleClick);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="w-screen z-10 text-white relative">
      <nav className="pr-10 flex items-center justify-between px-5 w-screen pt-3">
        <h1 className="text-xl font-serif ml-5">Logo</h1>
        <div
          ref={avatarRef}
          className="avatar bg-green-500 w-10 h-10 border-2 border-white rounded-full mr-8 cursor-pointer"
        ></div>
      </nav>

      <div
        ref={menuRef}
        className="menu w-[90%] z-40 sm:w-64 p-6 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white shadow-lg absolute right-4 top-20 space-y-4"
      >
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer">
          <Link to="/loginhome">Home</Link>
        </h1>
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer">
          <Link to="/login-update-profile">Edit Profile</Link>
        </h1>
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer"
        >
          <Link to="/login-update-password">Update Password</Link>
        </h1>
        <h1
          className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </h1>
      </div>
    </div>
  );
}

export default LoginHome;
