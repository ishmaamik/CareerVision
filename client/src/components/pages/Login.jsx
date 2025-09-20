import React, { useContext, useState, useEffect } from 'react';
import { login } from '../../api/user/user.js'
import { useNavigate } from 'react-router-dom';
import { User } from '../../context/UserContext.jsx';
import {setUser} from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux';
const Login = () => {
    const dispatch= useDispatch()
    const [credentials, setCredentials] = useState({})
    const { setUserDetails } = useContext(User)
    const navigate = useNavigate()
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);

    const SignIn = async () => {
        const response = await login(credentials)
        if (response?.user) {
            console.log("Logged in:", response.user);
            // Set user in context
            setUserDetails(response.user);
            // Also set in localStorage and Redux for backup
            localStorage.setItem('user', JSON.stringify(response.user))
            dispatch(setUser(response.user))
            localStorage.setItem('name', response.user.name)
            localStorage.setItem('role', response.user.role)
            localStorage.setItem('userId', response.user.id)
            
            // Navigate to appropriate dashboard based on role
            if (response.user.role === 'recruiter') {
                navigate('/recruiter/dashboard');
            } else {
                navigate('/profile');
            }
        } else {
            alert("Login failed");
        }
    }

    return (
        <div className={`fixed transition-all duration-800 ease-in-out ${isMounted ? `opacity-100 translate-y-0` : `opacity-0 translate-y-3`} left-1/2 transform -translate-x-1/2  flex items-center justify-center min-h-screen`}>
            <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                {/* Logo and Heading */}
                <div className="text-center">
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {/* Form */}
                <form className="mt-6 space-y-5" onSubmit={(e) => { e.preventDefault() }}>

                    {/* Email Field */}
                    <div className='mt-3 space-y-5'>
                        <input
                            onChange={(e) => { setCredentials(prev => ({ ...prev, email: e.target.value })) }}
                            id="email" name="email" type="email" placeholder='Email address' autoComplete="email" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div className='mt-3 space-y-5'>
                        <input id="password" onChange={(e) => { setCredentials(prev => ({ ...prev, password: e.target.value })) }} name="password" type="password" placeholder='Password' autoComplete="current-password" required
                            className="mt-0 block w-full  border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>


                    <div className=" text-sm justify-center items-center">
                        <a href="" className="font-medium text-indigo-600 justify-center items-center hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={SignIn}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-black shadow-sm focus:outline-none "
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Footer Text */}
                <p className="mt-5 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
