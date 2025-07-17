import './App.css';
import React from 'react';
import Topbar from './components/bars/Topbar'; // adjust path as needed
import Home from './components/pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Blogs from './components/pages/Blogs';

function App() {
  return (
    <>
      {/* Fullscreen Dreamy Glow Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#fefcff',
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
          `,
        }}
      ></div>
{}
      <div className="min-h-screen flex flex-col text-black">       
        <Topbar />
        
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/blogs' element={<Blogs/>}/>
          </Routes>
          
      </div>
    </>
  );
}

export default App;
