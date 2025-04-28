import { motion } from "framer-motion";
import { useState } from "react";
import LoginHomeNav from '../components/loginhomenav'
import { Link } from "react-router-dom";
export default function EditProfile() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

  return (
    <div className="bg-zinc-400 w-screen h-full pb-10 overflow-hidden">
        <LoginHomeNav />
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border border-gray-200"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Profile</h2>
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden shadow-md">
                    {avatar ? (
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                </div>
                <label className="mt-3 cursor-pointer text-sm text-blue-600 font-semibold hover:underline">
                    Upload Profile Picture
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700 font-medium mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fatherName" className="text-gray-700 font-medium mb-1">Father Name</label>
                    <input
                        id="fatherName"
                        type="text"
                        placeholder="Enter father's name"
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dob" className="text-gray-700 font-medium mb-1">Date of Birth</label>
                    <input
                        id="dob"
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                {/* Save Changes Button */}
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                Save Changes
                </motion.button>
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full py-2 px-4 bg-gray-100 text-blue-600 rounded-xl font-semibold border border-blue-200 hover:bg-gray-200 transition"
                >
                <Link to="/login-update-password">Update Password</Link>
                </motion.button>
            </form>
        </motion.div>
    </div>
  );
}
