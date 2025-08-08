import React from 'react'
import {FaMapMarkerAlt} from 'react-icons/fa'
const AddressCard = () => {
    return (
        <>
            <div className="bg-white rounded-lg w-100 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <h2 className="font-semibold">Address</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Primary Address
                            </span>
                            <p className="mt-1">House 14, Road 6, Dhanmondi, Dhaka-1205</p>
                        </div>
                        <div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Secondary Address
                            </span>
                            <p className="mt-1">IUT Male Residence, Board Bazar, Gazipur</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default AddressCard;