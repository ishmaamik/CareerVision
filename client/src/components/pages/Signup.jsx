import React from 'react';

const Signup = () => {
    return (
        <div className="flex mt-2 min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                {/* Logo and Heading */}
                <div className="text-center">
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
                        Create your Account
                    </h2>
                </div>

                {/* Form */}
                <form className="mt-5 space-y-3" method="POST">

                    <div className='mt-3 space-y-5'>
                        <input
                            id="name" name="name" placeholder='Name'  type="email"  required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Email Field */}
                    <div className='mt-3 space-y-5'>
                        <input
                            id="email" name="email" type="email" placeholder='Email address' autoComplete="email" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div className='mt-3 space-y-5'>
                        <input id="password" name="password" type="password" placeholder='Password' autoComplete="current-password" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div className='mt-3 space-y-5'>
                        <input id="password" name="password" type="password" placeholder='Role' autoComplete="current-password" required
                            className="mt-0 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
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
