import React from 'react'
import {useEffect} from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SimplifiedMap from '../SimplifiedMap';
import {setCurrentLocation} from '../../../redux/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import { userLocation } from '../../../api/location/location';

const LocationCard = () => {

    const {currentLocation}= useSelector((state)=> state.profile)
    const {user}= useSelector((state)=> state.user)

    const handleLocation=()=>{
        if(currentLocation){
            userLocation({location: currentLocation.placeName, latitude: currentLocation.latitude, longitude: currentLocation.longitude}, user.id)
        }
    }

    useEffect(()=>{
        handleLocation()
    },[,currentLocation])

    const dispatch= useDispatch()
    return (
        <>
            <div className="bg-white mr-12 w-400 rounded-lg shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <h2 className="font-semibold">Your Current Location</h2>
                </div>
                <div className="p-4">
                    <SimplifiedMap
                        isProfile={true}
                        onLocationSelect={(location) => {
                            console.log("User location:", location);
                            // Save to profile
                            dispatch(setCurrentLocation(location));
                        }}
                    />
                </div>
                <div className="px-4 py-3 bg-gray-50 rounded-b-lg">
                    {currentLocation ? (
                        <>
                            <p className="font-medium text-sm">
                                Your Location: <span className="text-blue-600">{currentLocation.placeName}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Coordinates: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                            </p>
                        </>
                    ) : (
                        <p className="text-xs text-gray-500">
                            Click the refresh button to detect your location
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default LocationCard;