import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthSlice, login } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const LiquidSlider = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Fathername, setFathername] = useState("");
  const [DOB, setDOB] = useState("");
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadScripts = async () => {
      const scriptPaths = [
        "/js/TweenMax.min.js",
        "/js/pixi.min.js",
        "/js/rgbKineticSlider.js",
        "/js/scipt1.js"
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

  const handleRegister = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("Fathername", Fathername);
    data.append("DOB", DOB);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  

  useEffect(() => {
    if (message && isLogin) {
      toast.success(message);
      navigate(`/Verify-otp/email-otp/${email}`);
      dispatch(resetAuthSlice());
    }
    if (error && isLogin) {    
      if (Array.isArray(error)) {
        error.forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(error);
      }
    
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate, email]);


  const handleLogin = (e) => {
    e.preventDefault();
    // You can implement login later here
    const data = new FormData();
    data.append("email", lemail);
    data.append("password", lpassword);
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated && !isLogin) {
      toast.success("Login successful");
      navigate("/loginhome");
      dispatch(resetAuthSlice());
    }
    if (error && !isLogin) {
      if (Array.isArray(error)) {
        error.forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(error);
      }
    
      dispatch(resetAuthSlice());
    }
  }, [error, dispatch, email, isAuthenticated]);

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
            className="flex h-10/12 overflow-auto flex-wrap justify-center items-center absolute w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] border border-zinc-0 bg-gradient-to-b from-zinc-200 to-zinc-300/50 backdrop-blur-[5px] shadow-inner rounded-xl p-6"
          >
            <h1 className="text-[180%] font-bold text-zinc-700 mb-2 mt-5 text-center">Hey Buddy, Welcome! 👋</h1>
            <h2 className="text-[125%] text-zinc-500 mb-6 text-center">Register as a new user</h2>
            <form onSubmit={handleRegister} className="flex flex-col justify-center items-center mt-2 w-full">
              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Father Name</label>
                <input type="text" value={Fathername} onChange={(e) => setFathername(e.target.value)} required placeholder="Enter your father's name" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Date of Birth</label>
                <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} required className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="mb-10 mt-1 flex items-center w-full">
                <input type="checkbox" className="mr-2" required />
                <label className="text-sm">I agree to the terms & conditions</label>
              </div>

              <button type="submit" className="bg-red-400 mb-5 hover:bg-red-500 active:bg-red-600 text-white font-bold py-2 rounded-xl text-xl w-full border-none shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
                Register User
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-wrap justify-center items-center absolute w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-300/50 backdrop-blur-[5px] shadow-inner rounded-xl p-6"
          >
            <h1 className="text-[180%] font-bold text-zinc-700 mb-2 mt-5 text-center">Hey Buddy, Welcome! 👋</h1>
            <h2 className="text-[125%] text-zinc-500 mb-6 text-center">Login here</h2>

            <form onSubmit={handleLogin} className="flex flex-col justify-center items-center mt-2 w-full">
              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Email</label>
                <input type="email" name="email" value={lemail} onChange={(e) => setLemail(e.target.value)} required placeholder="Enter your email" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-wrap justify-between items-center w-full mb-4">
                <label className="text-lg mb-1">Password</label>
                <input type="password" value={lpassword} onChange={(e) => setLpassword(e.target.value)} name="password" required placeholder="Enter your password" className="border border-zinc-900 rounded-md p-2 w-full" />
              </div>

              <div className="w-full mb-6 text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button className="bg-red-400 hover:bg-red-500 active:bg-red-600 text-white font-bold py-2 rounded-xl text-xl w-full border-none shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
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
