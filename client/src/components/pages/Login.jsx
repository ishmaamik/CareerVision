import React, { useState } from 'react';
import { login } from '../../api/user/user.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()

    const SignIn = async () => {
        const response = await login(credentials)
        if (response?.user) {
            console.log("Logged in:", response.user);
            navigate('/'); // or wherever you want to go
        } else {
            alert("Login failed");
        }
    }

    return (
        <div className="fixed  left-1/2 transform -translate-x-1/2  flex items-center justify-center min-h-screen">
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


                    <div className="text-right text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={SignIn}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
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
