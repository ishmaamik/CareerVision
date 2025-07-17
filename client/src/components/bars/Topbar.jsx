import React from 'react';
import { useNavigate } from 'react-router-dom';
const Topbar = () => {
  
  const navigate= useNavigate()
    return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-white shadow-md z-50">
      {/* Left Side: Logo/Brand */}
      <div className="text-2xl font-bold text-gray-800" onClick={()=>navigate('/')}>
        CareerVision
      </div>

      {/* Right Side: Navigation */}
      <div className="space-x-4">
        <button onClick={()=>navigate('/login')} className="text-gray-700 hover:text-indigo-600 font-medium">
          Login
        </button>
        <button  onClick={()=>navigate('/signup')} className="bg-indigo-600 text-gray-700 px-4 py-2 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-0 focus:shadow-none">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Topbar;
