import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

const LiquidSlider = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      const scriptPaths = [
        "/js/TweenMax.min.js",
        "/js/pixi.min.js",
        "/js/rgbKineticSlider.js",
        "/js/script.js"
      ];

      for (let path of scriptPaths) {
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }
    };

    loadScripts();
  }, []);

  const handleAuthClick = (e) => {
    e.preventDefault();
    setIsLogin(prev => !prev);

    const nextLink = document.querySelector('a[data-nav="next"]');
    if (nextLink) {
      nextLink.click();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        <div id="rgbKineticSlider" className="rgbKineticSlider"></div>
        <nav className="loginnav">
          <Link to="/" className="main-nav prev text-[yellowgreen]" data-nav="previous">Home</Link>
          <a href="#" className="next main-nav text-transparent" data-nav="next">Next</a>
          <a href="#" onClick={handleAuthClick} className="text-[yellowgreen] next main-nav">
            {isLogin ? "SignIn" : "SignUp"}
          </a>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            name="register-user"
            className="flex h-10/12 overflow-auto flex-wrap justify-center items-center absolute w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] border border-zinc-0 bg-gradient-to-b from-zinc-200 to-zinc-300/50 backdrop-blur-[5px] shadow-inner rounded-xl p-6"
          >
            <h1 className="text-[180%] font-bold text-zinc-700 mb-2 mt-5 text-center">Hey Buddy, Welcome! 👋</h1>
            <h2 className="text-[125%] text-zinc-500 mb-6 text-center">Register as a new user</h2>
            <div className="flex flex-col w-full overflow-hidden">
              <form className=" overflow-auto flex flex-col justify-center items-center mt-2 w-full">
                <div className="flex flex-wrap justify-between items-center w-full mb-4">
                  <label className="text-lg mb-1">Name</label>
                  <input type="text" name="name" required placeholder="Enter your name" className="border border-zinc-900 rounded-md p-2 w-full" />
                </div>
                <div className="flex flex-wrap justify-between items-center w-full mb-4">
                  <label className="text-lg mb-1">Father Name</label>
                  
                  <input type="text" name="name" required placeholder="Enter your name" className="border border-zinc-900 rounded-md p-2 w-full" />
                </div>
                <div className="flex flex-wrap justify-between items-center w-full mb-4">
                  <label className="text-lg mb-1">Date Of Birth</label>
                  <input type="date" name="name" required placeholder="Enter your name" className="border border-zinc-900 rounded-md p-2 w-full" />
                </div>
                <div className="flex flex-wrap justify-between items-center w-full mb-4">
                  <label className="text-lg mb-1">Email</label>
                  <input type="email" name="email" required placeholder="Enter your email" className="border border-zinc-900 rounded-md p-2 w-full" />
                </div>
                <div className="flex flex-wrap justify-between items-center w-full">
                  <label className="text-lg mb-1">Password</label>
                  <input type="password" name="password" required placeholder="Enter your password" className="border border-zinc-900 rounded-md p-2 w-full" />
                </div>
                <div className="mb-10 mt-1 relative ml-[-30%]">
                  <input type="checkbox" /> <label>I agree to the terms & conditions</label>
                </div>
                <button className="bg-red-400 mb-5 hover:bg-red-500 active:bg-red-600 text-white font-bold py-2 rounded-xl text-xl w-full border-none shadow-[0_4px_0_#c53030] hover:shadow-[0_2px_0_#9b2c2c] active:shadow-none transition-all duration-200 ease-in-out transform active:translate-y-1">
                  register user
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
      key="login"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      name="login-form"
      className="flex flex-col flex-wrap justify-center items-center absolute w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-300/50 backdrop-blur-[5px] shadow-inner rounded-xl p-6"
    >
      <h1 className="text-[180%] font-bold text-zinc-700 mb-2 mt-5 text-center">Hey Buddy, Welcome! 👋</h1>
      <h2 className="text-[125%] text-zinc-500 mb-6 text-center">Login here</h2>

      <form className="flex flex-col justify-center items-center mt-2 w-full">
        <div className="flex flex-wrap justify-between items-center w-full mb-4">
          <label className="text-lg mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="border border-zinc-900 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex flex-wrap justify-between items-center w-full mb-2">
          <label className="text-lg mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="border border-zinc-900 rounded-md p-2 w-full"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="w-full mb-6 text-right">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button className="bg-red-400 hover:bg-red-500 active:bg-red-600 text-white font-bold py-2 rounded-xl text-xl w-full border-none shadow-[0_4px_0_#c53030] hover:shadow-[0_2px_0_#9b2c2c] active:shadow-none transition-all duration-200 ease-in-out transform active:translate-y-1">
          Login User
        </button>
      </form>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiquidSlider;
