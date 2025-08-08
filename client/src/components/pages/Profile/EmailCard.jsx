import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const EmailCard = () => {
    const {user} = useSelector((state)=>state.user)
    return (
        <>
            <div className="bg-white w-100 rounded-lg shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
                    <FaEnvelope className="mr-2" />
                    <h2 className="font-semibold">Email Address</h2>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Primary Mail
                        </span>
                        <p className="mt-1 text-lg">{user?.email}</p>
                    </div>
                    <div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Secondary Mail
                        </span>
                        <p className="mt-1 text-lg">siyambhuiyan@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailCard;

