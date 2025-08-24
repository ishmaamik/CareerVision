import React from 'react';
import { useState, useEffect } from 'react';
import { register } from '../../api/user/user';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);

    const SignUp = async () => {
        const response = await register(credentials)
        if (response) {
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('name', response.user.name)
            localStorage.setItem('role', response.user.role)
            localStorage.setItem('userId', response.user.id)
            navigate('/profile')
        }
        else {
            alert('SignUp Failed')
        }
    }

    return (
        <div className={`w-full min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-800 ease-in-out ${isMounted ? `opacity-100 translate-y-0` : `opacity-0 translate-y-3`}`}>
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl themed-card p-6 sm:p-8 lg:p-10">
                {/* Logo and Heading */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                        Create your Account
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                        Join CareerVision and unlock your potential
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4 sm:space-y-6" onSubmit={(e) => { e.preventDefault() }}>
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Full Name
                        </label>
                        <input
                            id="name" 
                            onChange={(e) => { setCredentials(prev => ({ ...prev, name: e.target.value })) }} 
                            name="name" 
                            placeholder='Enter your full name' 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email Address
                        </label>
                        <input
                            id="email" 
                            onChange={(e) => { setCredentials(prev => ({ ...prev, email: e.target.value })) }} 
                            name="email" 
                            type="email" 
                            placeholder='Enter your email address' 
                            autoComplete="email" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Password
                        </label>
                        <input 
                            id="password" 
                            onChange={(e) => { setCredentials(prev => ({ ...prev, password: e.target.value })) }} 
                            name="password" 
                            type="password" 
                            placeholder='Create a secure password' 
                            autoComplete="new-password" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Role Field */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Account Type
                        </label>
                        <select 
                            id="role" 
                            onChange={(e) => { setCredentials(prev => ({ ...prev, role: e.target.value })) }} 
                            name="role" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                        >
                            <option value="" disabled hidden>Select your role</option>
                            <option value="user">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                            onClick={SignUp}
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                {/* Footer Text */}
                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Already have an account?{' '}
                        <a href='/login' className="font-medium text-[var(--accent-primary)] hover:text-blue-500 transition-colors duration-200">
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
