import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {toast } from 'react-toastify';


function LoginHome() {
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const tl = useRef();

  useEffect(() => {
    const menu = menuRef.current;
    const avatar = avatarRef.current;

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
    dispatch(logoutUser());
  }

  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if(message){
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, loading, isAuthenticated]);

  return (
    <div className="w-screen z-10 text-white relative">
      <nav className="pr-10 flex items-center justify-between px-5 w-screen pt-3">
        <h1 className="text-xl font-serif ml-5">Logo</h1>
        <div ref={avatarRef} className="avtar bg-green-500 w-10 h-10 border-2 border-white rounded-full mr-8 cursor-pointer"></div>
      </nav>

      <div
        ref={menuRef}
        className="menu w-[90%] z-40 sm:w-64 p-6 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white shadow-lg absolute right-4 top-20 space-y-4"
      >
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer">Home</h1>
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer">Edit Profile</h1>
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer">Update Password</h1>
        <h1 className="text-xl text-white font-semibold pb-2 border-b border-white/30 hover:text-amber-400 transition-all cursor-pointer" onClick={handleLogout}>Logout</h1>
      </div>
    </div>
  );
}

export default LoginHome;
