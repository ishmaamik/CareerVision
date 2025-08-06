import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    FaFilePdf, FaTrash, FaSync, FaEye, FaDownload, FaCamera,
    FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser
} from 'react-icons/fa';
import {
    handleFileUpload, deleteResume, updateResume
} from '../../api/resume/resume.js';
import {
    handleDeleteProfilePicture, handleProfilePictureUpload
} from '../../api/profilePicture/profilePicture.js';
import SimplifiedMap from './SimplifiedMap.jsx';

const Profile = () => {
    const [isMounted, setMounted] = useState(false);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userId = user.id;
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hasResume, setHasResume] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [profilePictureUploading, setProfilePictureUploading] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const checkProfilePictureStatus = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/profile-picture/user/${userId}`);
            setImageLoadError(false);
            if (response.data.hasProfilePicture && response.data.profilePictureUrl) {
                setProfilePictureUrl(response.data.profilePictureUrl.trim());
            } else {
                setProfilePictureUrl(null);
            }
        } catch (err) {
            console.error("Error checking profile picture status:", err);
            setProfilePictureUrl(null);
        }
    }, [userId]);

    const checkResumeStatus = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/resume/user/${userId}`);
            if (response.data.hasResume) {
                setHasResume(true);
                setResumeUrl(response.data.resumeUrl);
            }
        } catch (err) {
            console.error("Error checking resume status:", err);
        }
    }, [userId]);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        checkResumeStatus();
        checkProfilePictureStatus();
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, [checkProfilePictureStatus, checkResumeStatus]);

    return (
        <div className={`flex transition-all ml-60 duration-500 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {/* Left Column */}
            <div className="w-2/3 pr-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex justify-between items-center">
                        <h2 className="font-semibold text-lg flex items-center">
                            <FaUser className="mr-2" /> Your Profile
                        </h2>
                        <span className="text-sm text-gray-600">Joined 20/07/25</span>
                    </div>

                    <div className="p-6 flex">
                        {/* Profile Picture Section */}
                        <div className="relative mr-6">
                            <img
                                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                                src={imageLoadError || !profilePictureUrl ? '/default-profile.jpg' : profilePictureUrl}
                                alt="Profile"
                                onError={() => setImageLoadError(true)}
                                crossOrigin="anonymous"
                            />
                            <div className="flex mt-4 space-x-2">
                                <label className="bg-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-100">
                                    <FaCamera className="text-gray-600" />
                                    <input
                                        type="file"
                                        onChange={(e) => handleProfilePictureUpload({
                                            e,
                                            user,
                                            userId,
                                            setSuccess,
                                            setError,
                                            setProfilePictureUrl,
                                            setProfilePictureUploading
                                        })}
                                        accept="image/*"
                                        className="hidden"
                                        disabled={profilePictureUploading}
                                    />
                                </label>
                                {profilePictureUrl && !imageLoadError && (
                                    <button
                                        onClick={() => handleDeleteProfilePicture({
                                            user,
                                            userId,
                                            setSuccess,
                                            setError,
                                            setProfilePictureUrl
                                        })}
                                        className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                                        disabled={profilePictureUploading}
                                    >
                                        <FaTrash className="text-red-500" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                            <p className="text-gray-600 mb-6">01696969420</p>

                            {/* Resume Section */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {hasResume ? (
                                    <>
                                        <div className="flex items-center text-blue-500 mb-3">
                                            <FaFilePdf size={20} className="mr-2" />
                                            <span>Resume Available</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <a
                                                href={resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                            >
                                                <FaEye /> View
                                            </a>
                                            <a
                                                href={`${resumeUrl}?download=true`}
                                                className="flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                                            >
                                                <FaDownload /> Download
                                            </a>
                                            <label className="flex items-center justify-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 cursor-pointer">
                                                <FaSync /> Update
                                                <input
                                                    type="file"
                                                    onChange={async (e) => {
                                                        try {
                                                            await updateResume({
                                                                e,
                                                                userId,
                                                                setUploading,
                                                                setError,
                                                                setSuccess,
                                                                setHasResume,
                                                                setResumeUrl
                                                            });
                                                            await checkResumeStatus();
                                                        } catch (error) {
                                                            setError(error.message);
                                                        }
                                                    }}
                                                    accept=".pdf"
                                                    className="hidden"
                                                    disabled={uploading}
                                                />
                                            </label>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await deleteResume({
                                                            userId,
                                                            setHasResume,
                                                            setSuccess,
                                                            setResumeUrl
                                                        });
                                                    } catch (error) {
                                                        setError(error.message);
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                                disabled={uploading}
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                                        {uploading ? 'Uploading...' : 'Upload Resume'}
                                        <input
                                            type="file"
                                            onChange={async (e) => {
                                                try {
                                                    await handleFileUpload({
                                                        e,
                                                        userId,
                                                        setUploading,
                                                        setError,
                                                        setSuccess,
                                                        setHasResume,
                                                        setResumeUrl
                                                    });
                                                    await checkResumeStatus();
                                                } catch (error) {
                                                    setError(error.message);
                                                }
                                            }}
                                            accept=".pdf"
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                    </label>
                                )}

                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                                {success && (
                                    <p className="text-green-500 text-sm mt-2">
                                        {success === true ? 'Operation successful!' : success}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-lg shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center">
                        <FaEnvelope className="mr-2" />
                        <h2 className="font-semibold">Email Address</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Primary Mail
                            </span>
                            <p className="mt-1 text-lg">{user.email}</p>
                        </div>
                        <div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Secondary Mail
                            </span>
                            <p className="mt-1 text-lg">siyambhuiyan@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl hover:-translate-y-1 transition-transform duration-300">
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
                            setCurrentLocation(location);
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
                        <p  className="text-xs text-gray-500">
                            Click the refresh button to detect your location
                        </p>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div className="w-1/3 pl-2">
                {/* Phone Number Card */}
                <div className="bg-white rounded-lg shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
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

                {/* Address Card */}
                <div className="bg-white rounded-lg shadow-xl hover:-translate-y-1 transition-transform duration-300">
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
            </div>
        </div>
    );
};

export default Profile;