import React from 'react'
import LoginHomeNav from '../components/loginhomenav'
function updatepassword() {
  return (
    <div className='w-screen h-screen bg-zinc-500 overflow-hidden'>
        <LoginHomeNav />
        <div className="w-screen h-full flex justify-center items-center">
            <div className="bg-zinc-200 w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg border border-white">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Update Password</h1>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="oldPassword" className="mb-1 font-medium text-gray-700">Old Password</label>
                        <input
                            id="oldPassword"
                            type="password"
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your old password"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="newPassword" className="mb-1 font-medium text-gray-700">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter a new password"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Re-enter the new password"
                        />
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                    Update Password
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default updatepassword
