import React from 'react'
import {FaUser} from 'react-icons/fa'
const UserHeader = () => {
    return (
        <>
            <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center">
                    <FaUser className="mr-2" /> Your Profile
                </h2>
                <span className="text-sm text-gray-600">Joined 20/07/25</span>
            </div>
        </>
    )
}

export default UserHeader;