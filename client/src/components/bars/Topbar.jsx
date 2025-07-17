import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material'
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
      <Button disableRipple variant="text" sx={{color:'gray', ":hover":{backgroundColor:'transparent'}, ":focus-visible":{outline:'none'}}} onClick={() => navigate('/blogs')} >
          Blogs
        </Button>
      <Button disableRipple variant="text" sx={{color:'gray', ":hover":{backgroundColor:'transparent'}, ":focus-visible":{outline:'none'}}} onClick={() => navigate('/login')} >
                  Login
        </Button>
        <Button disableRipple variant="text" sx={{color:'gray', ":hover":{backgroundColor:'transparent'}, ":focus-visible":{outline:'none'}}} onClick={() => navigate('/signup')} >
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
