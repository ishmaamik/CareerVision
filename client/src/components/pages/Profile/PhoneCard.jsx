import React from 'react'
import {FaPhone} from 'react-icons/fa'

const PhoneCard = () => {
    return (
        <>
            <div className="bg-white w-100 rounded-lg shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
                        <FaPhone className="mr-2" />
                        <h2 className="font-semibold">Phone Number</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Primary Number
                            </span>
                            <p className="mt-1 text-lg">01696969420</p>
                        </div>
                        <div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Secondary Number
                            </span>
                            <p className="mt-1 text-lg">01717171717</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default PhoneCard;