import React from 'react';
import { useState } from 'react';
import { register } from '../../api/user/user';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({})
    const navigate= useNavigate()

    const SignUp=async()=>{
        const response= await register(credentials)
        if(response){
            console.log(response.data)
            navigate('/')
        }
        else{
            alert('SignUp Failed')
        }
    }

    return (
        <div className="fixed  left-1/2 transform -translate-x-1/2 flex mt-2 min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                {/* Logo and Heading */}
                <div className="text-center">
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
                        Create your Account
                    </h2>
                </div>

                {/* Form */}
                <form className="mt-5 space-y-3" onSubmit={(e)=>{e.preventDefault()}}>

                    <div className='mt-3 space-y-5'>
                        <input
                            id="name" onChange={(e) => { setCredentials(prev => ({ ...prev, name: e.target.value })) }} name="name" placeholder='Name' required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Email Field */}
                    <div className='mt-3 space-y-5'>
                        <input
                            id="email" onChange={(e) => { setCredentials(prev => ({ ...prev, email: e.target.value })) }} name="email" type="email" placeholder='Email address' autoComplete="email" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div className='mt-3 space-y-5'>
                        <input id="password" onChange={(e) => { setCredentials(prev => ({ ...prev, password: e.target.value })) }} name="password" type="password" placeholder='Password' autoComplete="current-password" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Role Field */}
                    <div className='mt-3 space-y-5'>
                        <select id="role" onChange={(e) => { setCredentials(prev => ({ ...prev, role: e.target.value })) }} name="role" type="role" placeholder='Role' required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled selected hidden>Select Role</option>
                            <option value="user">User</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none "
                            onClick={SignUp}
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                {/* Footer Text */}
                <p className="mt-5 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href='/login' className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
